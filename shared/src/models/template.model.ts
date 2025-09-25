export interface Template {
  id: string
  name: string
  description: string
  category: TemplateCategory
  type: TemplateType
  content: TemplateContent
  thumbnail?: string
  tags: string[]
  isPublic: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
  usageCount: number
  rating?: number
}

export interface TemplateContent {
  html?: string
  css?: string
  javascript?: string
  json?: any
  variables?: TemplateVariable[]
}

export interface TemplateVariable {
  name: string
  type: VariableType
  defaultValue?: any
  required: boolean
  description?: string
  options?: string[] // For select/dropdown variables
}

export enum TemplateType {
  EMAIL = "email",
  LANDING_PAGE = "landing_page",
  BANNER = "banner",
  SOCIAL_POST = "social_post",
  NEWSLETTER = "newsletter",
  FORM = "form",
}

export enum TemplateCategory {
  MARKETING = "marketing",
  TRANSACTIONAL = "transactional",
  PROMOTIONAL = "promotional",
  EDUCATIONAL = "educational",
  SEASONAL = "seasonal",
  CUSTOM = "custom",
}

export enum VariableType {
  TEXT = "text",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "date",
  IMAGE = "image",
  COLOR = "color",
  SELECT = "select",
  TEXTAREA = "textarea",
}

export interface TemplateFilter {
  category?: TemplateCategory[]
  type?: TemplateType[]
  tags?: string[]
  isPublic?: boolean
  searchTerm?: string
  sortBy?: "name" | "createdAt" | "usageCount" | "rating"
  sortOrder?: "asc" | "desc"
}

export interface CreateTemplateRequest {
  name: string
  description: string
  category: TemplateCategory
  type: TemplateType
  content: TemplateContent
  tags: string[]
  isPublic: boolean
}

export interface UpdateTemplateRequest extends Partial<CreateTemplateRequest> {
  id: string
}

export interface TemplateUsage {
  templateId: string
  userId: string
  usedAt: Date
  context?: string
}
