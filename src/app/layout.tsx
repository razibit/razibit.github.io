import type { Metadata } from "next";
import "./globals.css";
import { getSiteConfig } from "@/lib/content";
import HeaderNavigation from "@/components/work/HeaderNavigation";

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
      <body>
        <a className="skip-link" href="#content">Skip to content</a>
        <HeaderNavigation items={config.navigation} name={config.author.name} />
        <div id="content" tabIndex={-1}>{children}</div>
      </body>
    </html>
  );
}
