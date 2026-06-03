import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Observer } from 'rxjs';

export interface FileLoadError {
  message: string;
  key: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataUtils {
  constructor(private sanitizer: DomSanitizer) {}

  byteSize(field: string): string {
    return this.formatAsBytes(field.length);
  }

  openFile(data: string, contentType: string | null | undefined): void {
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType ?? '' });
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
  }

  // load file
  loadFileToForm(event: Event, form: any, field: string, isImage: boolean): Observable<FileLoadError | null> {
    return new Observable((observer: Observer<FileLoadError | null>) => {
      if (event.target instanceof HTMLInputElement) {
        if (event.target.files?.[0]) {
          const file = event.target.files[0];
          if (isImage && !file.type.startsWith('image/')) {
            observer.error(new Error('File is not an image!'));
            return;
          }
          const title = file.name;
          const fileSize = file.size;
          const readFile = new FileReader();
          readFile.onload = loadEvent => {
            const base64Data = (loadEvent.target as FileReader).result as string;
            form.patchValue({
              [field]: base64Data.split(',')[1],
              [field + 'ContentType']: file.type,
              [field + 'Title']: title,
              [field + 'Size']: fileSize,
            });
            observer.next(null);
            observer.complete();
          };
          readFile.onerror = () => {
            observer.error(new Error('Could not read the file'));
          };
          readFile.readAsDataURL(file);
        } else {
          observer.next(null);
          observer.complete();
        }
      } else {
        observer.next(null);
        observer.complete();
      }
    });
  }

  private formatAsBytes(size: number): string {
    return size < 1024
      ? size + ' o'
      : size < 1024 * 1024
        ? Math.round(size / 1024) + ' Ko'
        : Math.round(size / (1024 * 1024)) + ' Mo';
  }
}
