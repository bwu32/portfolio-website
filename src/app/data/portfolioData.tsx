export interface Experience {
    period: string;
    title: string;
    company: string;
    link: string;
    description: string;
}

export interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
    tech: string[];
}

export interface SkillCategory {
    category: string;
    skills: string[];
}

export const experiences: Experience[] = [
    {
        period: "2025 — PRESENT",
        title: "Research & Design Assistant",
        company: "Professor Romel Gomez",
        link: "https://ece.umd.edu/clark/faculty/399/Romel-Gomez",
        description:
            "Collaborated with a professor on interdisciplinary research and engineering projects spanning mechanical and electromechanical systems. Designed an autonomous catch-and-release landing platform for drones using linear actuators and magnetic deployment. Developed a zero-tolerance, angle-agnostic docking system featuring a rotating core and custom magnetic drone legs to ensure reliable capture and interlock."
    },
    {
        period: "2024 — 2025",
        title: "Design Intern",
        company: "New Dim Sum Kingdom",
        link: "https://www.newdimsumkingdom.com/",
        description:
            "Created graphics and runs social media page to effectively promote and advertise the restaurant's deals and updates as they occur. Worked directly with managers and owners to facilitate best interests of the restaurant through the social media page.",
    },
    {
        period: "2023 — 2024",
        title: "Graphic Designer",
        company: "Taiwanese American Student Association",
        link: "https://www.instagram.com/umcptasa/",
        description:
            "Elevated the visual identity of social media platforms through collaborative design and publishing of 10+ graphics per month across cultural, social, and informational content, reaching 2,000+ students. Served on a 27-member board to plan and execute campus events promoting Taiwanese culture.",
    },
    {
        period: "2020 — 2021",
        title: "Lightsaber Designer Intern",
        company: "ThePachStore",
        link: "https://thepachstore.com",
        description:
            "Collaborated with ThePachStore's design team, gaining hands-on insight into electronics production and the full product development pipeline. Led the design of The Highborn lightsaber model for mass production, resulting in 3,000+ units sold worldwide.",
    },
];

export const projects: Project[] = [
    {
        title: "S.Q.U.I.D. Autonomous Submersible Vehicle",
        description: "Designed structural and mechanical systems for a watertight autonomous submersible vehicle. Engineered modular electronics housing and sealing system using custom-machined components while serving as primary structural lead. ",
        image: "/icons/showcase/submarine.jpg",
        link: "/submarine_paper.pdf",
        tech: [
            "Fusion 360 (CAD / CAM)",
            "CNC Milling & Turning",
            "FDM & SLA 3D Printing",
            "PCB Soldering",
            "Circuitry",
            "Arduino",
            "Raspberry Pi",
            "Rapid Prototyping",
            "Watertight Sealing",
            "Plastic/Polymer Processing"
        ]
    },
    {
        title: "Fortnite LinkedIn Auto Poster",
        description: "An automated pipeline built using a hybrid computer vision and OCR pipeline to detect whenever you achieve that #1 Victory Royale to generate and post celebratory/bragging LinkedIn posts via Selenium and OpenAI API.",
        image: "/icons/showcase/linkedinautoposter.png",
        link: "https://github.com/bwu32/fortnitelinkedinautoposter",
        tech: [
            "Python",
            "Computer Vision",
            "OCR",
            "OpenAI API",
            "Selenium",
            "Web Automation",
            "AI Prompting",
            "Real-Time Detection",
            "Software Architecture"
        ]
    },
    {
        title: "CAN Bus Security Simulation",
        description: "Built a real-time CAN Bus security framework with multithreaded ECUs and layered cryptographic defenses, paired with a React/WebSocket dashboard for live attack monitoring, achieving 100% attack detection under 2ms latency.",
        image: "/icons/showcase/canbus.png",
        link: "/canbus_paper.pdf",
        tech: [
            "Python",
            "Multithreading",
            "Cryptography (AES, HMAC)",
            "CAN Bus Network",
            "Intrusion Detection Systems",
            "Rate Limiting",
            "React",
            "WebSockets",
            "Full-Stack",
        ]
    },
];

export const skills: SkillCategory[] = [
    {
        category: "AI & Software Development",
        skills: [
            "AI Prompting",
            "Google Notebook LM",
            "Node.js / Next.js",
            "React",
            "HTML",
            "CSS",
            "MATLAB",
            "Excel",
            "Java",
            "Python",
            "C",
            "Rust",
            "OCaml",
            "Google Workspace",
            "MS Teams",
            "Windows",
            "Zoom",
        ],
    },
    {
        category: "Design & Visual Media",
        skills: [
            "Figma",
            "Canva",
            "Adobe Creative Cloud",
            "Photoshop",
            "Premiere Pro",
            "After Effects",
            "Illustrator",
            "Paint.NET",
            "Audacity",
            "Blender",
            "DJI Ecosystem"
        ],
    },
    {
        category: "Digital Fabrication & Prototyping",
        skills: [
            "Fusion 360 (CAD / CAM)",
            "SolidWorks (CAD & FEA)",
            "Autodesk Inventor",
            "Onshape",
            "Meshmixer",
            "FDM & SLA 3D Printing",
            "PrusaSlicer",
            "Cura",
            "Laser Cutting",
            "CNC Milling & Turning",
            "Arduino",
            "PCB Soldering",
            "Circuitry",
            "Surface Post-Processing"
        ],
    },
    {
        category: "Creative & Practical Arts",
        skills: [
            "Sewing",
            "Embroidery",
            "Apparel Design",
            "Creative Prototyping",
            "Automotive Painting & Finishing",
            "DIY Repair",
            "Carpentry",
            "Dance"
        ],
    },
];

export const aboutParagraphs = [
    <>
        hello there! i&apos;m a recent graduate with a degree in{" "}
        <a
            href="https://ece.umd.edu/undergraduate/degrees/bs-computer-engineering"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white hover:opacity-80 transition-opacity"
        >
            computer engineering
        </a>{" "}
        from university of maryland, college park.
    </>,
    <>
        currently, i&apos;m an incoming field engineer @{" "}
        <a
            href="https://www.siemens.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white hover:opacity-80 transition-opacity"
        >
            siemens
        </a>
        . i&apos;m passionate about engineering solutions that blend{" "}
        <a
            href="https://www.merriam-webster.com/dictionary/creativity"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white hover:opacity-80 transition-opacity"
        >
            creativity
        </a>{" "}
        with{" "}
        <a
            href="https://www.merriam-webster.com/dictionary/functionality"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white hover:opacity-80 transition-opacity"
        >
            functionality
        </a>{" "}
        — and having fun while doing so! as a designer, i&apos;m building up expertise in product, experience, and media design.
    </>,
    <>
        outside of design, i enjoy working on props &amp; apparel, learning a new dance, building legos, or getting that{" "}
        <a
            href="https://www.youtube.com/watch?v=Z0Uh3OJCx3o"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white hover:opacity-80 transition-opacity"
        >
            #1 victory royale
        </a>
        .
    </>,
];
