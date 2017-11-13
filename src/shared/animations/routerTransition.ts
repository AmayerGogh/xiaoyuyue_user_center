import { animate, state, style, transition, trigger } from '@angular/core';

export function appModuleAnimation() {
    return slideFromBottom();
}

export function accountModuleAnimation() {
    return slideFromUp();
}

export function slideFromBottom() {
    return trigger('routerTransition', [
        state('void', style({ 'padding-top': '0px', opacity: '0' })),
        state('*', style({ 'padding-top': (window.__wxjs_environment === 'miniprogram') ? '0px;' : '20px', opacity: '1' })),
        transition(':enter', [
            animate('0.33s ease-out', style({ opacity: '1', 'padding-top': (window.__wxjs_environment === 'miniprogram' ? '0px;' : '20px') }))
        ])
    ]);
}

export function slideFromUp() {
    return trigger('routerTransition', [
        state('void', style({ 'margin-top': '-10px', opacity: '0' })),
        state('*', style({ 'margin-top': '0px', opacity: '1' })),
        transition(':enter', [
            animate('0.2s ease-out', style({ opacity: '1', 'margin-top': '0px' }))
        ])
    ]);
}