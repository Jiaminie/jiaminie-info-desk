import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export  async function GET(
  request: Request,
  { params }: { params: { model: string } }
) {
  const model = params.model;

  try {
    let data;

    switch (model) {
      case "users":
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
      case "services":
        data = await prisma.service.findMany({
          orderBy: { sort_order: "asc" },
          include: {
            creator: {
              select: { name: true, email: true },
            },
          },
        });
        break;
      case "portfolio-items":
        data = await prisma.portfolioItem.findMany({
          orderBy: { sort_order: "asc" },
          include: {
            service: {
              select: { name: true, slug: true },
            },
            creator: {
              select: { name: true, email: true },
            },
          },
        });
        break;
      case "testimonials":
        data = await prisma.testimonial.findMany({
          orderBy: { sort_order: "asc" },
          include: {
            creator: {
              select: { name: true, email: true },
            },
          },
        });
        break;
      case "videos":
        data = await prisma.video.findMany({
          orderBy: { sort_order: "asc" },
        });
        break;
      case "blog-posts":
        data = await prisma.blogPost.findMany({
          orderBy: { published_at: "desc" },
          include: {
            author: {
              select: { name: true, email: true },
            },
          },
        });
        break;
      case "inquiries":
        // In a real application, you'd want to restrict access to inquiries
        // to authenticated admin users. For now, we fetch all.
        data = await prisma.inquiry.findMany({
          orderBy: { created_at: "desc" },
          include: {
            service: {
              select: { name: true, slug: true },
            },
          },
        });
        break;
      case "company-info":
        data = await prisma.companyInfo.findFirst();
        break;
      case "team-members":
        data = await prisma.teamMember.findMany({
          orderBy: { sort_order: "asc" },
        });
        break;
      case "faqs":
        data = await prisma.fAQ.findMany({
          orderBy: { sort_order: "asc" },
        });
        break;
      case "subscribers":
        // In a real application, you'd want to restrict access to subscribers
        // to authenticated admin users. For now, we fetch all.
        data = await prisma.subscriber.findMany({
          orderBy: { subscribed_at: "desc" },
        });
        break;
      case "analytics":
        // In a real application, you'd want to restrict access to analytics
        // to authenticated admin users. For now, we fetch all.
        data = await prisma.analytics.findMany({
          orderBy: { date: "desc" },
        });
        break;
      default:
        return NextResponse.json(
          { message: "Model not found" },
          { status: 404 }
        );
    }

    if (data === null) {
      return NextResponse.json(
        { message: `${model} not found.` },
        { status: 404 }
      );
    }

    const processedData = Array.isArray(data)
      ? data.map((item) => {
          const newItem = { ...item };
          if (
            "features" in newItem &&
            newItem.features &&
            typeof newItem.features !== "string"
          ) {
            newItem.features = JSON.stringify(newItem.features);
          }
          if (
            "technologies" in newItem &&
            newItem.technologies &&
            typeof newItem.technologies !== "string"
          ) {
            newItem.technologies = JSON.stringify(newItem.technologies);
          }
          if (
            "gallery" in newItem &&
            newItem.gallery &&
            typeof newItem.gallery !== "string"
          ) {
            newItem.gallery = JSON.stringify(newItem.gallery);
          }
          if (
            "tags" in newItem &&
            newItem.tags &&
            typeof newItem.tags !== "string"
          ) {
            newItem.tags = JSON.stringify(newItem.tags);
          }
          if (
            "social_links" in newItem &&
            newItem.social_links &&
            typeof newItem.social_links !== "string"
          ) {
            newItem.social_links = JSON.stringify(newItem.social_links);
          }
          if (
            "business_hours" in newItem &&
            newItem.business_hours &&
            typeof newItem.business_hours !== "string"
          ) {
            newItem.business_hours = JSON.stringify(newItem.business_hours);
          }
          if (
            "skills" in newItem &&
            newItem.skills &&
            typeof newItem.skills !== "string"
          ) {
            newItem.skills = JSON.stringify(newItem.skills);
          }
          return newItem;
        })
      : data; 

    return NextResponse.json(processedData, { status: 200 });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
