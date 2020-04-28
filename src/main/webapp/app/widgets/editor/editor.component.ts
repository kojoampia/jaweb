import { Component, AfterViewInit, EventEmitter, OnDestroy, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';

import * as tinymce from 'tinymce';

@Component({
    selector: 'jhi-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class TinyEditorComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() elementId = 'editor';
    @Input() tmHeight = 250;
    @Input() content: String;
    @Input() name = 'content';
    editor: any;
    @Input() baseUrl = '/content/tinymce/';
    @Output() onDataChanged = new EventEmitter<any>();
    @Output() onDataBlur = new EventEmitter<any>();
    @Output() onKeyup = new EventEmitter<any>();
    isLoading = false;
    @Input() config: tinymce.Settings;
    @Input() theme = 'modern';

    constructor(private cd: ChangeDetectorRef) {
        this.editor = null;
        this.init();
    }

    ngOnInit() {}

    ngAfterViewInit() {
      //  this.init();
    }

    ngOnDestroy() {
        // tinymce.remove(this.editor);
        delete this.editor;
    }

    init() {
        // tinymce.baseURL = this.baseUrl;
        this.config = {
            menubar: false,
            theme: this.theme,
            theme_url: this.theme + '/theme.min.js',
            base_url: this.baseUrl,
            document_base_url: '/content',
            skin_url: this.baseUrl + 'skins/lightgray',
            selector: 'textarea',
            plugins: ['link', 'paste', 'table', 'image', 'codesample', 'lists', 'imagetools', 'fullscreen', 'fullpage', 'preview'],
            min_height: this.tmHeight,
            toolbar: ['fontselect fontsizeselect bold italic | copy cut paste | numlist bullist | link table image | codesample source'],
            fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
            style_formats: [
                {
                    title: 'Image Left',
                    selector: 'img',
                    styles: {
                        float: 'left',
                        margin: '0 10px 0 10px'
                    }
                },
                {
                    title: 'Image Right',
                    selector: 'img',
                    styles: {
                        float: 'right',
                        margin: '0 0 10px 10px'
                    }
                }
            ],
            style_formats_merge: true,
            branding: false,
            file_picker_callback: (callback: any, value: any, meta: any) => this.fileUploadCallback(callback, meta),
            setup: (editor: any) => this.setup(editor)
        };
        console.log(this.config);
        console.log('tinymce.baseURL: ' + tinymce.baseURL);
        tinymce.init(this.config);
        console.log('tinymce.baseURL: ' + tinymce.baseURL);
        console.log('tinymce.baseURL.theme: ' + this.theme);
        if (this.editor !== null && typeof this.editor !== 'undefined') {
            const content = this.content == null ? '' : this.content;
            if (this.editor.initialized) {
                this.editor.setContent(content);
            }
        }
    }

    private fileUploadCallback(callback: (arg0: string | ArrayBuffer, arg1: { title: string }) => void, meta: { filetype: string }) {
        if (meta.filetype === 'image') {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.onchange = event => {
                new Promise((resolve, reject) => {
                    this.isLoading = true;
                    this.cd.detectChanges();

                    const target: any = event.target;
                    const file: File = target.files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                        callback(reader.result, {
                            title: file.name
                        });
                        resolve(file);
                    };

                    reader.onerror = () => {
                        return reject();
                    };

                    reader.readAsDataURL(file);
                }).then(() => {
                    this.isLoading = false;
                    this.cd.detectChanges();
                });
            };

            input.click();
        }
    }

    private setup(editor: { on: (arg0: string, arg1: { (): void; (): void; (): void }) => void; getContent: () => String }) {
        this.editor = editor;
        editor.on('blur', () => {
            this.content = editor.getContent();
            this.onDataBlur.emit(this.content);
        });
        editor.on('keyup', () => {
            this.content = editor.getContent();
            this.onKeyup.emit(this.content);
        });
        editor.on('change', () => {
            this.content = editor.getContent();
            this.onDataChanged.emit(this.content);
        });
    }
}
