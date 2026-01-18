import { Suspense } from "react";
import Link from "next/link";
import Script from "next/script";
import { getAllMarketplaces, getTaxonomyCategories } from "@/lib/data/marketplaces";
import { MarketplaceContent } from "@/components/marketplace-content";

function HomeHero({ marketplaceCount }: { marketplaceCount: number }) {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-lg sm:text-4xl md:text-5xl font-[family-name:var(--font-bbh-sans)] font-normal text-primary tracking-wide pt-10">
          连接全世界 {marketplaceCount} 个 Marketplace
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-lg text-muted-foreground">
            为你的Claude Code 插上翅膀
          </p>
          <Link
            href="https://github.com/anthropics/claude-code"
            className="text-sm text-primary hover:underline whitespace-nowrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            使用说明
          </Link>
        </div>
      </div>
    </div>
  );
}

async function MarketplaceData() {
  const [marketplaces, taxonomyCategories] = await Promise.all([
    getAllMarketplaces({ includeEmpty: false }),
    getTaxonomyCategories(),
  ]);

  return (
    <>
      <HomeHero marketplaceCount={marketplaces.length} />
      <MarketplaceContent
        marketplaces={marketplaces}
        taxonomyCategories={taxonomyCategories}
      />
    </>
  );
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Claude Code 插件市场",
        url: "https://claudemarketplaces.com",
        description:
          "探索 Claude Code 插件市场，发现适用于 Claude AI 的 AI 开发工具、扩展与集成方案。",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://claudemarketplaces.com/?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "Claude Code 插件市场",
        description:
          "用于发现 Claude Code 插件、扩展与开发工具的聚合入口",
        url: "https://claudemarketplaces.com",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "什么是 Claude Code 插件市场？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Claude Code 插件市场是一个聚合目录，用于发现、浏览与使用 AI 插件和扩展，帮助提升 Claude 在代码与开发场景中的效率。内容来源包含官方与社区等多个渠道。",
            },
          },
          {
            "@type": "Question",
            name: "在哪里可以找到 Claude Code 的插件市场？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "你可以在 claudemarketplaces.com 查看 Claude Code 插件市场聚合信息，内容来自 GitHub、Anthropic 官方信息以及社区维护的市场。支持按分类浏览与关键词搜索。",
            },
          },
          {
            "@type": "Question",
            name: "如何安装 Claude Code 插件？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "你可以通过官方市场安装，或按照每个插件提供的安装说明进行安装与集成。多数插件都支持与 Claude 的开发环境快速对接。",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Script
        id="schema-org"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(structuredData)}
      </Script>

      <main className="flex-1">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-8">
              <div className="animate-pulse space-y-6">
                <div className="h-9 bg-muted rounded-md" />
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-7 w-20 bg-muted rounded-md" />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-muted rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <MarketplaceData />
        </Suspense>
      </main>
    </div>
  );
}
