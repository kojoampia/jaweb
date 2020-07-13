import { trigger, state, style, animate, transition } from '@angular/animations';

export const animations = [
    trigger('animateNgIf', [
        transition(':enter', [
            style({ height: 0, padding: '0px', opacity: 0 }),
            animate('200ms', style({ height: '*', padding: '*', opacity: 1 }))
        ]),
        transition(':leave', [
            style({ height: '*', padding: '*', opacity: 1 }),
            animate('100ms', style({ height: 0, padding: '0px', opacity: 0 }))
        ])
    ]),
    trigger('animateNgFor', [
        transition(':enter', [
            style({ transform: 'scale(0)', opacity: 0 }),
            animate('300ms', style({ transform: 'scale(1)', opacity: 1 }))
        ]),
        transition(':leave', [style({ transform: 'scale(1)', opacity: 1 }), animate('300ms', style({ transform: 'scale(0)', opacity: 0 }))])
    ])
];
