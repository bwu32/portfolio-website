"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface NavLinkProps {
  href: string
  icon: string
  text: string
  isActive?: boolean
  isMoreLink?: boolean
  dropdownItems?: Array<{
    name: string
    href: string
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
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're at the bottom of the page
      const isBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10
      setIsAtBottom(isBottom)

      if (isMoreLink) {
        // For MORE link, activate when at bottom or dropdown is shown
        setIsCurrent(isBottom || showDropdown)
        // Auto-show dropdown when at bottom
        if (isBottom) {
          setShowDropdown(true)
        }
        return
      }

      // Regular section detection logic for other nav items
      const sections = document.querySelectorAll("section")
      let activeFound = false

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const offset = 100
        if (rect.top <= offset && rect.bottom >= offset) {
          if (href === `#${section.id}`) {
            setIsCurrent(true)
            activeFound = true
          }
        }
      })

      if (!activeFound) {
        const lastSection = sections[sections.length - 1]
        const lastRect = lastSection.getBoundingClientRect()
        const isLastLink = href === `#${lastSection.id}`
      
        if (isLastLink && lastRect.top <= 100) {
          setIsCurrent(true)
        } else {
          setIsCurrent(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check on mount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [href, isMoreLink, showDropdown])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (isMoreLink) {
      // Toggle dropdown for MORE link
      setShowDropdown(!showDropdown)
      return
    }

    // Regular scroll behavior for other nav items
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
        {/* Icon */}
        <Image
          src={icon || "/placeholder.svg"}
          alt={text}
          width={24}
          height={24}
          className={`transition-opacity duration-300 ${getOpacityClass()}`}
        />
        <div className="flex items-center flex-1">
          {/* Line */}
          <div
            className={`h-[1px] bg-white transition-all duration-300 ${getOpacityClass()} ${isHovered || isCurrent ? "w-12" : "w-6"
              }`}
          />
          {/* Text */}
          <span
            className={`ml-4 transition-all duration-300 font-medium ${isCurrent ? "opacity-100" : isHovered ? "opacity-70" : "opacity-50"
              }`}
          >
            {text}
          </span>
          {/* Dropdown arrow for MORE link */}
          {isMoreLink && (
            <ChevronDown 
              className={`ml-2 w-4 h-4 transition-all duration-300 ${
                showDropdown ? "rotate-180" : ""
              } ${getOpacityClass()}`}
            />
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isMoreLink && (
        <div className={`
          overflow-hidden transition-all duration-300 ease-out
          ${showDropdown ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}>
          <div className="mt-4 ml-10 space-y-2 border-l border-white border-opacity-20 pl-4">
            {dropdownItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block group/dropdown py-2 px-3 rounded-md transition-all duration-200 hover:bg-white hover:bg-opacity-10"
              >
                <div className="text-white opacity-60 group-hover/dropdown:opacity-100 transition-opacity">
                  <div className="font-medium text-sm">{item.name}</div>
                  {item.description && (
                    <div className="text-xs opacity-70 mt-1">{item.description}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}