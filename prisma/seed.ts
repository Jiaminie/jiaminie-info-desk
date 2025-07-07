// const { PrismaClient } = require("@prisma/client");
// const { v4: uuidv4 } = require("uuid");

// const prisma = require('@/lib/prisma')

// async function main() {
//   console.log("Start seeding...");

//   // --- Create Users ---
//   const adminUser = await prisma.user.upsert({
//     where: { email: "admin@jiaminie.com" },
//     update: {},
//     create: {
//       id: uuidv4(),
//       email: "admin@jiaminie.com",
//       name: "Jiaminie Admin",
//       role: "ADMIN",
//       avatar_url: "https://randomuser.me/api/portraits/men/1.jpg",
//       is_active: true,
//     },
//   });

//   const editorUser = await prisma.user.upsert({
//     where: { email: "editor@jiaminie.com" },
//     update: {},
//     create: {
//       id: uuidv4(),
//       email: "editor@jiaminie.com",
//       name: "Jiaminie Editor",
//       role: "EDITOR",
//       avatar_url: "https://randomuser.me/api/portraits/women/2.jpg",
//       is_active: true,
//     },
//   });

//   const viewerUser = await prisma.user.upsert({
//     where: { email: "viewer@jiaminie.com" },
//     update: {},
//     create: {
//       id: uuidv4(),
//       email: "viewer@jiaminie.com",
//       name: "Jiaminie Viewer",
//       role: "VIEWER",
//       avatar_url: "https://randomuser.me/api/portraits/men/3.jpg",
//       is_active: true,
//     },
//   });

//   console.log("Created users:", { adminUser, editorUser, viewerUser });

//   // --- Create CompanyInfo ---
//   const companyInfo = await prisma.companyInfo.upsert({
//     where: { id: "jiaminie-company-info" }, // A fixed ID for a single company entry
//     update: {},
//     create: {
//       id: "jiaminie-company-info",
//       name: "Jiaminie.inc",
//       tagline: "Building Digital Excellence",
//       description:
//         "We transform businesses through innovative web development, seamless WhatsApp integrations, and cutting-edge Next.js applications.",
//       logo_url: "https://example.com/jiaminie-logo.png", // Placeholder
//       email: "hello@jiaminie.com",
//       phone: "+254 (712) 345-678",
//       address: "Nairobi, Kenya",
//       city: "Nairobi",
//       country: "Kenya",
//       website: "https://www.jiaminie.com",
//       social_links: {
//         twitter: "https://twitter.com/jiaminie",
//         linkedin: "https://linkedin.com/company/jiaminie",
//       },
//       business_hours: {
//         mondayToFriday: "9 AM - 5 PM",
//         saturday: "10 AM - 2 PM",
//       },
//       founded_year: 2020,
//       team_size: "10-25 employees",
//     },
//   });

//   console.log("Created company info:", companyInfo);

//   // --- Create Services ---
//   const webDevService = await prisma.service.upsert({
//     where: { slug: "web-development" },
//     update: {},
//     create: {
//       id: uuidv4(),
//       name: "Web Development",
//       slug: "web-development",
//       description:
//         "Modern, responsive websites built with the latest technologies, tailored to your business needs.",
//       short_desc: "Modern, responsive websites built with latest technologies",
//       icon: "Globe", // Using string name for icon as in the UI (can map to actual icon later)
//       image_url: "https://images.unsplash.com/photo-1488590528505-98d2f0dceb8b",
//       price_range: "$2,000 - $15,000",
//       duration: "2-6 weeks",
//       features: [
//         "Responsive Design",
//         "SEO Optimized",
//         "Fast Loading",
//         "Mobile-First",
//       ],
//       technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
//       is_featured: true,
//       is_active: true,
//       created_by: adminUser.id,
//     },
//   });

