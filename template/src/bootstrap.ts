// src/bootstrap.ts
export async function bootstrapRemote() {
  const { bootstrapApplication } = await import('@angular/platform-browser');
  const { AppComponent } = await import('./app/app.component');

  // ⚠️ Nếu bạn có app-level providers/app.config.ts, chỉ dùng cho standalone dev.
  // Tránh app-level providers khi chạy dưới MF; hãy để providers ở cấp component/route.
  // const { appConfig } = await import('./app/app.config'); // nếu có

  await bootstrapApplication(AppComponent /*, appConfig*/);
}
