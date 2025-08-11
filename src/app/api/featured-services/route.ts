import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.jiaminie.co.ke',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-client-info, apikey',
};

// Handle the OPTIONS preflight request
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function GET(req: Request) {
  try {
    const featuredServices = await prisma.service.findMany({
      where: {
        is_featured: true,
        is_active: true,
      },
      orderBy: {
        sort_order: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        short_desc: true,
        price_range: true,
        duration: true,
        features: true,
        technologies: true,
        is_featured: true,
        is_active: true,
        sort_order: true,
      },
    });

    // Add CORS headers to the successful response
    return NextResponse.json(featuredServices, { status: 200, headers: corsHeaders });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("API Error fetching featured services:", error);
      // Add CORS headers to the error response
      return new Response(
        JSON.stringify({
          message: "Internal Server Error",
          error: error.message,
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    console.error("Unknown error occurred:", error);
    // Add CORS headers to the error response
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: "Unknown error",
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}