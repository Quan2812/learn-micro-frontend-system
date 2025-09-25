export interface Template {
  id: string
  name: string
  description: string
  category: "email" | "sms" | "push" | "web"
  content: string
  variables: TemplateVariable[]
  status: "draft" | "active" | "archived"
  tags: string[]
  createdAt: Date
  updatedAt: Date
  usageCount: number
}

export interface TemplateVariable {
  name: string
  type: "text" | "number" | "date" | "boolean"
  defaultValue?: string
  required: boolean
  description?: string
}

export interface TemplatePreview {
  content: string
  variables: Record<string, any>
}
