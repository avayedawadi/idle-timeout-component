import { LitElement } from 'lit-element';
export declare class IdleTimeoutComponent extends LitElement {
    timeToNotify: number;
    timeToLogout: number;
    modalHeaderText: string;
    modalBodyText: string;
    logoutButtonText: string;
    remainButtonText: string;
    logoutWarning: string;
    firstTime: boolean;
    logoutTime: any;
    notifyTime: any;
    intervalForLogout: any;
    localstorageInterval: any;
    notifyTimeInterval: any;
    switch: boolean;
    windowIndex: any;
    private currentTime;
    private notificationBool;
    documentTitle: any;
    notify: () => void;
    timer(): void;
    __logout: () => void;
    render(): import("lit-element").TemplateResult;
    static styles: import("lit-element").CSSResult;
}
