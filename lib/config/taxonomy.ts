/**
 * 统一分类体系（一级类目）
 * 用于 UI 筛选与展示，原始 raw categories 通过映射表关联
 */
export type TaxonomyCategory =
  | "dev-efficiency"
  | "code-quality"
  | "devops-infra"
  | "data-analytics"
  | "security-compliance"
  | "docs-knowledge"
  | "product-management"
  | "design-frontend"
  | "integration-automation"
  | "ai-agent-tools"
  | "general";

export interface TaxonomyConfig {
  id: TaxonomyCategory;
  label: string;
  description: string;
}

export const TAXONOMY_CATEGORIES: TaxonomyConfig[] = [
  {
    id: "dev-efficiency",
    label: "开发与工程效率",
    description: "提升开发效率的工具与框架",
  },
  {
    id: "code-quality",
    label: "代码质量与测试",
    description: "代码检查、测试与质量保障",
  },
  {
    id: "devops-infra",
    label: "DevOps/基础设施",
    description: "CI/CD、部署、运维与基础设施管理",
  },
  {
    id: "data-analytics",
    label: "数据与分析",
    description: "数据处理、分析与可视化",
  },
  {
    id: "security-compliance",
    label: "安全与合规",
    description: "安全扫描、合规与权限管理",
  },
  {
    id: "docs-knowledge",
    label: "文档与知识管理",
    description: "文档生成、知识库与协作",
  },
  {
    id: "product-management",
    label: "产品/项目管理",
    description: "项目规划、任务管理与协作工具",
  },
  {
    id: "design-frontend",
    label: "设计/前端",
    description: "UI/UX 设计、前端组件与样式",
  },
  {
    id: "integration-automation",
    label: "集成与自动化",
    description: "系统集成、工作流自动化与脚本",
  },
  {
    id: "ai-agent-tools",
    label: "AI/Agent 工具",
    description: "AI 模型、Agent 与智能工具",
  },
  {
    id: "general",
    label: "通用",
    description: "通用工具与未分类项目",
  },
];

/**
 * 原始 raw categories -> taxonomy 映射表
 * 优先级：精确匹配 > 关键词匹配 > 兜底
 */
export const RAW_TO_TAXONOMY_MAP: Record<string, TaxonomyCategory> = {
  // 精确匹配（直接映射）
  "ai": "ai-agent-tools",
  "agents": "ai-agent-tools",
  "ai-ml": "ai-agent-tools",
  "security": "security-compliance",
  "testing": "code-quality",
  "code quality testing": "code-quality",
  "code-review": "code-quality",
  "quality": "code-quality",
  "devops": "devops-infra",
  "automation devops": "devops-infra",
  "infrastructure": "devops-infra",
  "operations": "devops-infra",
  "data": "data-analytics",
  "data analytics": "data-analytics",
  "data-analytics": "data-analytics",
  "database": "data-analytics",
  "analysis": "data-analytics",
  "documentation": "docs-knowledge",
  "docs": "docs-knowledge",
  "design": "design-frontend",
  "design ux": "design-frontend",
  "ui": "design-frontend",
  "ui-development": "design-frontend",
  "frontend": "design-frontend",
  "web development": "design-frontend",
  "integration": "integration-automation",
  "automation": "integration-automation",
  "workflows": "integration-automation",
  "workflow": "integration-automation",
  "workflow orchestration": "integration-automation",
  "tools": "dev-efficiency",
  "tooling": "dev-efficiency",
  "development-tools": "dev-efficiency",
  "development-utilities": "dev-efficiency",
  "developer-tools": "dev-efficiency",
  "utilities": "dev-efficiency",
  "productivity": "dev-efficiency",
  "project & product management": "product-management",
  "plan": "product-management",
  "agile": "product-management",
  "business": "product-management",
  "business sales": "product-management",
  "marketing": "product-management",
  "marketing growth": "product-management",
  "education": "docs-knowledge",
  "learning": "docs-knowledge",
  "content": "docs-knowledge",
  "communication": "docs-knowledge",
  "community": "general",
  "general": "general",
  "essentials": "general",
  "explore": "general",
  "game-development": "general",
  "gaming": "general",
  "finance": "general",
  "media": "general",
  "modernization": "general",
  "payments": "general",
  "personality": "general",
  "qol": "general",
  "refactoring": "code-quality",
  "version-control": "devops-infra",
  "git workflow": "devops-infra",
  "commands": "dev-efficiency",
  "hooks": "dev-efficiency",
  "customization": "dev-efficiency",
  "debugging": "dev-efficiency",
  "performance": "dev-efficiency",
  "api": "integration-automation",
  "architecture": "dev-efficiency",
  "assets": "design-frontend",
  "blockchain": "general",
  "btp": "general",
  "cap": "general",
  "document-conversion": "docs-knowledge",
  "languages": "dev-efficiency",
  "official claude code plugins": "ai-agent-tools",
  "super": "general",
  "accessibility": "design-frontend",
  "advanced": "general",
  "abap": "general",
  "hana": "general",
  "security, compliance, & legal": "security-compliance",
};

/**
 * 根据 raw categories 获取主要 taxonomy 类目
 * 规则：如果多个 raw categories 映射到不同 taxonomy，返回第一个匹配的
 */
export function getTaxonomyCategory(rawCategories: string[]): TaxonomyCategory {
  for (const raw of rawCategories) {
    const normalized = raw.toLowerCase().trim();
    if (RAW_TO_TAXONOMY_MAP[normalized]) {
      return RAW_TO_TAXONOMY_MAP[normalized];
    }
  }
  return "general";
}

/**
 * 获取 taxonomy 配置
 */
export function getTaxonomyConfig(id: TaxonomyCategory): TaxonomyConfig | undefined {
  return TAXONOMY_CATEGORIES.find(cat => cat.id === id);
}

/**
 * 根据 taxonomy 获取所有匹配的 raw categories（用于反向映射）
 */
export function getRawCategoriesByTaxonomy(taxonomyId: TaxonomyCategory): string[] {
  return Object.entries(RAW_TO_TAXONOMY_MAP)
    .filter(([_, mapped]) => mapped === taxonomyId)
    .map(([raw]) => raw);
}
