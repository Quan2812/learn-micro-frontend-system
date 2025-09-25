// Utility types
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Maybe<T> = T | null | undefined

// Generic API response type
export type ApiResult<T> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Event handler types
export type EventHandler<T = any> = (event: T) => void
export type AsyncEventHandler<T = any> = (event: T) => Promise<void>

// Form types
export type FormFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "time"
  | "datetime-local"
  | "file"

export type ValidationRule = {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: RegExp
  custom?: (value: any) => boolean | string
}

export type FormField = {
  name: string
  label: string
  type: FormFieldType
  placeholder?: string
  defaultValue?: any
  options?: Array<{ value: any; label: string }>
  validation?: ValidationRule
  disabled?: boolean
  readonly?: boolean
  hidden?: boolean
}

// Table/Grid types
export type SortDirection = "asc" | "desc"
export type SortConfig = {
  field: string
  direction: SortDirection
}

export type ColumnDefinition = {
  field: string
  header: string
  sortable?: boolean
  filterable?: boolean
  width?: string
  align?: "left" | "center" | "right"
  format?: (value: any) => string
  render?: (value: any, row: any) => string
}

// Theme types
export type ThemeMode = "light" | "dark" | "auto"
export type ColorScheme = "blue" | "green" | "purple" | "orange" | "red"

// Navigation types
export type NavigationItem = {
  id: string
  label: string
  icon?: string
  url?: string
  children?: NavigationItem[]
  permissions?: string[]
  badge?: string | number
  active?: boolean
  disabled?: boolean
}

// Modal/Dialog types
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full"
export type ModalType = "info" | "success" | "warning" | "error" | "confirm"

// Loading states
export type LoadingState = "idle" | "loading" | "success" | "error"

// Generic CRUD operations
export type CrudOperation = "create" | "read" | "update" | "delete"

// File types
export type FileType = "image" | "document" | "video" | "audio" | "archive" | "other"

export type UploadedFile = {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: Date
}

// Search and filter types
export type SearchOperator = "equals" | "contains" | "startsWith" | "endsWith" | "greaterThan" | "lessThan" | "between"

export type FilterCondition = {
  field: string
  operator: SearchOperator
  value: any
  values?: any[] // for 'between' operator
}

export type SearchCriteria = {
  query?: string
  filters?: FilterCondition[]
  sort?: SortConfig
  pagination?: {
    page: number
    limit: number
  }
}

// Component state types
export type ComponentState<T = any> = {
  data: T
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

// Permission types
export type Permission = string
export type Role = string

// Audit types
export type AuditAction = "create" | "update" | "delete" | "view" | "export" | "import"

export type AuditLog = {
  id: string
  userId: string
  action: AuditAction
  resource: string
  resourceId: string
  details?: Record<string, any>
  timestamp: Date
  ipAddress?: string
  userAgent?: string
}

// Generic key-value types
export type KeyValuePair<K = string, V = any> = {
  key: K
  value: V
}

export type Dictionary<T = any> = Record<string, T>

// Function types
export type Predicate<T> = (item: T) => boolean
export type Mapper<T, U> = (item: T) => U
export type Reducer<T, U> = (accumulator: U, current: T) => U

// Promise types
export type PromiseResolver<T> = (value: T | PromiseLike<T>) => void
export type PromiseRejecter = (reason?: any) => void

// Environment types
export type Environment = "development" | "staging" | "production"

// HTTP method types
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS"

// Generic ID types
export type ID = string | number
export type UUID = string

// Date range type
export type DateRange = {
  start: Date
  end: Date
}

// Coordinate types
export type Coordinates = {
  latitude: number
  longitude: number
}

// Address type
export type Address = {
  street?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  coordinates?: Coordinates
}

// Contact information type
export type ContactInfo = {
  email?: string
  phone?: string
  address?: Address
  website?: string
  socialMedia?: Record<string, string>
}
