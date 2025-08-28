'use client'

import { useEffect } from 'react'

export default function FaviconSwitcher() {
  useEffect(() => {
    const updateFavicon = (isDark: boolean) => {
      let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement
      
      if (!link) {
        link = document.createElement('link')
        link.rel = 'shortcut icon'
        document.head.appendChild(link)
      }
      
      link.href = isDark ? '/favicon-dark.ico' : '/favicon-light.ico'
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    updateFavicon(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => updateFavicon(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return null
}

// ill fix this later