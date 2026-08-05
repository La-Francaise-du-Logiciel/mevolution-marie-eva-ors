"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";

/** Fournit PostHog + capture des pages vues à chaque navigation (App Router). */
export function PostHogProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(posthog.__loaded);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;
    if (posthog.__loaded) return;

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
      defaults: "2026-05-30",
      cookieless_mode: "always",
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: true,
      disable_session_recording: true,
      disable_surveys: true,
      advanced_disable_flags: true,
      disable_capture_url_hashes: true,
      mask_personal_data_properties: true,
      person_profiles: "never",
      respect_dnt: true,
      loaded: () => setReady(true),
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      {ready && <PageViewTracker />}
      {children}
    </PHProvider>
  );
}

function PageViewTracker() {
  const pathname = usePathname();
  const ph = usePostHog();

  useEffect(() => {
    if (!pathname || !ph?.__loaded) return;
    ph.capture("$pageview", { $current_url: window.location.origin + pathname });
  }, [pathname, ph]);

  return null;
}
