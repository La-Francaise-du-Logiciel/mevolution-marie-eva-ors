"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <html lang="fr">
      <body>
        <main>
          <h1>Une erreur est survenue</h1>
          <p>Veuillez réessayer ultérieurement.</p>
        </main>
      </body>
    </html>
  );
}
