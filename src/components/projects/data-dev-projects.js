
import {
  Code2,
  ShoppingBag,
  Waves,
} from "lucide-react";

export const DEV_PROJECTS = [
  {
    id: "strave",
    title: "Strave",
    category: "Web Application",
    icon: Code2,
    description:
      "Developed a web application using Laravel, RESTful APIs, Docker, and MySQL.",
    tags: ["Laravel", "RESTful API", "Docker", "MySQL"],
    image: "/images/strave.webp",
    alt: "Strave web application interface",
  },
  {
    id: "tradegate",
    title: "TradeGate",
    category: "Inventory & Transaction Management",
    icon: ShoppingBag,
    description:
      "Developed a web-based system for product and inventory management, purchasing, order processing, balance management, and document handling.",
    tags: ["Laravel", "MySQL", "API", "Inventory Management"],
    image: "/images/tradegate.webp",
    alt: "TradeGate inventory and transaction management interface",
  },
  {
    id: "siaga-banjir",
    title: "Siaga Banjir",
    category: "Flood Information & Mitigation",
    icon: Waves,
    description:
      "Developed a flood information and mitigation website featuring flood-prone area maps, disaster preparedness education, and emergency contact information for West Java.",
    tags: ["HTML", "CSS", "JavaScript", "Leaflet.js"],
    image: "/images/siaga-banjir.webp",
    alt: "Siaga Banjir flood information and risk mapping website",
  },
];