//   const whatsappService = await prisma.service.upsert({
//     where: { slug: "whatsapp-integration" },
//     update: {},
//     create: {
//       id: uuidv4(),
//       name: "WhatsApp Integration",
//       slug: "whatsapp-integration",
//       description:
//         "Seamless business communication and automation through the WhatsApp API, enhancing customer engagement.",
//       short_desc: "Seamless business communication through WhatsApp API",
//       icon: "MessageSquare",
//       image_url: "https://images.unsplash.com/photo-1629654292158-6927d667c296",
//       price_range: "$500 - $3,000",
//       duration: "1-3 weeks",
//       features: [
//         "Auto-replies",
//         "Customer Support",
//         "Broadcasting",
//         "Analytics",
//       ],
//       technologies: ["WhatsApp API", "Node.js", "Express", "MongoDB"],
//       is_featured: true,
//       is_active: true,
//       created_by: adminUser.id,
//     },
//   });

//   const nextjsAppService = await prisma.service.upsert({
//     where: { slug: "nextjs-applications" },
//     update: {},
//     create: {
//       id: uuidv4(),
//       name: "Next.js Applications",
//       slug: "nextjs-applications",
//       description:
//         "Develop high-performance, full-stack applications with Next.js, leveraging its powerful features for scalability and speed.",
//       short_desc: "High-performance full-stack applications",
//       icon: "Code",
//       image_url: "https://images.unsplash.com/photo-1633356122543-559d81d6f284",
//       price_range: "$3,000 - $20,000",
//       duration: "3-8 weeks",
//       features: [
//         "Server-side Rendering",
//         "API Routes",
//         "Performance Optimized",
//         "Scalable",
//       ],
//       technologies: ["Next.js", "React", "Prisma", "PostgreSQL"],
//       is_featured: true,
//       is_active: true,
//       created_by: adminUser.id,
//     },
//   });

//   const mobileDevService = await prisma.service.upsert({
//     where: { slug: "mobile-development" },
//     update: {},
//     create: {
//       id: uuidv4(),
//       name: "Mobile Development",
//       slug: "mobile-development",
//       description:
//         "Build robust cross-platform mobile applications for iOS and Android, ensuring a seamless user experience.",
//       short_desc: "Cross-platform mobile apps for iOS and Android",
//       icon: "Smartphone",
//       image_url: "https://images.unsplash.com/photo-1517694712202-cd820b9e8697",
//       price_range: "$5,000 - $25,000",
//       duration: "4-12 weeks",
//       features: [
//         "Cross-platform",
//         "Native Performance",
//         "Push Notifications",
//         "Offline Support",
//       ],
//       technologies: ["React Native", "Expo", "Firebase", "Redux"],
//       is_featured: false,
//       is_active: true,
//       created_by: adminUser.id,
//     },
//   });

//   console.log("Created services:", {
//     webDevService,
//     whatsappService,
//     nextjsAppService,
//     mobileDevService,
//   });

//   // --- Create Portfolio Items ---
//   const portfolioItem1 = await prisma.portfolioItem.upsert({
//     where: { slug: "e-commerce-platform" },
//     update: {},
//     create: {
//       id: uuidv4(),
//       title: "E-commerce Platform for Fashion Brand",
//       slug: "e-commerce-platform",
//       description:
//         "Developed a scalable e-commerce platform with a custom CMS, payment gateway integration, and inventory management.",
//       short_desc: "Full-featured e-commerce solution",
//       client_name: "Fashion Nova",
//       project_url: "https://www.fashionnova.com",
//       github_url: null,
//       image_url: "https://images.unsplash.com/photo-1522204523234-8729aa67e2e6",
//       gallery: [
//         "https://images.unsplash.com/photo-1522204523234-8729aa67e2e6",
//         "https://images.unsplash.com/photo-1522204523234-8729aa67e2e6",
//       ],
//       video_url: null,
//       technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
//       challenges:
//         "Integrating various third-party APIs and ensuring high performance under heavy traffic.",
//       solutions:
//         "Implemented server-side rendering, optimized database queries, and used a robust caching strategy.",
//       results:
//         "Increased conversion rates by 20% and improved site load times by 30%.",
//       service_id: webDevService.id,
//       is_featured: true,
//       is_active: true,
//       created_by: adminUser.id,
//     },
//   });

