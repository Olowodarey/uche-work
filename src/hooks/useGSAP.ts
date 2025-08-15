import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Custom hook for GSAP animations
export const useGSAP = () => {
  // Page transition animations
  const animatePageEnter = (element: HTMLElement) => {
    gsap.fromTo(element, 
      { 
        opacity: 0, 
        y: 30 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: 'power2.out' 
      }
    )
  }

  const animatePageExit = (element: HTMLElement) => {
    return gsap.to(element, {
      opacity: 0,
      y: -30,
      duration: 0.3,
      ease: 'power2.in'
    })
  }

  // Grid stagger animations
  const animateGridItems = (elements: NodeListOf<Element> | Element[]) => {
    gsap.fromTo(elements,
      {
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }
    )
  }

  // Button hover animations
  const animateButtonHover = (element: HTMLElement, isHover: boolean) => {
    gsap.to(element, {
      scale: isHover ? 1.05 : 1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }

  // Loading spinner animation
  const animateSpinner = (element: HTMLElement) => {
    gsap.to(element, {
      rotation: 360,
      duration: 1,
      ease: 'none',
      repeat: -1
    })
  }

  // Theme transition animation
  const animateThemeTransition = () => {
    const tl = gsap.timeline()
    tl.to('body', {
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.inOut'
    })
    .to('body', {
      scale: 1,
      duration: 0.2,
      ease: 'power2.inOut'
    })
    return tl
  }

  // Modal animations
  const animateModalEnter = (element: HTMLElement) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        scale: 0.9,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      }
    )
  }

  const animateModalExit = (element: HTMLElement) => {
    return gsap.to(element, {
      opacity: 0,
      scale: 0.9,
      y: 50,
      duration: 0.2,
      ease: 'power2.in'
    })
  }

  // Card hover animations
  const animateCardHover = (element: HTMLElement, isHover: boolean) => {
    gsap.to(element, {
      y: isHover ? -8 : 0,
      scale: isHover ? 1.02 : 1,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  // Text reveal animation
  const animateTextReveal = (element: HTMLElement) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  return {
    animatePageEnter,
    animatePageExit,
    animateGridItems,
    animateButtonHover,
    animateSpinner,
    animateThemeTransition,
    animateModalEnter,
    animateModalExit,
    animateCardHover,
    animateTextReveal
  }
}

// Hook for element refs with GSAP animations
export const useGSAPRef = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null)
  const { animatePageEnter } = useGSAP()

  useEffect(() => {
    if (ref.current) {
      animatePageEnter(ref.current)
    }
  }, [])

  return ref
}