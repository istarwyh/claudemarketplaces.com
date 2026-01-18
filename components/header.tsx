import Link from "next/link";

// External links for code reuse
const CLAUDE_CODE_DOCS_URL = "https://github.com/anthropics/claude-code";

interface HeaderProps {
  subtitle?: string;
  showDocsLink?: boolean;
}

export function Header({
  subtitle = "为你的 Claude Code 插上翅膀",
  showDocsLink = true,
}: HeaderProps) {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="group">
            <h1 className="text-base sm:text-lg font-[family-name:var(--font-bbh-sans)] font-normal text-primary tracking-wide transition-opacity hover:opacity-80">
              Claude Code Marketplaces
            </h1>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
            {showDocsLink && (
              <Link
                href={CLAUDE_CODE_DOCS_URL}
                className="text-sm text-primary hover:underline whitespace-nowrap"
                target="_blank"
                rel="noopener noreferrer"
              >
                使用说明
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
