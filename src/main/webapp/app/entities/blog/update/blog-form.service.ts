import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IBlog, NewBlog } from '../blog.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBlog for edit and NewBlogFormGroupInput for create.
 */
type BlogFormGroupInput = IBlog | PartialWithRequiredKeyOf<NewBlog>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IBlog | NewBlog> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

type BlogFormRawValue = FormValueOf<IBlog>;

type NewBlogFormRawValue = FormValueOf<NewBlog>;

type BlogFormDefaults = Pick<NewBlog, 'id' | 'createdDate' | 'modifiedDate'>;

type BlogFormGroupContent = {
  id: FormControl<BlogFormRawValue['id'] | NewBlog['id']>;
  title: FormControl<BlogFormRawValue['title']>;
  content: FormControl<BlogFormRawValue['content']>;
  createdDate: FormControl<BlogFormRawValue['createdDate']>;
  modifiedDate: FormControl<BlogFormRawValue['modifiedDate']>;
  lastModifiedBy: FormControl<BlogFormRawValue['lastModifiedBy']>;
  url: FormControl<BlogFormRawValue['url']>;
  document: FormControl<BlogFormRawValue['document']>;
  documentContentType: FormControl<BlogFormRawValue['documentContentType']>;
};

export type BlogFormGroup = FormGroup<BlogFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BlogFormService {
  createBlogFormGroup(blog: BlogFormGroupInput = { id: null }): BlogFormGroup {
    const blogRawValue = this.convertBlogToBlogRawValue({
      ...this.getFormDefaults(),
      ...blog,
    });
    return new FormGroup<BlogFormGroupContent>({
      id: new FormControl(
        { value: blogRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(blogRawValue.title),
      content: new FormControl(blogRawValue.content),
      createdDate: new FormControl(blogRawValue.createdDate),
      modifiedDate: new FormControl(blogRawValue.modifiedDate),
      lastModifiedBy: new FormControl(blogRawValue.lastModifiedBy),
      url: new FormControl(blogRawValue.url),
      document: new FormControl(blogRawValue.document),
      documentContentType: new FormControl(blogRawValue.documentContentType),
    });
  }

  getBlog(form: BlogFormGroup): IBlog | NewBlog {
    return this.convertBlogRawValueToBlog(form.getRawValue() as BlogFormRawValue | NewBlogFormRawValue);
  }

  resetForm(form: BlogFormGroup, blog: BlogFormGroupInput): void {
    const blogRawValue = this.convertBlogToBlogRawValue({ ...this.getFormDefaults(), ...blog });
    form.reset(
      {
        ...blogRawValue,
        id: { value: blogRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): BlogFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      modifiedDate: currentTime,
    };
  }

  private convertBlogRawValueToBlog(rawBlog: BlogFormRawValue | NewBlogFormRawValue): IBlog | NewBlog {
    return {
      ...rawBlog,
      createdDate: dayjs(rawBlog.createdDate, DATE_TIME_FORMAT),
      modifiedDate: dayjs(rawBlog.modifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertBlogToBlogRawValue(
    blog: IBlog | (Partial<NewBlog> & BlogFormDefaults),
  ): BlogFormRawValue | PartialWithRequiredKeyOf<NewBlogFormRawValue> {
    return {
      ...blog,
      createdDate: blog.createdDate ? blog.createdDate.format(DATE_TIME_FORMAT) : undefined,
      modifiedDate: blog.modifiedDate ? blog.modifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
