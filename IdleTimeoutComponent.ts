import { html, css, LitElement, property, state } from 'lit-element';


/**
 * 
 *  @element idle-timeout-component
 * 
 *  
 * */
export class IdleTimeoutComponent extends LitElement {

  /**
  * This is the number in seconds that is the amount of time that the user is idle before they receive notification that they will be logged out.
  * @type {Number}
  */
  @property({ type: Number }) timeToNotify = 10;

  /**
  * This is the number in seconds that is the amount of time that the user is notified for before being completely logged out. This is how long the modal is shown for.
  * @type {Number}
  */
  @property({ type: Number }) timeToLogout = 60;

  /**
  * This is the text at the top of the modal popup.
  * @type {String}
  */
  @property({ type: String }) modalHeaderText = "Are you still there?";

  /**
  * This is the text in the body of the modal popup.
  * @type {String}
  */
  @property({ type: String }) modalBodyText = "Indicate if you are still there or you will be logged out!";

  /**
  * This is the text on the logout button for the modal.
  * @type {String}
  */
  @property({ type: String }) logoutButtonText = "Logout";

  /**
  * This is the text on the button that allows the user to continue using the site.
  * @type {String}
  */
  @property({ type: String }) remainButtonText = "Still here";

  /**
  * This is the text that the title of the website flashes when the notification of logout is showing (when the modal is showing).
  * @type {String}
  */
  @property({type: String}) logoutWarning = "Logging out!"

  firstTime = true;
  logoutTime: any;
  notifyTime: any;
  intervalForLogout: any;
  localstorageInterval: any;
  notifyTimeInterval: any;
  switch=true;

  windowIndex: any;

  @state()
  private currentTime: any = this.timeToLogout;

  @state()
  private notificationBool: Boolean = false;

  documentTitle:any;

  notify = () => {
    clearInterval(this.intervalForLogout);
    this.currentTime = this.timeToLogout;
    this.intervalForLogout = setInterval(() => {
      this.currentTime = --this.currentTime <= 0 ? 0 : this.currentTime;
      if(localStorage.logout == 0){
        this.notificationBool = false; 
        clearTimeout(this.logoutTime); 
        clearTimeout(localStorage.notifyTime); 
        localStorage.logout=0;
        localStorage.logout=0; 
        clearInterval(this.intervalForLogout);
        document.title = this.documentTitle;
      }
      if(this.switch){
        document.title = this.logoutWarning;
      }
      else{
        document.title = this.documentTitle;
      }
      this.switch=!this.switch;
    }, 1000);
    this.notificationBool = true;
    clearTimeout(this.logoutTime);
    clearTimeout(localStorage.notifyTime);
    this.logoutTime = setTimeout(this.__logout, this.timeToLogout * 1000);
  }

  

  timer() {
    const resetTime = () => {
      localStorage.notifyTime = this.timeToNotify;
      if (!this.notificationBool) {
        clearTimeout(this.notifyTime);
      }
      else if (this.firstTime) {
        this.logoutTime = setTimeout(this.__logout, this.timeToLogout * 1000);
      }
    }
    if (this.firstTime) {
      resetTime();
    }
    window.onload = resetTime;

    document.onmousemove = resetTime;
    document.onkeydown = resetTime;
  }

  __logout = () => {
    document.title = this.documentTitle;
    clearTimeout(this.logoutTime);
    const options = {
      detail: { message: 'User logged out' },
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('logout', options));

  }

