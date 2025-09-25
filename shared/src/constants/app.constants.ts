export const APP_CONSTANTS = {
  // Application info
  APP_NAME: "Micro Frontend System",
  APP_VERSION: "1.0.0",

  // API Configuration
  API_BASE_URL: "https://api.example.com",
  API_VERSION: "v1",
  API_TIMEOUT: 30000,

  // Storage keys
  STORAGE_KEYS: {
    AUTH_TOKEN: "auth_token",
    USER_PREFERENCES: "user_preferences",
    THEME: "theme",
    LANGUAGE: "language",
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Date formats
  DATE_FORMATS: {
    SHORT: "MM/dd/yyyy",
    LONG: "MMMM d, yyyy",
    WITH_TIME: "MM/dd/yyyy HH:mm",
    ISO: "yyyy-MM-ddTHH:mm:ss.SSSZ",
  },

  // Validation rules
  VALIDATION: {
    PASSWORD_MIN_LENGTH: 8,
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 50,
    EMAIL_MAX_LENGTH: 254,
    PHONE_MIN_LENGTH: 10,
    PHONE_MAX_LENGTH: 15,
  },

  // File upload
  FILE_UPLOAD: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ["image/jpeg", "image/png", "image/gif", "application/pdf"],
    ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".gif", ".pdf"],
  },

  // Notification settings
  NOTIFICATIONS: {
    DEFAULT_DURATION: 5000,
    SUCCESS_DURATION: 3000,
    ERROR_DURATION: 8000,
    MAX_NOTIFICATIONS: 10,
  },

  // Theme colors
  COLORS: {
    PRIMARY: "#1976d2",
    SECONDARY: "#dc004e",
    SUCCESS: "#2e7d32",
    WARNING: "#f57c00",
    ERROR: "#d32f2f",
    INFO: "#1976d2",
  },

  // Breakpoints
  BREAKPOINTS: {
    XS: 0,
    SM: 600,
    MD: 960,
    LG: 1280,
    XL: 1920,
  },

  // HTTP status codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  },

  // Regular expressions
  REGEX: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^[+]?[1-9][\d]{0,15}$/,
    URL: /^https?:\/\/.+/,
    STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
    NUMERIC: /^\d+$/,
  },

  // Message types for inter-MFE communication
  MESSAGE_TYPES: {
    USER_ACTION: "USER_ACTION",
    NAVIGATION: "NAVIGATION",
    DATA_CHANGE: "DATA_CHANGE",
    ERROR: "ERROR",
    GLOBAL_STATE_CHANGED: "GLOBAL_STATE_CHANGED",
    THEME_CHANGED: "THEME_CHANGED",
    LANGUAGE_CHANGED: "LANGUAGE_CHANGED",
  },

  // Micro frontend names
  MFE_NAMES: {
    SHELL: "shell",
    CAMPAIGN: "campaign",
    TEMPLATE: "template",
  },

  // Routes
  ROUTES: {
    HOME: "/",
    LOGIN: "/login",
    LOGOUT: "/logout",
    PROFILE: "/profile",
    SETTINGS: "/settings",
    UNAUTHORIZED: "/unauthorized",
    NOT_FOUND: "/404",
  },
} as const

// Export individual constants for convenience
export const {
  APP_NAME,
  APP_VERSION,
  STORAGE_KEYS,
  PAGINATION,
  DATE_FORMATS,
  VALIDATION,
  COLORS,
  MESSAGE_TYPES,
  MFE_NAMES,
} = APP_CONSTANTS
