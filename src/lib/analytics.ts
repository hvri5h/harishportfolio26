declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function trackPageView(path: string, title?: string) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
  });
}
