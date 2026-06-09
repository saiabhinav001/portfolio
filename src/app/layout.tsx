import type { Metadata, Viewport } from "next";
import { profile, meta } from "@/content/site";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SectionRail } from "@/components/layout/section-rail";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
  title: {
    default: meta.title,
    template: "%s — Sai Abhinav Sadineni",
  },
  description: meta.description,
  keywords: [...meta.keywords],
  authors: [{ name: profile.name, url: meta.url }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: meta.url,
    title: meta.title,
    description: meta.description,
    siteName: meta.title,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFB" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0E" },
  ],
};

const [addressLocality, addressCountry] = profile.location.split(",").map((s) => s.trim());

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: meta.url,
  email: profile.email,
  jobTitle: "AI & Software Engineer · Systems Builder",
  address: { "@type": "PostalAddress", addressLocality, addressCountry },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.leetcode],
  knowsAbout: [...meta.keywords],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <body className="font-sans antialiased">
        {/* Reveal animations are JS-driven (initial opacity:0); guarantee content is visible without JS. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
          >
            Skip to content
          </a>
          <SiteHeader />
          <SectionRail />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
