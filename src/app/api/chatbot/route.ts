// app/api/chatbot/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Import your shared Prisma client

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // --- Fetch relevant data from your database ---
    const [companyInfo, services, teamMembers, faqs] = await Promise.all([
      prisma.companyInfo.findFirst(), // Assuming one company info entry
      prisma.service.findMany({
        where: { is_active: true },
        select: {
          name: true,
          short_desc: true,
          description: true,
          price_range: true,
          duration: true,
          features: true,
          technologies: true,
        },
      }),
      prisma.teamMember.findMany({
        where: { is_active: true },
        select: { name: true, title: true, bio: true, skills: true },
      }),
      prisma.fAQ.findMany({
        where: { is_active: true },
        select: { question: true, answer: true, category: true },
      }),
    ]);

    // --- Construct the context for the AI model ---
    let context = `You are an AI assistant for Jiaminie.inc, a digital excellence company.
    Here is information about Jiaminie.inc and its offerings:
    `;

    if (companyInfo) {
      context += `\n--- Company Information ---
      Name: ${companyInfo.name}
      Tagline: ${companyInfo.tagline || 'N/A'}
      Description: ${companyInfo.description}
      Email: ${companyInfo.email}
      Phone: ${companyInfo.phone || 'N/A'}
      Address: ${companyInfo.address || 'N/A'}
      Founded: ${companyInfo.founded_year || 'N/A'}
      Team Size: ${companyInfo.team_size || 'N/A'}
      `;
    }

    if (services && services.length > 0) {
      context += `\n--- Our Services ---
      ${services.map(s => `
      Service Name: ${s.name}
      Short Description: ${s.short_desc || s.description}
      Price Range: ${s.price_range || 'N/A'}
      Duration: ${s.duration || 'N/A'}
      Features: ${s.features ? (typeof s.features === 'string' ? JSON.parse(s.features).join(', ') : s.features.join(', ')) : 'N/A'}
      Technologies: ${s.technologies ? (typeof s.technologies === 'string' ? JSON.parse(s.technologies).join(', ') : s.technologies.join(', ')) : 'N/A'}
      `).join('\n')}
      `;
    }

    if (teamMembers && teamMembers.length > 0) {
      context += `\n--- Our Team Members ---
      ${teamMembers.map(tm => `
      Name: ${tm.name}
      Title: ${tm.title}
      Bio: ${tm.bio || 'N/A'}
      Skills: ${tm.skills ? (typeof tm.skills === 'string' ? JSON.parse(tm.skills).join(', ') : tm.skills.join(', ')) : 'N/A'}
      `).join('\n')}
      `;
    }

    if (faqs && faqs.length > 0) {
      context += `\n--- Frequently Asked Questions (FAQs) ---
      ${faqs.map(faq => `
      Q: ${faq.question}
      A: ${faq.answer}
      Category: ${faq.category || 'General'}
      `).join('\n')}
      `;
    }

    context += `\n--- End of Context ---\n`;
    context += `Based on the above information, please answer the user's question. If you cannot find the answer in the provided context, state that you don't have enough information.`;

    // Prepare the payload for the Gemini API
    const chatHistory = [];
    // Add the context as a system message or a pre-defined model message
    chatHistory.push({ role: "user", parts: [{ text: context + "\n\nUser Question: " + message }] });

    const payload = {
      contents: chatHistory,
      // You can add generationConfig here if you need structured responses
      // generationConfig: {
      //     responseMimeType: "application/json",
      //     responseSchema: { ... }
      // }
    };

    const apiKey = typeof (globalThis as any).__api_key !== 'undefined'
                   ? (globalThis as any).__api_key
                   : process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("CRITICAL ERROR: API Key is not defined or empty. Cannot call Gemini API.");
      return NextResponse.json(
        { error: 'Server configuration error: API Key is missing. Please ensure GEMINI_API_KEY is set in your .env file for local development, or that the Canvas environment is correctly injecting __api_key.' },
        { status: 500 }
      );
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error('Gemini API error response:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI model', details: errorData },
        { status: geminiResponse.status }
      );
    }

    const result = await geminiResponse.json();

    let aiResponseText = 'No response from AI.';
    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      aiResponseText = result.candidates[0].content.parts[0].text;
    }

    return NextResponse.json({ response: aiResponseText }, { status: 200 });

  } catch (error: any) {
    console.error('Chatbot API route caught an unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
