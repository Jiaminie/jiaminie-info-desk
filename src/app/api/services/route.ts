import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const featuredServices = await prisma.service.findMany({
      where: {
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
        icon: true,image_url: true,
        price_range: true,
        duration: true,
        features: true,
        technologies: true,
        is_featured: true,
        is_active: true,
        sort_order: true,
      },
    });

    const responseData = featuredServices.map((service) => ({
      ...service,
      features: JSON.stringify(service.features),
      technologies: JSON.stringify(service.technologies),
    }));

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("API Error fetching featured services:", error);
      return new Response(
        JSON.stringify({
          message: "Internal Server Error",
          error: error.message,
        }),
        { status: 500 }
      );
    }

    console.error("Unknown error occurred:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: "Unknown error",
      }),
      { status: 500 }
    );
  }
}
