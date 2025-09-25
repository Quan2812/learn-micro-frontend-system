# Shared Library

Angular shared library cho hệ thống Micro Frontend.

## Cài đặt

\`\`\`bash
npm install
npm run build
\`\`\`

## Sử dụng Styles

Để sử dụng shared styles trong các micro frontend:

### 1. Import trực tiếp trong component:
\`\`\`scss
@import '~shared-lib/src/styles/variables';
@import '~shared-lib/src/styles/mixins';
\`\`\`

### 2. Import trong styles.scss của từng app:
\`\`\`scss
@import '~shared-lib/src/styles/index';
\`\`\`

### 3. Sử dụng CSS variables (khuyến nghị):
\`\`\`scss
.my-component {
  color: var(--primary-color);
  padding: var(--spacing-md);
}
\`\`\`

## Exports

Library export các modules sau:
- Services: EventBus, Storage, HttpClient, Auth, Communication, Notification
- Models: User, Campaign, Template, Common
- Utils: Date, Validation, Format
- Constants: API, App
- Guards: Auth
- Types: Common types
