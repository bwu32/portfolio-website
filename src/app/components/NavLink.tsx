"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface NavLinkProps {
  href: string
  icon: string
  text: string
  isActive?: boolean
}

export default function NavLink({ href, icon, text, isActive = false }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isCurrent, setIsCurrent] = useState(isActive)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      let activeFound = false

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const offset = 100 // Adjust the scroll detection offset here
        if (rect.top <= offset && rect.bottom >= offset) {
          if (href === `#${section.id}`) {
            setIsCurrent(true)
            activeFound = true
          }
        }
      })

      if (!activeFound) setIsCurrent(false) // No active tab when between sections
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [href])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const section = document.querySelector(href)
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: sectionTop, // Adjust offset for smooth scroll
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
    <button
      onClick={handleClick}
      className="group flex items-center space-x-4 text-white transition-all duration-300 focus:outline-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <Image
        src={icon || "/placeholder.svg"}
        alt={text}
        width={24}
        height={24}
        className={`transition-opacity duration-300 ${getOpacityClass()}`}
      />
      <div className="flex items-center">
        {/* Line */}
        <div
          className={`h-[1px] bg-white transition-all duration-300 ${getOpacityClass()} ${
            isHovered || isCurrent ? "w-12" : "w-6"
          }`}
        />
        {/* Text */}
        <span
          className={`ml-4 transition-all duration-300 font-medium ${
            isCurrent ? "opacity-100" : isHovered ? "opacity-70" : "opacity-50"
          }`}
        >
          {text}
        </span>
      </div>
    </button>
  )
}