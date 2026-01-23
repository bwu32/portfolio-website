"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

interface NavLinkProps {
  href: string
  icon: string
  text: string
  isActive?: boolean
  isMoreLink?: boolean
  dropdownItems?: Array<{
    name: string
    href: string // Kept in interface for compatibility, but ignored for clicking
    description?: string
  }>
}

export default function NavLink({
  href,
  icon,
  text,
  isActive = false,
  isMoreLink = false,
  dropdownItems = []
}: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isCurrent, setIsCurrent] = useState(isActive)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Detect if we are at the very bottom of the page
      const isBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10;

      const sections = document.querySelectorAll("section");
      let activeFound = false;

      sections.forEach((section) => {
        if (section.offsetParent === null) return;

        const rect = section.getBoundingClientRect();
        const offset = 200;

        if (rect.top <= offset && rect.bottom >= offset) {
          if (href === `#${section.id}`) {
            activeFound = true;
          }
        }
      });

      // Final active state determination
      const active = activeFound || (isMoreLink && isBottom);
      setIsCurrent(active);

      // SYNC DROPDOWN: Open when section is active, close when it's not
      if (isMoreLink) {
        setShowDropdown(active);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [href, isMoreLink]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // Regular scroll behavior for all items (including MORE)
    const section = document.querySelector(href)
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })
    }
  }

  const getOpacityClass = () => {
    if (isCurrent) return "opacity-100"
    if (isHovered) return "opacity-70"
    return "opacity-50"
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="group flex items-center space-x-4 text-white transition-all duration-300 focus:outline-none w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={icon || "/placeholder.svg"}
          alt={text}
          width={24}
          height={24}
          className={`transition-opacity duration-300 ${getOpacityClass()}`}
        />
        <div className="flex items-center flex-1">
          <div
            className={`h-[1px] bg-white transition-all duration-300 ${getOpacityClass()} ${isHovered || isCurrent ? "w-12" : "w-6"}`}
          />
          <span
            className={`ml-4 transition-all duration-300 font-medium ${isCurrent ? "opacity-100" : isHovered ? "opacity-70" : "opacity-50"}`}
          >
            {text}
          </span>
          {isMoreLink && (
            <ChevronDown
              className={`ml-2 w-4 h-4 transition-all duration-300 ${showDropdown ? "rotate-180" : ""
                } ${getOpacityClass()}`}
            />
          )}
        </div>
      </button>

      {/* Dropdown Menu - Triggered by showDropdown (which is synced to active state) */}
      {isMoreLink && (
        <div className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${showDropdown ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}
        `}>
          <div className="ml-10 space-y-4 border-l border-white border-opacity-10 pl-4 py-2">
            {dropdownItems.map((item, index) => (
              <div
                key={index}
                className="cursor-default"
              >
                <div className="text-white opacity-30 transition-opacity">
                  <div className="font-bold text-[10px] tracking-[0.2em] uppercase">{item.name}</div>
                  {item.description && (
                    <div className="text-[9px] opacity-70 mt-1 tracking-wider">{item.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}