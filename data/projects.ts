import { Project } from "@/types";

// Live screenshot helper — pulls a real, always-fresh screenshot of the project's
// homepage/interface so cards don't need manually uploaded cover images.
const shot = (url: string) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=750`;

export const projects: Project[] = [
  {
    slug: "fansright",
    title: "FansRight",
    category: "Web Development",
    shortDescription: "A modern web platform built and delivered by our team.",
    fullDescription:
      "FansRight is a modern web platform designed and engineered end-to-end by Professional Techs, focused on a clean interface and a fast, reliable user experience.",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    coverImage: shot("https://fansright.com/"),
    images: [shot("https://fansright.com/")],
    liveUrl: "https://fansright.com/",
    year: "2025",
  },
  {
    slug: "vinpol",
    title: "Vinpol",
    category: "Web Development",
    shortDescription: "A professional business website built for an Australian client.",
    fullDescription:
      "Vinpol is a professional business website developed for an Australian client, combining a polished interface with a fully responsive, easy-to-navigate structure.",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    coverImage: shot("https://vinpol.com.au/"),
    images: [shot("https://vinpol.com.au/")],
    liveUrl: "https://vinpol.com.au/",
    year: "2025",
  },
  {
    slug: "albe-engineering",
    title: "Albe Engineering",
    category: "Web Development",
    shortDescription: "A corporate website for an engineering services company.",
    fullDescription:
      "Albe Engineering's website was built to represent the company's engineering services with a professional, trust-building design and clear service presentation.",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    coverImage: shot("https://albeengineering.com/"),
    images: [shot("https://albeengineering.com/")],
    liveUrl: "https://albeengineering.com/",
    year: "2025",
  },
  {
    slug: "jarcon-ltd",
    title: "Jarcon Ltd",
    category: "Web Development",
    shortDescription: "A corporate web presence built for Jarcon Ltd.",
    fullDescription:
      "We built Jarcon Ltd's website to clearly communicate their services and capabilities with a modern, business-focused design.",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    coverImage: shot("https://jarconltd.com/"),
    images: [shot("https://jarconltd.com/")],
    liveUrl: "https://jarconltd.com/",
    year: "2025",
  },
  {
    slug: "epsilon-consultant",
    title: "Epsilon Consultant",
    category: "Web Development",
    shortDescription: "A consulting firm website with a clean, corporate interface.",
    fullDescription:
      "Epsilon Consultant needed a website that reflected their consulting expertise — we delivered a clean, credible, and easy-to-navigate corporate site.",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    coverImage: shot("https://epsilonconsultant.com/"),
    images: [shot("https://epsilonconsultant.com/")],
    liveUrl: "https://epsilonconsultant.com/",
    year: "2025",
  },
  {
    slug: "got-garms",
    title: "Got Garms",
    category: "Web Development",
    shortDescription: "An e-commerce style storefront with a bold, engaging design.",
    fullDescription:
      "Got Garms is a retail-focused website built with an engaging, product-first layout to drive customer interest and conversions.",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    coverImage: shot("https://gotgarms.com/"),
    images: [shot("https://gotgarms.com/")],
    liveUrl: "https://gotgarms.com/",
    year: "2025",
  },
  {
    slug: "siddiqui-association-pakistan",
    title: "Siddiqui Association Pakistan",
    category: "Web Development",
    shortDescription: "An organizational website built for a Pakistan-based association.",
    fullDescription:
      "We developed a full website for Siddiqui Association Pakistan to give the organization a professional, easy-to-manage online presence.",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    coverImage: shot("https://siddiquiassociationpakistan.com/"),
    images: [shot("https://siddiquiassociationpakistan.com/")],
    liveUrl: "https://siddiquiassociationpakistan.com/",
    year: "2025",
  },
  {
    slug: "ilm-sync",
    title: "Ilm Sync",
    category: "Web Development",
    shortDescription: "A modern web application deployed on Vercel.",
    fullDescription:
      "Ilm Sync is a modern web application built and deployed by our team, focused on performance and a smooth user experience.",
    techStack: ["Next.js", "React", "Vercel"],
    coverImage: shot("https://ilm-sync.vercel.app/"),
    images: [shot("https://ilm-sync.vercel.app/")],
    liveUrl: "https://ilm-sync.vercel.app/",
    year: "2025",
  },
  {
    slug: "vpnranks",
    title: "VPNRanks",
    category: "SEO",
    shortDescription: "SEO strategy and organic growth for a leading VPN review platform.",
    fullDescription:
      "We delivered technical SEO, content optimization, and organic growth strategy for VPNRanks, one of the well-known VPN review platforms.",
    techStack: ["Technical SEO", "Content Strategy", "Keyword Research"],
    coverImage: shot("https://vpnranks.com/"),
    images: [shot("https://vpnranks.com/")],
    liveUrl: "https://vpnranks.com/",
    year: "2025",
  },
  {
    slug: "greensense-billing",
    title: "GreenSense Billing",
    category: "SEO",
    shortDescription: "SEO optimization for a billing services website.",
    fullDescription:
      "We handled SEO for GreenSense Billing, improving on-page structure and search rankings to help the business reach more clients organically.",
    techStack: ["Technical SEO", "On-Page Optimization"],
    coverImage: shot("https://greensensebilling.com/"),
    images: [shot("https://greensensebilling.com/")],
    liveUrl: "https://greensensebilling.com/",
    year: "2025",
  },
  {
    slug: "medical-lien-mgt",
    title: "Medical Lien Mgt",
    category: "SEO",
    shortDescription: "SEO for a medical lien management services website.",
    fullDescription:
      "We provided SEO services for Medical Lien Mgt, focusing on keyword targeting and technical improvements to grow organic visibility.",
    techStack: ["Technical SEO", "On-Page Optimization"],
    coverImage: shot("https://medicallienmgt.com/"),
    images: [shot("https://medicallienmgt.com/")],
    liveUrl: "https://medicallienmgt.com/",
    year: "2025",
  },
  {
    slug: "virtualmojoe",
    title: "VirtualMojoe",
    category: "SEO",
    shortDescription: "SEO strategy and optimization for VirtualMojoe.",
    fullDescription:
      "We delivered SEO services for VirtualMojoe, including keyword research and on-page optimization to grow organic search performance.",
    techStack: ["Technical SEO", "On-Page Optimization"],
    coverImage: shot("https://virtualmojoe.com/"),
    images: [shot("https://virtualmojoe.com/")],
    liveUrl: "https://virtualmojoe.com/",
    year: "2025",
  },
  {
    slug: "ai-powered-face-shield-detection",
    title: "AI-Powered Face Shield Detection & Safety Monitoring",
    category: "AI / ML",
    shortDescription:
      "Real-time computer vision that detects face shield compliance on-site to keep workers protected.",
    fullDescription:
      "An AI-powered safety monitoring solution that uses real-time computer vision to detect whether workers are wearing face shields on-site, instantly flagging non-compliance so safety teams can respond before incidents happen.",
    techStack: ["Computer Vision", "Deep Learning", "Real-Time Detection"],
    images: [],
    video: "/videos/ai-ml/ai-powered-face-shield.mp4",
    year: "2025",
  },
  {
    slug: "ai-powered-suspended-load-safety-detection",
    title: "AI-Powered Suspended Load Safety Detection",
    category: "AI / ML",
    shortDescription:
      "AI monitoring that detects personnel under suspended loads and alerts teams to prevent accidents.",
    fullDescription:
      "A crane and lifting-safety solution that uses AI to detect when workers enter hazardous zones beneath suspended loads, triggering instant alerts to prevent serious injuries on site.",
    techStack: ["Computer Vision", "Deep Learning", "Object Tracking"],
    images: [],
    video: "/videos/ai-ml/ai-powered-suspended-load.mp4",
    year: "2025",
  },
  {
    slug: "ai-powered-warehouse-worker-safety-detection",
    title: "AI-Powered Warehouse Worker Safety Detection",
    category: "AI / ML",
    shortDescription:
      "Real-time monitoring of warehouse floors to detect unsafe worker behavior and hazards.",
    fullDescription:
      "A warehouse safety monitoring system that uses AI-powered video analytics to detect unsafe worker behavior, restricted-zone breaches, and potential hazards in real time, helping teams act before incidents occur.",
    techStack: ["Computer Vision", "Deep Learning", "Video Analytics"],
    images: [],
    video: "/videos/ai-ml/ai-powered-warehouse-worker-safety.mp4",
    year: "2025",
  },
  {
    slug: "ai-powered-vehicle-person-proximity-detection",
    title: "AI-Powered Vehicle–Person Proximity Detection & Safety Alerts",
    category: "AI / ML",
    shortDescription:
      "AI system that detects close proximity between vehicles and workers, issuing instant safety alerts.",
    fullDescription:
      "This system uses AI-powered detection to monitor the proximity between moving vehicles and personnel on-site, issuing instant safety alerts to prevent collisions in busy industrial and warehouse environments.",
    techStack: ["Computer Vision", "Deep Learning", "Real-Time Alerts"],
    images: [],
    video: "/videos/ai-ml/ai-powered-vehicle-person-proximity.mp4",
    year: "2025",
  },
];
