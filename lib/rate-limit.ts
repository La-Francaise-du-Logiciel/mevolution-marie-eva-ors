/**
 * Rate limiting en mémoire (fenêtre fixe), par instance.
 * Protection basique du formulaire. Pour de la production à fort trafic,
 * préférer un store partagé (Upstash Redis, Vercel KV…).
 */
type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();

  // Nettoyage paresseux des entrées expirées.
  if (store.size > 500) {
    for (const [k, v] of store) {
      if (now > v.resetAt) store.delete(k);
    }
  }

  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { ok: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}
