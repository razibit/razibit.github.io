import type { Metadata } from "next";
import "./globals.css";
import { getSiteConfig } from "@/lib/content";
import HeaderNavigation from "@/components/work/HeaderNavigation";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: config.site.title,
  description: config.site.description,
  icons: {
    icon: [
      { url: config.site.favicon || "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(() => { let t = null; try { t = localStorage.getItem('portfolio-theme'); } catch {} const dark = t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches); document.documentElement.dataset.theme = dark ? 'dark' : 'light'; document.documentElement.dataset.themeSource = t ? 'explicit' : 'system'; })();` }} />
      </head>
      <body>
        <a className="skip-link" href="#content">Skip to content</a>
        <HeaderNavigation items={config.navigation} name={config.author.name} />
        <div id="content" tabIndex={-1}>{children}</div>
      </body>
    </html>
  );
}
