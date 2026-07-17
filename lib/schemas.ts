import { z } from "zod";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactErrorMessages = {
  name: string;
  email: string;
  message: string;
  messageShort: string;
  consent: string;
};

/** Schéma du formulaire de contact, avec messages d'erreur localisés. */
export function createContactSchema(m: ContactErrorMessages) {
  return z.object({
    name: z.string().trim().min(1, m.name).max(120),
    email: z.string().trim().min(1, m.email).regex(EMAIL_RE, m.email).max(200),
    phone: z.string().trim().max(40).optional(),
    message: z.string().trim().min(1, m.message).min(10, m.messageShort).max(4000),
    consent: z.boolean().refine((value) => value === true, { message: m.consent }),
    // Honeypot anti-spam : doit rester vide (rempli uniquement par les bots).
    company: z.string().max(100).optional(),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

/** Messages génériques pour la validation serveur (non affichés à l'utilisateur). */
export const SERVER_CONTACT_MESSAGES: ContactErrorMessages = {
  name: "Invalid name",
  email: "Invalid email",
  message: "Invalid message",
  messageShort: "Message too short",
  consent: "Consent required",
};

export const serverContactSchema = createContactSchema(SERVER_CONTACT_MESSAGES);
