import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, of } from "rxjs"
import type { Template, TemplatePreview } from "../models/template.model"

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  private templatesSubject = new BehaviorSubject<Template[]>(this.getMockTemplates())
  public templates$ = this.templatesSubject.asObservable()

  constructor() {}

  getTemplates(): Observable<Template[]> {
    return this.templates$
  }

  getTemplateById(id: string): Observable<Template | undefined> {
    const templates = this.templatesSubject.value
    const template = templates.find((t) => t.id === id)
    return of(template)
  }

  createTemplate(template: Omit<Template, "id" | "createdAt" | "updatedAt" | "usageCount">): Observable<Template> {
    const newTemplate: Template = {
      ...template,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0,
    }

    const currentTemplates = this.templatesSubject.value
    this.templatesSubject.next([...currentTemplates, newTemplate])

    return of(newTemplate)
  }

  updateTemplate(id: string, updates: Partial<Template>): Observable<Template | null> {
    const templates = this.templatesSubject.value
    const index = templates.findIndex((t) => t.id === id)

    if (index === -1) {
      return of(null)
    }

    const updatedTemplate = {
      ...templates[index],
      ...updates,
      updatedAt: new Date(),
    }

    templates[index] = updatedTemplate
    this.templatesSubject.next([...templates])

    return of(updatedTemplate)
  }

  deleteTemplate(id: string): Observable<boolean> {
    const templates = this.templatesSubject.value
    const filteredTemplates = templates.filter((t) => t.id !== id)
    this.templatesSubject.next(filteredTemplates)
    return of(true)
  }

  previewTemplate(template: Template, variables: Record<string, any>): Observable<TemplatePreview> {
    let content = template.content

    // Replace variables in content
    template.variables.forEach((variable) => {
      const value = variables[variable.name] || variable.defaultValue || ""
      const regex = new RegExp(`{{\\s*${variable.name}\\s*}}`, "g")
      content = content.replace(regex, value.toString())
    })

    const preview: TemplatePreview = {
      content,
      variables,
    }

    return of(preview)
  }

  getTemplatesByCategory(category: string): Observable<Template[]> {
    const templates = this.templatesSubject.value
    const filtered = templates.filter((t) => t.category === category)
    return of(filtered)
  }

  private getMockTemplates(): Template[] {
    return [
      {
        id: "1",
        name: "Welcome Email",
        description: "Welcome new users to the platform",
        category: "email",
        content: `
          <h1>Welcome {{firstName}}!</h1>
          <p>Thank you for joining {{companyName}}. We're excited to have you on board.</p>
          <p>Your account has been created successfully. You can now access all our features.</p>
          <a href="{{loginUrl}}" style="background: #1976d2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
            Get Started
          </a>
        `,
        variables: [
          { name: "firstName", type: "text", required: true, description: "User's first name" },
          { name: "companyName", type: "text", required: true, defaultValue: "Our Company" },
          { name: "loginUrl", type: "text", required: true, description: "Login page URL" },
        ],
        status: "active",
        tags: ["welcome", "onboarding", "email"],
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2025-01-15"),
        usageCount: 245,
      },
      {
        id: "2",
        name: "Password Reset SMS",
        description: "SMS template for password reset requests",
        category: "sms",
        content:
          "Hi {{firstName}}, your password reset code is: {{resetCode}}. This code expires in {{expiryMinutes}} minutes.",
        variables: [
          { name: "firstName", type: "text", required: true },
          { name: "resetCode", type: "text", required: true, description: "6-digit reset code" },
          { name: "expiryMinutes", type: "number", required: true, defaultValue: "15" },
        ],
        status: "active",
        tags: ["password", "security", "sms"],
        createdAt: new Date("2025-01-05"),
        updatedAt: new Date("2025-01-10"),
        usageCount: 89,
      },
      {
        id: "3",
        name: "Campaign Notification",
        description: "Push notification for new campaigns",
        category: "push",
        content: "🎉 New {{campaignType}} campaign is live! {{campaignName}} - Don't miss out!",
        variables: [
          { name: "campaignType", type: "text", required: true, description: "Type of campaign" },
          { name: "campaignName", type: "text", required: true, description: "Campaign name" },
        ],
        status: "draft",
        tags: ["campaign", "notification", "push"],
        createdAt: new Date("2025-01-10"),
        updatedAt: new Date("2025-01-12"),
        usageCount: 0,
      },
      {
        id: "4",
        name: "Newsletter Template",
        description: "Monthly newsletter template",
        category: "email",
        content: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h1 style="color: #1976d2;">{{newsletterTitle}}</h1>
            <p>Hello {{subscriberName}},</p>
            <p>Here's what's new this {{period}}:</p>
            <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
              {{content}}
            </div>
            <p>Best regards,<br>{{senderName}}</p>
          </div>
        `,
        variables: [
          { name: "newsletterTitle", type: "text", required: true },
          { name: "subscriberName", type: "text", required: true },
          { name: "period", type: "text", required: true, defaultValue: "month" },
          { name: "content", type: "text", required: true, description: "Newsletter content" },
          { name: "senderName", type: "text", required: true },
        ],
        status: "active",
        tags: ["newsletter", "email", "monthly"],
        createdAt: new Date("2024-12-15"),
        updatedAt: new Date("2025-01-08"),
        usageCount: 156,
      },
    ]
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}
