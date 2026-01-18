import type { Metadata } from "next";
import { Crimson_Pro, Geist, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import { OpenPanelComponent } from "@openpanel/nextjs";
import "./globals.css";
import Script from "next/script";

// Crimson Pro for elegant headings
const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
});

// Geist for friendly body text
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

// Space Mono for code blocks
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

// BBH Sans Bartle for header (local font)
const bbhSans = localFont({
  src: "../public/BBH_Sans_Bartle/BBHSansBartle-Regular.ttf",
  variable: "--font-bbh-sans",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Claude Code 插件市场 | AI 工具与扩展",
  description:
    "探索 Claude Code 插件市场，发现高质量的 AI 开发工具、效率扩展与集成方案，快速找到适合你的插件与工作流。",
  keywords: [
    "Claude Code marketplace",
    "Claude plugin marketplace",
    "Claude Code plugins",
    "Claude marketplaces",
    "Anthropic plugin marketplace",
    "Claude AI tools",
    "Claude development tools",
    "Claude Code extensions",
    "plugin marketplaces for claude code",
    "Claude Code 插件市场",
    "Claude Code 插件",
    "AI 开发工具",
    "Agent 工具",
  ],
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  other: {
    "llms-txt": "/llms.txt",
    "llms-full-txt": "/llms-full.txt",
  },
  openGraph: {
    title: "Claude Code 插件市场 | AI 工具与扩展",
    description:
      "探索 Claude Code 插件市场，发现高质量的 AI 开发工具、效率扩展与集成方案。",
    url: "https://claudemarketplaces.com",
    siteName: "Claude Code Plugin Marketplace",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "https://claudemarketplaces.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Claude Code Plugin Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code 插件市场 | AI 工具",
    description:
      "发现 Claude AI 的插件、扩展与开发工具，快速浏览与筛选，提升你的开发效率。",
    images: ["https://claudemarketplaces.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${crimsonPro.variable} ${geist.variable} ${spaceMono.variable} ${bbhSans.variable} antialiased`}
      >
                {children}
        <OpenPanelComponent
          clientId={process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID!}
          trackScreenViews={true}
          trackOutgoingLinks={true}
        />
      
      {/* WUUNU SNIPPET - DON'T CHANGE THIS (START) */}
      {process.env.NODE_ENV !== "production" && (
        <>
          <Script id="wuunu-ws" strategy="afterInteractive">
            { `window.__WUUNU_WS__ = "http://127.0.0.1:51414/?token=00d31b4f76e3e558f349116515e961b1f3d2e45f226b6fe0";` }
          </Script>
          <Script
            id="wuunu-widget"
            src="https://cdn.jsdelivr.net/npm/@wuunu/widget@0.1.21"
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        </>
      )}
      {/* WUUNU SNIPPET - DON'T CHANGE THIS (END) */}
</body>
    </html>
  );
}