//   const portfolioItem2 = await prisma.portfolioItem.upsert({
//     where: { slug: "whatsapp-chatbot-support" },
//     update: {},
//     create: {
//       id: uuidv4(),
//       title: "WhatsApp Chatbot for Customer Support",
//       slug: "whatsapp-chatbot-support",
//       description:
//         "Designed and deployed an AI-powered WhatsApp chatbot to handle customer inquiries and provide instant support.",
//       short_desc: "Automated customer support via WhatsApp",
//       client_name: "Teleco Solutions",
//       project_url: null,
//       github_url: null,
//       image_url: "https://images.unsplash.com/photo-1628102491629-ea263d917830",
//       gallery: [],
//       video_url: "https://www.youtube.com/watch?v=example-chatbot-video",
//       technologies: ["WhatsApp API", "Node.js", "Dialogflow", "MongoDB"],
//       challenges:
//         "Ensuring natural language processing accuracy and smooth conversation flow.",
//       solutions:
//         "Utilized advanced NLP models and designed conversational scripts for various scenarios.",
//       results:
//         "Reduced customer support response time by 70% and increased customer satisfaction.",
//       service_id: whatsappService.id,
//       is_featured: true,
//       is_active: true,
//       created_by: adminUser.id,
//     },
//   });

//   console.log("Created portfolio items:", { portfolioItem1, portfolioItem2 });

//   // --- Create Testimonials ---
//   const testimonial1Id = uuidv4();
//   const testimonial1 = await prisma.testimonial.upsert({
//     where: { id: testimonial1Id },
//     update: {},
//     create: {
//       id: testimonial1Id,
//       client_name: "John Doe",
//       client_title: "CEO",
//       client_company: "Innovate Corp",
//       client_email: "john.doe@example.com",
//       client_photo: "https://randomuser.me/api/portraits/men/4.jpg",
//       rating: 5,
//       content:
//         "Jiaminie.inc delivered an outstanding web application that exceeded our expectations. Their team is highly skilled and professional!",
//       project_type: "Web Development",
//       is_featured: true,
//       is_active: true,
//       is_verified: true,
//       created_by: adminUser.id,
//     },
//   });

//   const testimonial2Id = uuidv4();
//   const testimonial2 = await prisma.testimonial.upsert({
//     where: { id: testimonial2Id },
//     update: {},
//     create: {
//       id: uuidv4(),
//       client_name: "Jane Smith",
//       client_title: "Marketing Director",
//       client_company: "Global Brands",
//       client_email: "jane.smith@example.com",
//       client_photo: "https://randomuser.me/api/portraits/women/5.jpg",
//       rating: 4,
//       content:
//         "The WhatsApp integration provided by Jiaminie.inc significantly improved our customer engagement. Great work!",
//       project_type: "WhatsApp Integration",
//       is_featured: false,
//       is_active: true,
//       is_verified: true,
//       created_by: adminUser.id,
//     },
//   });

//   console.log("Created testimonials:", { testimonial1, testimonial2 });

//   // --- Create Videos ---
//   const introVideoId = uuidv4();
//   const introVideo = await prisma.video.upsert({
//     where: { id: introVideoId },
//     update: {},
//     create: {
//       id: uuidv4(),
//       title: "Jiaminie.inc Company Introduction",
//       description:
//         "An overview of Jiaminie.inc, our mission, and what we offer.",
//       video_url: "https://www.youtube.com/watch?v=jiaminie-intro", // Placeholder
//       thumbnail_url:
//         "https://images.unsplash.com/photo-1519389950473-47ba0c7653ed",
//       duration: "2:15",
//       category: "COMPANY_INTRO",
//       is_featured: true,
//       is_active: true,
//     },
//   });

