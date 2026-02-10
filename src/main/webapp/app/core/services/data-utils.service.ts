import { Injectable } from '@angular/core';

/**
 * Data utils service for handling file operations
 */
@Injectable({ providedIn: 'root' })
export class DataUtilsService {
  /**
   * Get byte size of base64 string with human-readable format
   */
  byteSize(base64String: string): string {
    return this.formatAsBytes(this.size(base64String));
  }

  /**
   * Open file as binary
   */
  openFile(data: string, contentType: string | undefined): void {
    const blob = this.byteString64ToBlob(data, contentType);
    this.downloadFile(blob, contentType);
  }

  /**
   * Download file using blob
   */
  downloadFile(blob: Blob, fileName?: string, contentType?: string | null): void {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName ?? 'file';
    if (contentType) {
      link.type = contentType;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Convert base64 string to blob
   */
  byteString64ToBlob(byteString: string, contentType: string | null | undefined): Blob {
    contentType = contentType ?? '';
    const sliceSize = 512;
    const byteCharacters = atob(byteString);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: contentType });
  }

  /**
   * Abbreviate text to 30 characters with ellipsis
   */
  abbreviate(text: string | null | undefined): string {
    if (!text) {
      return '';
    }

    if (text.length < 30) {
      return text;
    }

    return text.substring(0, 27) + '...';
  }

  /**
   * Private helper: Format bytes as human-readable string with spaces
   */
  private formatAsBytes(bytes: number): string {
    return bytes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes';
  }

  /**
   * Private helper: Calculate size in bytes from base64 string
   */
  private size(base64String: string): number {
    return base64String.length * 0.75;
  }
}
