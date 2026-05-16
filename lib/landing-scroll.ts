/** Fixed navbar height — keep in sync with Navbar scroll offset */
export const LANDING_HEADER_OFFSET = 80;

export function scrollToLandingSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - LANDING_HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  return true;
}