  render() {
    if (this.firstTime) {

      clearInterval(this.notifyTimeInterval);
      this.notifyTimeInterval = setInterval(() => {
        if (this.windowIndex == Math.max(...JSON.parse(localStorage.windowArray)) && !this.notificationBool) {
          localStorage.notifyTime = --localStorage.notifyTime;
        }
        if (localStorage.notifyTime == 0 && !this.notificationBool) {
          localStorage.logout = 1;
          this.notify();
        }
      }, 1000);

      if (localStorage.getItem("windowArray") === "NaN" || localStorage.getItem("windowArray") === null) {
        var array1 = [];
        array1[0] = 1;
        localStorage.setItem("windowArray", JSON.stringify(array1))
        this.windowIndex = 1;
      }
      else{
        var array2 = JSON.parse(localStorage.getItem("windowArray")!);
        var max = Math.max(...array2);
        array2.push(max+1);
        this.windowIndex = max+1;
        localStorage.setItem("windowArray", JSON.stringify(array2));
      }

      window.onbeforeunload = () => {
        let arr1 = JSON.parse(localStorage.windowArray);
        let index = arr1.indexOf(this.windowIndex);
        arr1.splice(index, 1);
        if(arr1.length == 0){
          localStorage.removeItem("windowArray");
        }
        else{
          localStorage.setItem("windowArray", JSON.stringify(arr1));
        }
        
      }

      this.documentTitle = document.title;

    }
    this.timer()
    this.firstTime = false
    return html`
      <div class="modal" style="${this.notificationBool ? "display:block;" : "display:none;"}">
        <div class="content">
          <div class="firstRow">
            <span class="xButton" style=${(this.currentTime == 0 ? "pointer-events:none" : "")}  @click="${() => { this.notificationBool = false; clearTimeout(this.logoutTime); clearTimeout(localStorage.notifyTime); localStorage.logout=0; clearInterval(this.intervalForLogout); document.title = this.documentTitle; localStorage.notifyTime = this.timeToNotify;
      if (!this.notificationBool) {
        clearTimeout(this.notifyTime);
      }
      else if (this.firstTime) {
        this.logoutTime = setTimeout(this.__logout, this.timeToLogout * 1000);
      }}}">&times;</span>
            <h2>${this.modalHeaderText}</h2>
          </div>
          <div class="circle" style=${(this.currentTime==0 ? "display:none" : '')}>
            <div class="time">
              <p class="timeText">${this.currentTime}</p>
             </div>
            <svg>
              <circle r="48" cx="50" cy="50" id="black" style="stroke-dashoffset:${300-this.currentTime/this.timeToLogout*300}px;"></circle>
            </svg>
        </div>
          <div class="body">
            <p class="modalBodyText"> ${this.modalBodyText} </p>
            <button class="logoutButton" style=${(this.currentTime == 0 ? "pointer-events:none" : "")} @click=${this.__logout}>${this.logoutButtonText}</button>
            <button class="stayButton" style=${(this.currentTime == 0 ? "pointer-events:none" : "")}  @click="${() => { this.notificationBool = false; clearTimeout(this.logoutTime); clearTimeout(localStorage.notifyTime); localStorage.logout=0; clearInterval(this.intervalForLogout); document.title = this.documentTitle; localStorage.notifyTime = this.timeToNotify;
      if (!this.notificationBool) {
        clearTimeout(this.notifyTime);
      }
      else if (this.firstTime) {
        this.logoutTime = setTimeout(this.__logout, this.timeToLogout * 1000);
      }}}">${this.remainButtonText}</button>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`

    .modalBodyText{
      font-family: var(--body-font, Sans-Serif);
      color: var(--body-text-color, black);
    }

    .timeText{
      position: relative;
      margin:auto;
      font-size: 35px;
      font-family: var(--time-text-font, Sans-serif);
    }

    .circle{
      position: relative;
      height: 100px;
      width: 100px;
      text-align: center;
      margin: auto;
      margin-top: 15px;
    }

    .time{
      color: var(--timer-text-color, black);
      display: inline-block;
      line-height: 100px;
      text-align: center;
    }

    svg{
      position: absolute;
      top: 0px;
      right: 0px;
      width: 100px;
      height: 100px;
      transform: rotateY(-180deg) rotateZ(-90deg);
    }

    circle{
      fill: none;
    }
    #black{
      stroke-dasharray: 300px;
      stroke-dashoffset: 0px;
      stroke-linecap: round;
      stroke-width: 2px;
      stroke: var(--timer-circle-color,black);
    }

    

    .firstRow{
      background: var(--header-background-color,gray);
      padding: 15px;
      color: #fff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    .firstRow h2{
      margin: 0;
      font-family: var(--header-font, Sans-serif);
      color: var(--header-text-color, white);
    }

    .modal{
      position: fixed;
      display:none;
      padding-top: 10%;
      background-color: rgba(0,0,0,0.4);
      height:100%;
      width: 100%;
      z-index: var(--modal-z-index,500);
      left: 0;
      top: 0;
    }

    .content{
      background-color: #fefefe;
      margin: auto;
      padding: 0px;
      padding-top: 0px;
      border: none;
      width: 40%;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
      border-radius: 5px;
    }

    .body{
      padding: 15px;
      padding-top: 0px;
      text-align:center;
    }

    .xButton {
      float: right;
      font-size: 30px;
    }

    .xButton:hover{
      cursor: pointer;
    }

    button {
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 5px;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
      padding: 10px;
    }

    .logoutButton{
      background: var(--logout-button-color,rgb(202, 60, 60));
      font-family: var(--logout-button-font, Sans-Serif);
      color: var(--logout-button-text-color, white);
    }

    .stayButton{
      background: var(--stay-button-color,green);
      font-family: var(--stay-button-font, Sans-Serif);
      color: var(--stay-button-text-color, white);
    }

    button:hover{
      cursor:pointer;
    }
    @keyframes timer {
      from {
        stroke-dashoffset: 0px;
      }
      to {
        stroke-dashoffset: 320px;
      }
    }
    
  `;
}


