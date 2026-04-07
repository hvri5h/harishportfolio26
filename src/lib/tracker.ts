const ENDPOINT = "/api/t";

let sessionId: string;
let startTime: number;
let hasBounced = true;
let interactionSent = false;
let normalizedDomain: string;

function getSessionId(): string {
  if (sessionId) return sessionId;
  const stored = sessionStorage.getItem("_sid");
  if (stored) {
    sessionId = stored;
    return stored;
  }
  sessionId = crypto.randomUUID();
  sessionStorage.setItem("_sid", sessionId);
  return sessionId;
}

function getParams(): Record<string, string | null> {
  const url = new URL(window.location.href);
  return {
    ref: url.searchParams.get("ref"),
    utm_source: url.searchParams.get("utm_source"),
    utm_medium: url.searchParams.get("utm_medium"),
    utm_campaign: url.searchParams.get("utm_campaign"),
  };
}

function send(data: Record<string, unknown>) {
  try {
    navigator.sendBeacon(ENDPOINT, JSON.stringify(data));
  } catch {
    // silently fail
  }
}

function onInteraction() {
  if (interactionSent) return;
  interactionSent = true;
  hasBounced = false;
  send({
    session_id: getSessionId(),
    domain: normalizedDomain,
    path: window.location.pathname,
    is_bounce: false,
  });
  window.removeEventListener("scroll", onInteraction);
  window.removeEventListener("click", onInteraction);
}

function onLeave() {
  const duration = Math.round((performance.now() - startTime) / 1000);
  send({
    session_id: getSessionId(),
    domain: normalizedDomain,
    path: window.location.pathname,
    session_duration: duration,
    is_bounce: hasBounced,
  });
}

export function initTracker() {
  if (typeof window === "undefined") return;

  const hostname = window.location.hostname;
  // Only track on production domains
  const allowedDomains = ["hari.sh", "www.hari.sh", "htiruna.com", "www.htiruna.com", "harish.design", "www.harish.design"];
  if (!allowedDomains.includes(hostname)) return;

  // Don't track the analytics dashboard itself
  if (window.location.pathname.startsWith("/analytics")) return;

  startTime = performance.now();
  const params = getParams();

  // Normalize domain — strip www. prefix
  normalizedDomain = hostname.replace(/^www\./, "");

  send({
    session_id: getSessionId(),
    domain: normalizedDomain,
    path: window.location.pathname,
    referrer: document.referrer || null,
    ref_param: params.ref,
    utm_source: params.utm_source,
    utm_medium: params.utm_medium,
    utm_campaign: params.utm_campaign,
    is_bounce: true,
    session_duration: 0,
  });

  window.addEventListener("scroll", onInteraction, { once: true, passive: true });
  window.addEventListener("click", onInteraction, { once: true });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") onLeave();
  });
  window.addEventListener("beforeunload", onLeave);
}
