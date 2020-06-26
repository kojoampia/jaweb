import { Component, EventEmitter, OnDestroy, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class TinyEditorComponent implements OnInit, OnDestroy {
    @Input() elementId = 'jac-editor';
    @Input() tmHeight = 250;
    @Input() name = 'content';
    @Input() theme = 'silver';
    editor: any;
    //   baseUrl = 'tinymce/';
    @Output() onDataChanged = new EventEmitter<any>();
    @Output() onDataBlur = new EventEmitter<any>();
    @Output() onKeyup = new EventEmitter<any>();
    isLoading = false;
    @Input() content: string;
    @Input() config: any;

    constructor(private cd: ChangeDetectorRef) {
        console.log('constructing editor...');
        this.editor = null;
        this.config = {
            //           base_url: this.baseUrl,
            //           baseUrl: this.baseUrl,
            height: 250,
            theme: 'modern',
            // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
            plugins:
                'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern',
            toolbar:
                'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
            image_advtab: true,
            imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
            templates: [{ title: 'Test template 1', content: 'Test 1' }, { title: 'Test template 2', content: 'Test 2' }],
            content_css: ['//fonts.googleapis.com/css?family=Lato:300,300i,400,400i', '//www.tinymce.com/css/codepen.min.css'],
            style_formats_merge: true,
            branding: false,
            file_picker_callback: (callback: any, value: any, meta: any) => this.fileUploadCallback(callback, meta),
            setup: (editor: any) => this.setup(editor),
            init_instance_callback: (editor: any) => {
                console.log('Editor: ' + editor.id + ' is now initialized.');
            }
        };
    }

    ngOnInit() {
        console.log('initing editor...');
        console.log(this.config);
        // this.configureEditor();

        if (!this.content) {
            this.content = 'test content';
        }
    }

    onReady(event: any) {
        console.log('tinymce ready.');
        console.log(event);
    }

    ngOnDestroy() {
        // tinymce.remove(this.editor);
        delete this.editor;
    }

    configureEditor() {
        const selectorId = '#' + this.elementId;
        console.log('selectorID: ' + selectorId);
        const themeSource = 'themes/' + this.theme;
        //        const themeUrl = this.baseUrl + themeSource + '/theme.js';
        const themeUrl = themeSource + '/theme.js';
        console.log('themeURL: ' + themeUrl);
        this.config = {
            height: 400,
            menubar: false,
            //            theme: this.theme,
            //            theme_url: themeUrl,
            //            base_url: this.baseUrl,
            //            document_base_url: this.baseUrl,
            //            skin_url: this.baseUrl + 'skins/lightgray',
            selector: selectorId,
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
            setup: (editor: any) => this.setup(editor),
            // tslint:disable-next-line: object-literal-shorthand
            init_instance_callback: (editor: any) => {
                console.log('Editor: ' + editor.id + ' is now initialized.');
            }
        };
        console.log('this.config');
        console.log(this.config);
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

    private setup(editor: { on: (arg0: string, arg1: { (): void; (): void; (): void }) => void; getContent: () => string }) {
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
