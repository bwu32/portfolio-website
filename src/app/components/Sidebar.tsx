import Image from "next/image"
import NavLink from "./NavLink"

const navItems = [
  {
    name: "ABOUT",
    href: "#about",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/snowflake-u5UFhxjO4zgoXvquYHBNCDaRvUXA2y.png",
  },
  { name: "EXPERIENCE", href: "#experience", icon: "/jett-updraft.png" },
  { name: "PORTFOLIO", href: "#portfolio", icon: "/jett-tailwind.png" },
  { name: "SKILLS", href: "#skills", icon: "/jett-dash.png" },
  { name: "MORE", href: "#more", icon: "/jett-blade.png" },
]

export default function Sidebar() {
  return (
    <aside className="bg-[#1B224C] h-screen w-1/4 flex flex-col px-8 py-4 text-[#E8DDB5]">
      <div className="mb-8">
        <p className="uppercase text-sm opacity-80">Product Designer</p>
        <h1 className="text-[#E8DDB5] text-4xl font-['Impact']">BRIAN WU</h1>
        <p className="mt-2 text-sm opacity-80">doing the work. having fun. not sweating the small stuff.</p>
      </div>
      <nav className="space-y-6">
        {navItems.map((item) => (
          <NavLink key={item.name} href={item.href} icon={item.icon} text={item.name} />
        ))}
      </nav>
      <footer className="mt-auto flex space-x-6">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-60 hover:opacity-100 transition-opacity"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/snowflake-u5UFhxjO4zgoXvquYHBNCDaRvUXA2y.png"
            alt="GitHub"
            width={24}
            height={24}
          />
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-60 hover:opacity-100 transition-opacity"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/snowflake-u5UFhxjO4zgoXvquYHBNCDaRvUXA2y.png"
            alt="LinkedIn"
            width={24}
            height={24}
          />
        </a>
        <a href="mailto:your.email@example.com" className="opacity-60 hover:opacity-100 transition-opacity">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/snowflake-u5UFhxjO4zgoXvquYHBNCDaRvUXA2y.png"
            alt="Email"
            width={24}
            height={24}
          />
        </a>
      </footer>
    </aside>
  )
}