//   const serviceDemoVideoId = uuidv4();
//   const serviceDemoVideo = await prisma.video.upsert({
//     where: { id: serviceDemoVideoId },
//     update: {},
//     create: {
//       id: uuidv4(),
//       title: "Next.js Application Demo",
//       description:
//         "A live demonstration of a Next.js application developed by our team.",
//       video_url: "https://www.youtube.com/watch?v=nextjs-demo", // Placeholder
//       thumbnail_url:
//         "https://images.unsplash.com/photo-1549692520-acc6669e2fde",
//       duration: "4:30",
//       category: "SERVICE_DEMO",
//       is_featured: false,
//       is_active: true,
//     },
//   });

//   console.log("Created videos:", { introVideo, serviceDemoVideo });

//   // --- Create Blog Posts ---
//   const blogPost1 = await prisma.blogPost.upsert({
//     where: { slug: "the-power-of-nextjs" },
//     update: {},
//     create: {
//       id: uuidv4(),
//       title: "The Power of Next.js for Modern Web Development",
//       slug: "the-power-of-nextjs",
//       content:
//         "Next.js has revolutionized web development with its powerful features like server-side rendering, static site generation, and API routes...",
//       excerpt:
//         "Discover how Next.js simplifies building performant and scalable web applications.",
//       featured_image:
//         "https://images.unsplash.com/photo-1610484826920-56241b17a149",
//       meta_title: "Next.js Web Development | Jiaminie Blog",
//       meta_description:
//         "Learn about the benefits of Next.js for your next web project.",
//       tags: ["Next.js", "Web Development", "React", "JavaScript"],
//       is_published: true,
//       is_featured: true,
//       read_time: 7,
//       published_at: new Date("2024-06-15T10:00:00Z"),
//       created_by: editorUser.id,
//     },
//   });

//   const blogPost2 = await prisma.blogPost.upsert({
//     where: { slug: "optimizing-whatsapp-business-api" },
//     update: {},
//     create: {
//       id: uuidv4(),
//       title: "Optimizing WhatsApp Business API for Customer Engagement",
//       slug: "optimizing-whatsapp-business-api",
//       content:
//         "The WhatsApp Business API offers immense potential for businesses to engage with their customers effectively...",
//       excerpt:
//         "Tips and best practices for leveraging the WhatsApp Business API for enhanced customer communication.",
//       featured_image:
//         "https://images.unsplash.com/photo-1628102491629-ea263d917830",
//       meta_title: "WhatsApp Business API | Customer Engagement",
//       meta_description:
//         "Maximize your customer engagement with WhatsApp Business API.",
//       tags: ["WhatsApp", "Business API", "Customer Service", "CRM"],
//       is_published: true,
//       is_featured: false,
//       read_time: 5,
//       published_at: new Date("2024-07-01T14:30:00Z"),
//       created_by: editorUser.id,
//     },
//   });

//   console.log("Created blog posts:", { blogPost1, blogPost2 });

//   // --- Create Inquiries (example of a new inquiry from the contact form) ---
//   const inquiry1 = await prisma.inquiry.create({
//     data: {
//       id: uuidv4(),
//       name: "Alice Johnson",
//       email: "alice.j@example.com",
//       phone: "+1 (555) 123-4567",
//       company: "Tech Solutions Inc.",
//       message:
//         "I am interested in a new e-commerce website for my startup. Could you provide a detailed proposal?",
//       service_id: webDevService.id,
//       budget_range: "$10,000 - $25,000",
//       timeline: "2-3 months",
//       source: "Google Search",
//       status: "NEW",
//       priority: "HIGH",
//     },
//   });

