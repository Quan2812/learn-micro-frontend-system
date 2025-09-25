export const API_ENDPOINTS = {
  BASE_URL: "http://localhost:3000/api",

  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },

  // Campaign endpoints
  CAMPAIGNS: {
    BASE: "/campaigns",
    BY_ID: (id: string) => `/campaigns/${id}`,
    METRICS: (id: string) => `/campaigns/${id}/metrics`,
    DUPLICATE: (id: string) => `/campaigns/${id}/duplicate`,
  },

  // Template endpoints
  TEMPLATES: {
    BASE: "/templates",
    BY_ID: (id: string) => `/templates/${id}`,
    BY_CATEGORY: (category: string) => `/templates/category/${category}`,
    PREVIEW: (id: string) => `/templates/${id}/preview`,
    CLONE: (id: string) => `/templates/${id}/clone`,
  },

  // User endpoints
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
    PREFERENCES: (id: string) => `/users/${id}/preferences`,
  },

  // File upload endpoints
  UPLOAD: {
    IMAGE: "/upload/image",
    DOCUMENT: "/upload/document",
    BULK: "/upload/bulk",
  },
} as const

export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const
