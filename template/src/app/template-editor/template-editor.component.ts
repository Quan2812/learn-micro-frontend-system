import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TemplateVar = { key: string; sample?: string };

@Component({
  selector: 'app-template-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="template-editor-container">
      <div class="header">
        <h1>Template Editor</h1>
      </div>

      <div class="editor-grid">
        <!-- Left: Editor -->
        <div class="editor-panel">
          <div class="form-group">
            <label for="tpl-content">Content *</label>
            <textarea
              id="tpl-content"
              class="form-control"
              rows="14"
              [(ngModel)]="templateContent"
              (input)="updatePreview()"
              #contentArea
              [attr.placeholder]="'Ví dụ: Xin chào {{firstName}}, đơn hàng {{orderCode}} của bạn...'"
            >
            </textarea>
          </div>

          <div class="actions">
            <button class="btn btn-primary" (click)="save()">Save</button>
            <button class="btn btn-outline" (click)="reset()">Reset</button>
          </div>
        </div>

        <!-- Right: Variables -->
        <div class="vars-panel">
          <div class="vars-header">
            <h3>Placeholders</h3>
          </div>

          <div class="add-var">
            <div class="row">
              <div class="col">
                <label for="var-name">Variable name</label>
                <input
                  id="var-name"
                  type="text"
                  class="form-control"
                  [(ngModel)]="variableName"
                  placeholder="e.g. firstName"
                />
              </div>
              <div class="col">
                <label for="var-sample">Sample value</label>
                <input
                  id="var-sample"
                  type="text"
                  class="form-control"
                  [(ngModel)]="variableSample"
                  placeholder="e.g. John"
                />
              </div>
            </div>

            <div class="row btn-row">
              <button class="btn btn-outline" (click)="addVariable()">+ Add</button>
              <button class="btn" (click)="insertPlaceholderAtCursor(contentArea)">
                Insert {{ '{{' }}{{ variableName || 'variable' }}{{ '}}' }}
              </button>
            </div>
          </div>

          <div class="vars-list" *ngIf="variables.length > 0">
            <div class="var-item" *ngFor="let v of variables; let i = index; trackBy: trackByIndex">
              <div class="var-pill">
                <code>{{ '{{' + v.key + '}}' }}</code>
              </div>
              <input
                type="text"
                class="form-control sample-input"
                [(ngModel)]="variables[i].sample"
                (input)="updatePreview()"
                placeholder="Sample value"
              />
              <button class="btn btn-danger btn-sm" (click)="removeVariable(i)">Remove</button>
            </div>
          </div>

          <div class="vars-empty" *ngIf="variables.length === 0">
            <em>No placeholders yet. Add one above.</em>
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div class="preview-panel">
        <h3>Preview</h3>
        <div class="preview-box">
          <pre>{{ preview }}</pre>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./template-editor.component.scss'],
})
export class TemplateEditorComponent {
  // === State cho editor ===
  templateContent = '';
  preview = '';

  // === Fix lỗi: khai báo các property được dùng trong template ===
  variableName = '';
  variableSample = '';

  // Danh sách biến cho template
  variables: TemplateVar[] = [];

  // Thêm biến mới vào danh sách
  addVariable(): void {
    const key = (this.variableName || '').trim();
    if (!key) return;

    // Không thêm trùng key
    const exists = this.variables.some(v => v.key === key);
    if (!exists) {
      this.variables.push({ key, sample: this.variableSample || '' });
    } else {
      // nếu đã tồn tại, chỉ cập nhật sample
      const idx = this.variables.findIndex(v => v.key === key);
      this.variables[idx].sample = this.variableSample || this.variables[idx].sample;
    }

    // dọn input
    this.variableName = '';
    this.variableSample = '';

    this.updatePreview();
  }

  // Xoá biến khỏi danh sách
  removeVariable(index: number): void {
    this.variables.splice(index, 1);
    this.updatePreview();
  }

  // Chèn {{variableName}} tại vị trí con trỏ trong textarea
  insertPlaceholderAtCursor(textarea: HTMLTextAreaElement): void {
    const key = (this.variableName || '').trim();
    const placeholder = key ? `{{${key}}}` : '{{variable}}';

    const start = textarea.selectionStart ?? this.templateContent.length;
    const end = textarea.selectionEnd ?? this.templateContent.length;

    this.templateContent =
      this.templateContent.slice(0, start) + placeholder + this.templateContent.slice(end);

    // Đưa con trỏ về sau placeholder
    setTimeout(() => {
      textarea.focus();
      const caret = start + placeholder.length;
      textarea.setSelectionRange(caret, caret);
    });

    this.updatePreview();
  }

  // Cập nhật preview bằng cách thay {{key}} -> sample
  updatePreview(): void {
    let out = this.templateContent || '';

    // Thay thế an toàn cho từng biến (không dùng RegExp toàn cục dễ đụng meta)
    for (const v of this.variables) {
      if (!v.key) continue;
      const needle = `{{${v.key}}}`;
      // thay tất cả occurrences
      out = out.split(needle).join(v.sample ?? '');
    }

    this.preview = out;
  }

  // Lưu (mock)
  save(): void {
    // TODO: call service API nếu cần
    // console.log('Saving template:', { content: this.templateContent, variables: this.variables });
    alert('Template saved (mock).');
  }

  // Reset
  reset(): void {
    this.templateContent = '';
    this.preview = '';
    this.variables = [];
    this.variableName = '';
    this.variableSample = '';
  }

  // trackBy
  trackByIndex(i: number): number {
    return i;
  }
}
