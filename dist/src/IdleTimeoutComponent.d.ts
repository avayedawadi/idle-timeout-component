import { LitElement } from 'lit-element';
/**
 *
 *  @element idle-timeout-component
 *
 *
 * */
export declare class IdleTimeoutComponent extends LitElement {
    /**
    * This is the number in seconds that is the amount of time that the user is idle before they receive notification that they will be logged out.
    * @type {Number}
    */
    timeToNotify: number;
    /**
    * This is the number in seconds that is the amount of time that the user is notified for before being completely logged out. This is how long the modal is shown for.
    * @type {Number}
    */
    timeToLogout: number;
    /**
    * This is the text at the top of the modal popup.
    * @type {String}
    */
    modalHeaderText: string;
    /**
    * This is the text in the body of the modal popup.
    * @type {String}
    */
    modalBodyText: string;
    /**
    * This is the text on the logout button for the modal.
    * @type {String}
    */
    logoutButtonText: string;
    /**
    * This is the text on the button that allows the user to continue using the site.
    * @type {String}
    */
    remainButtonText: string;
    /**
    * This is the text that the title of the website flashes when the notification of logout is showing (when the modal is showing).
    * @type {String}
    */
    logoutWarning: string;
    /**
    * This is a boolean value about whether or not the timer should be started yet. Gives the developer more control.
    * @type {String}
    */
    timerStarted: string;
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
