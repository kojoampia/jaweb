import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ParseLinksService {
  /**
   * Parse HTTP Link header into an object with rel values as keys and page numbers as values
   * Supports both modern and legacy naming conventions
   */
  parseLinks(input: string | null): { [key: string]: number } {
    const links: { [key: string]: number } = {};

    if (input == null) {
      return links;
    }

    // link format: '<http://example.com?page=0>; rel="prev",<http://example.com?page=2>; rel="next"'
    const parts: string[] = input.split(',');
    parts.forEach((part: string) => {
      const section: string[] = part.split(';');
      if (section.length === 2) {
        const url: string = section[0].replace(/<(.*)>/, '$1').trim();
        const queryString: string = url.substring(url.indexOf('?') + 1);
        const params = new URLSearchParams(queryString);
        const page = params.get('page');
        if (page !== null) {
          const rel: string = section[1].replace(/rel="(.*)"/, '$1').trim();
          links[rel] = parseInt(page, 10);
        }
      }
    });

    return links;
  }

  /**
   * Alias for parseLinks - for backward compatibility
   */
  parse(header: string | null): { [key: string]: number } {
    return this.parseLinks(header);
  }

  /**
   * Alias for parseLinks - for backward compatibility
   */
  parseAll(header: string | null): { [key: string]: number } {
    return this.parseLinks(header);
  }
}

/** @deprecated Use ParseLinksService instead */
export { ParseLinksService as ParseLinks };
