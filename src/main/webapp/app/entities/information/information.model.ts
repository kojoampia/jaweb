export interface IInformation {
  id: string;
  content?: string | null;
  title?: string | null;
  brief?: string | null;
  linkText?: string | null;
  link?: string | null;
  url?: string | null;
  document?: string | null;
  documentContentType?: string | null;
}

export type NewInformation = Omit<IInformation, 'id'> & { id: null };
