
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.jiaminie.co.ke',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-client-info, apikey',
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function GET(
  request: Request,
  { params }: { params: { model: string } }
) {
  const model = params.model;
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  let currentUserRole;
  if (user) {
    try {
      const dbuser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: { role: true },
      });
      currentUserRole = dbuser?.role;
    } catch (error) {
      console.error("Error fetching user role from DB:", error);
      return NextResponse.json(
        { message: "Internal Server Error during role check" },
        { status: 500, headers: corsHeaders }
      );
    }
  }

  try {
    let data;

    switch (model) {
      case "projects":
        data = await prisma.project.findMany({
          where: { is_active: true },
          orderBy: { sort_order: "asc" },
          include: {
            creator: {
              select: { name: true, email: true },
            },
          },
        });
        break;

      case "services":
        data = await prisma.service.findMany({
          orderBy: { sort_order: "asc" },
          where: { is_active: true },
          include: {
            creator: {
              select: { name: true, email: true },
            },
          },
        });
        break;

      case "testimonials":
        data = await prisma.testimonial.findMany({
          orderBy: { sort_order: "asc" },
          where: { is_active: true },
          include: {
            // creator: { select: { name: true, email: true } },
          },
        });
        break;

      case "blog-posts":
        data = await prisma.blogPost.findMany({
          where: { is_published: true },
          orderBy: { published_at: "desc" },
          include: {
            author: {
              select: { name: true, email: true },
            },
          },
        });
        break;

      case "team-members":
        data = await prisma.teamMember.findMany({
          orderBy: { sort_order: "asc" },
          where: { is_active: true },
        });
        break;

      case "users":
        if (authError || !user) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401, headers: corsHeaders }
          );
        }
        if (currentUserRole !== "ADMIN") {
          return NextResponse.json(
            { message: "Forbidden: Only Admins can view all users" },
            { status: 403, headers: corsHeaders }
          );
        }
        data = await prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            avatar_url: true,
            is_active: true,
            created_at: true,
            updated_at: true,
          },
        });
        break;

      case "inquiries":
        if (authError || !user) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401, headers: corsHeaders }
          );
        }
        if (currentUserRole !== "ADMIN") {
          return NextResponse.json(
            { message: "Forbidden: Access to inquiries restricted" },
            { status: 403, headers: corsHeaders }
          );
        }
        data = await prisma.inquiry.findMany({
          orderBy: { created_at: "desc" },
          include: {
            service: {
              select: { name: true, slug: true },
            },
          },
        });
        break;
      default:
        return NextResponse.json(
          { message: "Model not found" },
          { status: 404, headers: corsHeaders }
        );
    }

    if (data === null) {
      return NextResponse.json(
        { message: `${model} not found or no data available.` },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(data, { status: 200, headers: corsHeaders });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500, headers: corsHeaders }
    );
  } finally {
    await prisma.$disconnect();
  }
}