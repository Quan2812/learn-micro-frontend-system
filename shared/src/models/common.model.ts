export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
  meta?: ResponseMeta
}

export interface ResponseMeta {
  page?: number
  limit?: number
  total?: number
  totalPages?: number
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
  search?: string
}

export interface FilterOptions {
  [key: string]: any
}

export interface SelectOption {
  value: any
  label: string
  disabled?: boolean
  group?: string
}

export interface BreadcrumbItem {
  label: string
  url?: string
  active?: boolean
}

export interface MenuItem {
  id: string
  label: string
  icon?: string
  url?: string
  children?: MenuItem[]
  permissions?: string[]
  badge?: string
  active?: boolean
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: Date
  read: boolean
  actionUrl?: string
  actionLabel?: string
}
