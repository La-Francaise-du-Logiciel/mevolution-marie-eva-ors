import posthog from "posthog-js";

/** Capture d'événement PostHog, sûr côté client (no-op si non initialisé / SSR). */
export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!posthog.__loaded) return;
  try {
    posthog.capture(event, properties);
  } catch {
    // silencieux : l'analytics ne doit jamais casser l'UI
  }
}
