import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Wrappers de navigation conscients de la locale (Link, useRouter, usePathname…). */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
