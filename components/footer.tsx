export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center mb-4 bg-background">
          <iframe
            src="https://mertbuilds.substack.com/embed"
            width="480"
            height="320"
            style={{
              border: "none",
              background: "transparent",
            }}
          ></iframe>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Claude Code Marketplaces</h3>
            <p className="text-sm text-muted-foreground">
              Discover Claude Code plugins, extensions, and tools. Automatically
              updated directory of Anthropic Claude AI marketplaces with
              development tools, productivity plugins, and integrations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
 }
