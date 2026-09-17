import type { Metadata } from "next";
import "./globals.css";
import { getSiteConfig } from "@/lib/content";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: config.site.title,
  description: config.site.description,
  icons: config.site.favicon ? { icon: config.site.favicon } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(() => { let t = null; try { t = localStorage.getItem('portfolio-theme'); } catch {} const dark = t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches); document.documentElement.dataset.theme = dark ? 'dark' : 'light'; document.documentElement.dataset.themeSource = t ? 'explicit' : 'system'; })();` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
