"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

export function useSwipe(handlers: SwipeHandlers, threshold = 50) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return

      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - touchStartRef.current.x
      const deltaY = touch.clientY - touchStartRef.current.y

      // Determine if the swipe was horizontal or vertical
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > threshold && handlers.onSwipeRight) {
          handlers.onSwipeRight()
        } else if (deltaX < -threshold && handlers.onSwipeLeft) {
          handlers.onSwipeLeft()
        }
      } else {
        // Vertical swipe
        if (deltaY > threshold && handlers.onSwipeDown) {
          handlers.onSwipeDown()
        } else if (deltaY < -threshold && handlers.onSwipeUp) {
          handlers.onSwipeUp()
        }
      }

      touchStartRef.current = null
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handlers, threshold])
}

interface PinchZoomOptions {
  minScale?: number
  maxScale?: number
}

export function usePinchZoom(elementRef: React.RefObject<HTMLElement>, options: PinchZoomOptions = {}) {
  const [scale, setScale] = useState(1)
  const initialDistanceRef = useRef<number | null>(null)
  const currentScaleRef = useRef(1)

  const { minScale = 1, maxScale = 3 } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 2) return

      const touch1 = e.touches[0]
      const touch2 = e.touches[1]

      initialDistanceRef.current = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || initialDistanceRef.current === null) return

      const touch1 = e.touches[0]
      const touch2 = e.touches[1]

      const currentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)

      const pinchRatio = currentDistance / initialDistanceRef.current
      let newScale = currentScaleRef.current * pinchRatio

      // Clamp scale to min/max
      newScale = Math.min(Math.max(newScale, minScale), maxScale)

      setScale(newScale)

      // Apply scale transform
      element.style.transform = `scale(${newScale})`
    }

    const handleTouchEnd = () => {
      if (initialDistanceRef.current !== null) {
        currentScaleRef.current = scale
        initialDistanceRef.current = null
      }
    }

    element.addEventListener("touchstart", handleTouchStart, { passive: true })
    element.addEventListener("touchmove", handleTouchMove, { passive: true })
    element.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
      element.removeEventListener("touchmove", handleTouchMove)
      element.removeEventListener("touchend", handleTouchEnd)
    }
  }, [elementRef, scale, minScale, maxScale])

  return { scale, resetScale: () => setScale(1) }
}

export function useTouchRipple() {
  const createRipple = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    const button = event.currentTarget

    // Get position
    let x, y
    if ("touches" in event) {
      const touch = event.touches[0]
      const rect = button.getBoundingClientRect()
      x = touch.clientX - rect.left
      y = touch.clientY - rect.top
    } else {
      const rect = button.getBoundingClientRect()
      x = event.clientX - rect.left
      y = event.clientY - rect.top
    }

    const circle = document.createElement("span")
    const diameter = Math.max(button.clientWidth, button.clientHeight)

    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${x - diameter / 2}px`
    circle.style.top = `${y - diameter / 2}px`
    circle.classList.add("touch-ripple")

    const existingRipple = button.querySelector(".touch-ripple")
    if (existingRipple) {
      existingRipple.remove()
    }

    button.appendChild(circle)

    // Remove the ripple after animation
    setTimeout(() => {
      if (circle && circle.parentNode) {
        circle.parentNode.removeChild(circle)
      }
    }, 600)
  }

  return { createRipple }
}

