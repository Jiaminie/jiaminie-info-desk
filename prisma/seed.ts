import { PrismaClient } from "@prisma/client";
import { UserRole } from "@prisma/client";

const prisma = new PrismaClient();

// --- MOCK SERVICES DATA (from previous steps) ---
const mockServices = [
  {
    name: "Web Development",
    slug: "web-development",
    description:
      "We create stunning, responsive websites that drive business growth and enhance user experience through cutting-edge technologies and modern design principles.",
    short_desc: "Custom web solutions that scale with your business",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Performance Monitoring",
      "Security Implementation",
      "Content Management",
    ],
    is_featured: true,
    is_active: true,
    sort_order: 1,
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android devices, built with performance and scalability in mind.",
    short_desc: "Native mobile apps for iOS and Android",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    features: [
      "Cross-Platform",
      "Native Performance",
      "Push Notifications",
      "Offline Support",
      "App Store Optimization",
    ],
    is_featured: true,
    is_active: true,
    sort_order: 2,
  },
  {
    name: "Data Analytics",
    slug: "data-analytics",
    description:
      "Transform your data into actionable insights with our comprehensive analytics solutions, featuring advanced visualization, predictive modeling, and business intelligence.",
    short_desc: "Data-driven insights for better decisions",
    technologies: ["Python", "R", "Tableau", "Power BI", "Apache Spark"],
    features: [
      "Real-time Analytics",
      "Custom Dashboards",
      "Predictive Modeling",
      "Data Visualization",
      "Business Intelligence",
    ],
    is_featured: false,
    is_active: true,
    sort_order: 3,
  },
  {
    name: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "Create memorable user experiences through thoughtful design that combines aesthetics with functionality, ensuring your product stands out in the market.",
    short_desc: "Beautiful, intuitive user interfaces",
    technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "Framer"],
    features: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Usability Testing",
    ],
    is_featured: true,
    is_active: true,
    sort_order: 4,
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "Comprehensive digital marketing strategies that amplify your brand presence, drive engagement and convert leads into loyal customers through multi-channel approaches.",
    short_desc: "Strategic marketing for digital growth",
    technologies: [
      "Google Ads",
      "Facebook Ads",
      "SEO Tools",
      "Analytics",
      "CRM",
    ],
    features: [
      "SEO/SEM",
      "Social Media Marketing",
      "Content Strategy",
      "Email Marketing",
      "Performance Analytics",
    ],
    is_featured: false,
    is_active: true,
    sort_order: 5,
  },
  {
    name: "Custom Software",
    slug: "custom-software",
    description:
      "Tailored software solutions designed specifically for your business needs, from enterprise applications to specialized tools that streamline operations and boost productivity.",
    short_desc: "Bespoke software solutions",
    technologies: ["Python", "Java", "C#", "Docker", "Kubernetes"],
    features: [
      "Custom Development",
      "System Integration",
      "API Development",
      "Cloud Deployment",
      "Maintenance Support",
    ],
    is_featured: true,
    is_active: true,
    sort_order: 6,
  },
];

// --- MOCK TESTIMONIALS DATA ---
const mockTestimonials = [
  {
    seed_identifier: "testimonial-alice-johnson",
    client_name: "Alice Johnson",
    client_title: "CEO",
    client_company: "Innovate Solutions",
    content:
      "Jiaminie transformed our online presence. Their web development team is incredibly skilled and responsive. Highly recommended!",
    rating: 5,
    is_featured: true,
    is_active: true,
    sort_order: 1,
  },
  {
    seed_identifier: "testimonial-bob-williams",
    client_name: "Bob Williams",
    client_title: "Product Manager",
    client_company: "Global Tech",
    content:
      "The mobile app Jiaminie built for us is intuitive and robust. Our users love it, and their support is top-notch.",
    rating: 5,
    is_featured: true,
    is_active: true,
    sort_order: 2,
  },
  {
    seed_identifier: "testimonial-carol-davis",
    client_name: "Carol Davis",
    client_title: "Head of Marketing",
    client_company: "Creative Brands",
    content:
      "Their data analytics insights revolutionized our strategy. We're now making much more informed decisions.",
    rating: 4,
    is_featured: false,
    is_active: true,
    sort_order: 3,
  },
  {
    seed_identifier: "testimonial-david-lee",
    client_name: "David Lee",
    client_title: "Founder",
    client_company: "Startup Nexus",
    content:
      "Exceptional UI/UX design! Jiaminie understood our vision perfectly and delivered a beautiful, user-friendly interface.",
    rating: 5,
    is_featured: true,
    is_active: true,
    sort_order: 4,
  },
  {
    seed_identifier: "testimonial-eve-green",
    client_name: "Eve Green",
    client_title: "Operations Director",
    content:
      "The custom software solution streamlined our workflow dramatically. Jiaminie's team was professional and delivered on time.",
    rating: 4,
    is_featured: true,
    is_active: true,
    sort_order: 5,
  },
  {
    seed_identifier: "testimonial-frank-white",
    client_name: "Frank White",
    client_title: "Digital Strategist",
    client_company: "Growth Gurus",
    content:
      "While not featured, their digital marketing expertise helped us achieve significant ROI. A solid partner.",
    rating: 4,
    is_featured: false,
    is_active: true,
    sort_order: 6,
  },
];