//   const inquiry2 = await prisma.inquiry.create({
//     data: {
//       id: uuidv4(),
//       name: "Bob Williams",
//       email: "bob.w@example.com",
//       message:
//         "I have a few questions about your WhatsApp integration service.",
//       service_id: whatsappService.id,
//       status: "IN_PROGRESS",
//       priority: "MEDIUM",
//       assigned_to: adminUser.id,
//       notes: "Followed up via email on 2025-07-03.",
//     },
//   });

//   console.log("Created inquiries:", { inquiry1, inquiry2 });

//   // --- Create Team Members ---
//   const teamMember1Id = uuidv4();
//   const teamMember1 = await prisma.teamMember.upsert({
//     where: { id: teamMember1Id },
//     update: {},
//     create: {
//       id: uuidv4(),
//       name: "Jane Doe",
//       title: "Lead Developer",
//       bio: "Experienced in full-stack development with a passion for building scalable web applications.",
//       photo_url: "https://randomuser.me/api/portraits/women/6.jpg",
//       email: "jane.doe@jiaminie.com",
//       linkedin_url: "https://linkedin.com/in/janedoe",
//       github_url: "https://github.com/janedoe",
//       skills: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS"],
//       is_active: true,
//       sort_order: 1,
//     },
//   });

//   const teamMember2Id = uuidv4();
//   const teamMember2 = await prisma.teamMember.upsert({
//     where: { id: teamMember2Id },
//     update: {},
//     create: {
//       id: uuidv4(),
//       name: "Mike Ross",
//       title: "UX/UI Designer",
//       bio: "Creating intuitive and engaging user experiences through thoughtful design.",
//       photo_url: "https://randomuser.me/api/portraits/men/7.jpg",
//       email: "mike.ross@jiaminie.com",
//       linkedin_url: "https://linkedin.com/in/mikeross",
//       github_url: null,
//       skills: ["Figma", "Sketch", "Adobe XD", "User Research"],
//       is_active: true,
//       sort_order: 2,
//     },
//   });

//   console.log("Created team members:", { teamMember1, teamMember2 });

//   // --- Create FAQs ---

//   const faq1Id = uuidv4();
//   const faq1 = await prisma.fAQ.upsert({
//     where: { id: faq1Id },
//     update: {},
//     create: {
//       id: uuidv4(),
//       question: "What is your typical project timeline?",
//       answer:
//         "Project timelines vary depending on complexity, but most projects range from 4 to 12 weeks from initial concept to launch.",
//       category: "General",
//       is_active: true,
//       sort_order: 1,
//     },
//   });

//   const faq2Id = uuidv4();
//   const faq2 = await prisma.fAQ.upsert({
//     where: { id: faq2Id },
//     update: {},
//     create: {
//       id: uuidv4(),
//       question: "Do you offer post-launch support?",
//       answer:
//         "Yes, we offer various maintenance and support packages to ensure your application runs smoothly after launch.",
//       category: "Services",
//       is_active: true,
//       sort_order: 2,
//     },
//   });

//   console.log("Created FAQs:", { faq1, faq2 });

//   // --- Create Subscribers ---
//   const subscriber1 = await prisma.subscriber.upsert({
//     where: { email: "news.fan@example.com" },
//     update: {},
//     create: {
//       id: uuidv4(),
//       email: "news.fan@example.com",
//       name: "Newsletter Fan",
//       is_active: true,
//     },
//   });

//   console.log("Created subscribers:", { subscriber1 });

//   // --- Create Analytics (example) ---
//   const analytics1 = await prisma.analytics.upsert({
//     where: {
//       page_path_date: {
//         page_path: "/",
//         date: new Date("2025-07-01T00:00:00Z"),
//       },
//     },
//     update: { visitor_count: 1500, unique_visitors: 800 },
//     create: {
//       id: uuidv4(),
//       page_path: "/",
//       visitor_count: 1200,
//       unique_visitors: 700,
//       date: new Date("2025-07-01T00:00:00Z"),
//     },
//   });

//   console.log("Created analytics entry:", analytics1);

//   console.log("Seeding finished.");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
