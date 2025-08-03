import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: { model: string } }
) {
  const model = params.model;
  const supabase = createSupabaseServerClient();

  // Attempt to get user and authError, but DO NOT immediately return 401.
  // We will check for user/auth only when specific models require it.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  let currentUserRole;
  // Only attempt to fetch the user's role from DB if a user exists
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
      // If there's a DB error fetching role, we can treat it as unauthenticated
      // for public routes, but for restricted routes, it should still be an error.
      // For now, let's re-throw or handle as a 500 for consistency in error handling.
      return NextResponse.json(
        { message: "Internal Server Error during role check" },
        { status: 500 }
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

      case "services": // Existing: Open to all users
        data = await prisma.service.findMany({
          orderBy: { sort_order: "asc" },
          where: { is_active: true }, // Assuming services are also public and active
          include: {
            creator: {
              select: { name: true, email: true },
            },
          },
        });
        break;

      case "testimonials": // Existing: Open to all users
        data = await prisma.testimonial.findMany({
          orderBy: { sort_order: "asc" },
          where: { is_active: true }, // Assuming testimonials are also public and active
          include: {
            // creator: { select: { name: true, email: true } }, // Uncomment if Testimonial includes creator
          },
        });
        break;

      case "blog-posts": // Existing: Open to all users
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

      case "team-members": // Existing: Open to all users
        data = await prisma.teamMember.findMany({
          orderBy: { sort_order: "asc" },
          where: { is_active: true }, // Assuming team members are also public and active
        });
        break;

      case "users": // Requires authentication and ADMIN role
        if (authError || !user) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }
        if (currentUserRole !== "ADMIN") {
          return NextResponse.json(
            { message: "Forbidden: Only Admins can view all users" },
            { status: 403 }
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

      case "inquiries": // Requires authentication and ADMIN role
        if (authError || !user) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }
        if (currentUserRole !== "ADMIN") {
          return NextResponse.json(
            { message: "Forbidden: Access to inquiries restricted" },
            { status: 403 }
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
          { status: 404 }
        );
    }

    if (data === null) {
      // This null check might not be strictly necessary if findMany always returns array
      return NextResponse.json(
        { message: `${model} not found or no data available.` },
        { status: 404 }
      );
    }

    // `processedData` is likely not needed if Prisma is handling JSON fields correctly
    // and you're not doing specific data transformations here.
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