const mockProjects = [
  {
    seed_identifier: "project-ecommerce-platform",
    slug: "ecommerce-platform-reimagined",
    title: "E-commerce Platform Reimagined",
    short_description:
      "A modern, scalable e-commerce solution with integrated analytics and a seamless user experience.",
    description:
      "Developed a full-stack e-commerce platform featuring secure payment processing, real-time inventory management, and personalized user dashboards. Utilized Next.js for the frontend, Node.js with Express for the backend API, and PostgreSQL for the database. Implemented advanced search functionalities and a robust admin panel.",
    imageSrc:
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1/projects/ecommerce-reimagined.jpg", // Replace with your Cloudinary URL
    altText: "Screenshot of a modern e-commerce platform homepage",
    category: "Web Application",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Tailwind CSS",
      "Stripe API",
    ],
    client_name: "Fashion Forward Co.",
    project_url: "https://www.example.com/ecommerce-reimagined",
    github_url: "https://github.com/your-username/ecommerce-reimagined",
    is_featured: true,
    is_active: true,
    sort_order: 1,
  },
  {
    seed_identifier: "project-fitness-mobile-app",
    slug: "cross-platform-fitness-app",
    title: "Cross-Platform Fitness Tracker",
    short_description:
      "An intuitive mobile app for tracking workouts, nutrition, and progress, available on iOS and Android.",
    description:
      "Built a comprehensive fitness tracking mobile application using React Native, allowing users to log exercises, create custom workout plans, track caloric intake, and visualize progress with interactive charts. Integrated with health APIs for seamless data synchronization and provided personalized coaching modules.",
    imageSrc:
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1/projects/fitness-app.jpg", // Replace with your Cloudinary URL
    altText: "Screenshot of a mobile fitness tracking application dashboard",
    category: "Mobile Application",
    technologies: [
      "React Native",
      "Firebase",
      "Redux",
      "Expo",
      "HealthKit API",
      "Google Fit API",
    ],
    client_name: "FitLife Solutions",
    project_url: null, // No public URL
    github_url: "https://github.com/your-username/fitness-app",
    is_featured: true,
    is_active: true,
    sort_order: 2,
  },
  {
    seed_identifier: "project-dashboard-ui-ux",
    slug: "data-analytics-dashboard-ui",
    title: "Interactive Data Analytics Dashboard UI/UX",
    short_description:
      "Designed and prototyped a sleek, user-friendly dashboard for complex data visualization and reporting.",
    description:
      "Led the UI/UX design process for a sophisticated data analytics dashboard. Focused on creating intuitive navigation, clear data presentation, and customizable widgets. Conducted extensive user research, wireframing, and prototyping in Figma, ensuring an optimal user experience for business intelligence professionals.",
    imageSrc:
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1/projects/dashboard-ui.jpg", // Replace with your Cloudinary URL
    altText: "Screenshot of a data analytics dashboard interface",
    category: "UI/UX Design",
    technologies: [
      "Figma",
      "Adobe XD",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
    ],
    client_name: "Insightful Corp.",
    project_url: null,
    github_url: null,
    is_featured: false, // Not featured on homepage
    is_active: true,
    sort_order: 3,
  },
];

// --- NEW: MOCK TEAM MEMBERS DATA ---
const mockTeamMembers = [
  {
    seed_identifier: "team-member-jane-doe",
    name: "Jane Doe",
    role: "Lead Software Engineer",
    bio: "Jane is a seasoned software engineer with over 10 years of experience in building scalable web applications. She specializes in full-stack development with a passion for clean code and innovative solutions.",
    avatar_url:
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1/team/jane_doe.jpg", // IMPORTANT: Replace with your Cloudinary URL
    social_links: {
      linkedin: "https://linkedin.com/in/janedoe",
      github: "https://github.com/janedoe",
      twitter: "https://twitter.com/janedoe_dev",
    },
    is_active: true,
    sort_order: 1,
  },
  {
    seed_identifier: "team-member-john-smith",
    name: "John Smith",
    role: "Senior UI/UX Designer",
    bio: "John is an award-winning UI/UX designer known for creating intuitive and visually stunning user experiences. He excels in user research, wireframing, and prototyping, bringing ideas to life with user-centric design.",
    avatar_url:
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1/team/john_smith.jpg", // IMPORTANT: Replace with your Cloudinary URL
    social_links: {
      linkedin: "https://linkedin.com/in/johnsmithdesign",
      behance: "https://behance.net/johnsmith",
    },
    is_active: true,
    sort_order: 2,
  },
];

