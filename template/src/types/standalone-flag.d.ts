// template/src/types/standalone-flag.d.ts
export {}; // giữ file là module để TS chấp nhận augmentations

declare global {
  interface Window {
    __STANDALONE_REMOTE__?: boolean;
  }
}
