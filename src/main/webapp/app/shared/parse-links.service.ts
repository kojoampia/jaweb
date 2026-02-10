import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ParseLinks {
  constructor() {}

  parse(header: string): any {
    if (!header || header.length === 0) {
      return {};
    }

    const links: any = {};
    // Split parts by comma
    const parts: string[] = header.split(',');
    // Parse each part into a link
    parts.forEach(p => {
      const section: string[] = p.split(';');
      if (section.length < 2) {
        throw new Error('section could not be split by ";"');
      }
      const url: string = section[0].replace(/<(.*)>/, '$1').trim();
      const queryString: { [key: string]: any } = {};
      url.replace(/([^?=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => (queryString[$1] = $3));
      let page: number = parseInt(queryString.page, 10);
      if (isNaN(page)) {
        page = 0;
      }
      const name: string = section[1].replace(/rel=\"(.*)\"/, '$1').trim();
      links[name] = page;
    });
    return links;
  }
}