async function main() {
  console.log(`Start seeding ...`);

  // --- Seed Admin User ---
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {
      name: "Super Admin",
      role: UserRole.ADMIN,
      is_active: true,
    },
    create: {
      email: "admin@example.com",
      name: "Super Admin",
      role: UserRole.ADMIN,
      is_active: true,
    },
  });
  console.log(`Upserted admin user with id: ${adminUser.id}`);

  // --- Seed Services ---
  const mockServicesWithCreator = mockServices.map((service) => ({
    ...service,
    created_by: adminUser.id,
  }));

  for (const service of mockServicesWithCreator) {
    const upsertedService = await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        description: service.description,
        short_desc: service.short_desc,
        technologies: service.technologies,
        features: service.features,
        is_featured: service.is_featured,
        is_active: service.is_active,
        sort_order: service.sort_order,
        created_by: service.created_by,
      },
      create: {
        name: service.name,
        slug: service.slug,
        created_by: service.created_by,
        description: service.description,
        short_desc: service.short_desc,
        technologies: service.technologies,
        features: service.features,
        is_featured: service.is_featured,
        is_active: service.is_active,
        sort_order: service.sort_order,
      },
    });
    console.log(`Upserted service with id: ${upsertedService.id}`);
  }

  // --- Seed Testimonials ---
  console.log(`\nSeeding testimonials...`);
  for (const testimonialData of mockTestimonials) {
    const upsertedTestimonial = await prisma.testimonial.upsert({
      where: { seed_identifier: testimonialData.seed_identifier },
      update: {
        client_name: testimonialData.client_name,
        client_title: testimonialData.client_title,
        client_company: testimonialData.client_company,
        content: testimonialData.content,
        rating: testimonialData.rating,
        is_featured: testimonialData.is_featured,
        is_active: testimonialData.is_active,
        sort_order: testimonialData.sort_order,
      },
      create: {
        seed_identifier: testimonialData.seed_identifier,
        client_name: testimonialData.client_name,
        client_title: testimonialData.client_title,
        client_company: testimonialData.client_company,
        content: testimonialData.content,
        rating: testimonialData.rating,
        is_featured: testimonialData.is_featured,
        is_active: testimonialData.is_active,
        sort_order: testimonialData.sort_order,
        created_by: adminUser.id,
      },
    });
    console.log(
      `Upserted testimonial with id: ${upsertedTestimonial.id} from ${upsertedTestimonial.client_name}`
    );
  }

  // --- Seed Projects ---
  console.log(`\nSeeding projects...`);
  for (const projectData of mockProjects) {
    const upsertedProject = await prisma.project.upsert({
      where: { seed_identifier: projectData.seed_identifier },
      update: {
        slug: projectData.slug,
        title: projectData.title,
        description: projectData.description,
        short_description: projectData.short_description,
        imageSrc: projectData.imageSrc,
        altText: projectData.altText,
        category: projectData.category,
        technologies: projectData.technologies,
        client_name: projectData.client_name,
        project_url: projectData.project_url,
        github_url: projectData.github_url,
        is_featured: projectData.is_featured,
        is_active: projectData.is_active,
        sort_order: projectData.sort_order,
        created_by: adminUser.id,
      },
      create: {
        seed_identifier: projectData.seed_identifier,
        slug: projectData.slug,
        title: projectData.title,
        description: projectData.description,
        short_description: projectData.short_description,
        imageSrc: projectData.imageSrc,
        altText: projectData.altText,
        category: projectData.category,
        technologies: projectData.technologies,
        client_name: projectData.client_name,
        project_url: projectData.project_url,
        github_url: projectData.github_url,
        is_featured: projectData.is_featured,
        is_active: projectData.is_active,
        sort_order: projectData.sort_order,
        created_by: adminUser.id,
      },
    });
    console.log(
      `Upserted project with id: ${upsertedProject.id}: ${upsertedProject.title}`
    );
  }

  // --- NEW: Seed Team Members ---
  console.log(`\nSeeding team members...`);
  for (const memberData of mockTeamMembers) {
    const upsertedMember = await prisma.teamMember.upsert({
      where: { seed_identifier: memberData.seed_identifier },
      update: {
        name: memberData.name,
        role: memberData.role,
        bio: memberData.bio,
        avatar_url: memberData.avatar_url,
        social_links: memberData.social_links,
        is_active: memberData.is_active,
        sort_order: memberData.sort_order,
        created_by: adminUser.id, // Link to the admin user
      },
      create: {
        seed_identifier: memberData.seed_identifier,
        name: memberData.name,
        role: memberData.role,
        bio: memberData.bio,
        avatar_url: memberData.avatar_url,
        social_links: memberData.social_links,
        is_active: memberData.is_active,
        sort_order: memberData.sort_order,
        created_by: adminUser.id, // Link to the admin user
      },
    });
    console.log(`Upserted team member: ${upsertedMember.name}`);
  }

  console.log(`\nSeeding finished.`);
} // END OF main() function

// This block should be OUTSIDE the main function definition
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
