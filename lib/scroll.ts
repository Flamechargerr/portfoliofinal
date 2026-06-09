/**
 * Unified Scroll Utility for smooth scrolling in sync with Lenis
 */
export function scrollToElement(target: string | number | HTMLElement, duration = 1.2) {
  if (typeof window === "undefined") return;

  const lenis = (window as any).__lenis;

  if (lenis) {
    let lenisTarget = target;
    // If it's a string, and it doesn't start with '#' but is an element ID, prepend '#' for Lenis selector compatibility
    if (typeof target === "string" && !target.startsWith("#") && isNaN(Number(target))) {
      lenisTarget = `#${target}`;
    }
    lenis.scrollTo(lenisTarget, { duration });
  } else {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      let el: HTMLElement | null = null;
      if (typeof target === "string") {
        const id = target.startsWith("#") ? target.slice(1) : target;
        el = document.getElementById(id);
      } else if (target instanceof HTMLElement) {
        el = target;
      }
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
}
