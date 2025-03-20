import { useEffect } from "react"

export function useTextZoom() {
  useEffect(() => {
    // Only run on mobile devices
    if (typeof window === "undefined" || window.innerWidth >= 768) return

    const zoomableElements = document.querySelectorAll<HTMLElement>(".zoomable-text")
    let timeout: ReturnType<typeof setTimeout>

    const handleTouchStart = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target.classList.contains("zoomable-text")) return

      // Add zoom effect
      target.style.transform = "scale(1.1)"
      target.style.transition = "transform 0.2s ease-out"
      target.style.zIndex = "10"
    }

    const handleTouchEnd = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target.classList.contains("zoomable-text")) return

      // Clear previous timeout
      if (timeout) clearTimeout(timeout)

      // Set new timeout for fade out
      timeout = setTimeout(() => {
        target.style.transform = "scale(1)"
        target.style.zIndex = "auto"
      }, 300)
    }

    // Add event listeners to each element
    zoomableElements.forEach((element) => {
      element.addEventListener("touchstart", handleTouchStart, { passive: true })
      element.addEventListener("touchend", handleTouchEnd, { passive: true })
    })

    // Cleanup
    return () => {
      zoomableElements.forEach((element) => {
        element.removeEventListener("touchstart", handleTouchStart)
        element.removeEventListener("touchend", handleTouchEnd)
      })
      if (timeout) clearTimeout(timeout)
    }
  }, [])
} 