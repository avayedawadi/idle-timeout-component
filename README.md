## idle-timeout-component

This is an idle timeout component built with the purpose of allowing
for developers to easily implement an idle timeout feature into their
website. A modal comes up to log users out of the website. There is
a high degree of customizability using features of web components
and taking advantage of the shadow DOM.

## Benefits
 - Easy to implement
 - Easy to use
 - Works in React, Angular, Vue
 - Will work in any framework at all
 - Highly customizable
 - Highly reactive to different screen sizes

## Dependencies
 -  Built using lit

## Features
 - Can be created straight in the HTML tag
 - Has 15+ CSS variables that can be edited
 - Has 7 direct properties that can be edited
 - Reactive styling
 - Notification and logout times can be changed easily by the developer

## Installation
<!-- prettier-ignore -->
```bash
$ npm install idle-timeout-component
```

## Importing
After installing the web component, it must also be imported.

This can be done in one of three ways.

Javascript module:
<!-- prettier-ignore -->
```js
import 'idle-timeout-component';
```

Or through HTML as follows:

<!-- prettier-ignore -->
```html
<script type="module">
import 'idle-timeout-component';
</script>
```
or
<!-- prettier-ignore -->
```html
<script type="module" src="idle-timeout-component"></script>
```

## Usage
After importing simply using the tag will add the web component to the application.
```html 
<idle-timeout-component></idle-timeout-component>
```
If you want to use this on an entire React, Angular, or Vue site, put the HTML tag at the root. For example,
in React, you would put the tag in the index.js file.

But this will not include any information and all editing of the pugh
chart will have to be done via the website on which the component is hosted.
If you wish to have persistent data inputted. This must be passed as an 
HTML property as seen in the following example.
```html
  <idle-timeout-component timeToNotify=100 timeToLogout=60 style="--logout-button-color: blue; --logout-button-font: Serif"><idle-timeout-component>>
 ```

The above would bring up the notification of logout after being idle for 100 seconds and then 
once the user is notified the user would have 60 seconds to remain on the site or they would be
logged out. The logout button color and the logout button font have also been edited inline. All
editable CSS and all properties are down below.

Then somewhere else in your code you would need to listen to the event listner about a logout
as see in the following example.
```javascript
document.addEventListener("logout",()=>{console.log("Logout")});
```
For the "logout" event, composed and bubbles are both set to true so your entire DOM tree
will be able to see the event. Not naming another event "logout" in order to reduce conflicts
is highly recommended.

## Properties

| Property               | Attribute          | Type         | Default                                          | Description                                      |
|------------------------|--------------------|--------------|--------------------------------------------------|--------------------------------------------------|
| `logoutButtonText`     | `logoutButtonText` | `String`     | "Logout"                                         | This is the text on the logout button for the modal. |
| `logoutWarning`        | `logoutWarning`    | `String`     | "Logging out!"                                   | This is the text that the title of the website flashes when the notification of logout is showing (when the modal is showing). |
| `modalBodyText`        | `modalBodyText`    | `String`     | "Indicate if you are still there or you will be logged out!" | This is the text in the body of the modal popup. |
| `modalHeaderText`      | `modalHeaderText`  | `String`     | "Are you still there?"                           | This is the text at the top of the modal popup.  |
| `remainButtonText`     | `remainButtonText` | `String`     | "Still here"                                     | This is the text on the button that allows the user to continue using the site. |
| `switch`               |                    | `boolean`    | true                                             |                                                  |
| `timeToLogout`         | `timeToLogout`     | `Number`     | 60                                               | This is the number in seconds that is the amount of time that the user is notified for before being completely logged out. This is how long the modal is shown for. |
| `timeToNotify`         | `timeToNotify`     | `Number`     | 10                                               | This is the number in seconds that is the amount of time that the user is idle before they receive notification that they will be logged out. |
| `timerStarted`| `timerStarted`| `String`| `started`| If the property is equal to 'started' then the timer will tick down. However, if it is not, the timer will not move.|

## Events

| Event    | Type                                | Description                    |
|----------|-------------------------------------|--------------------|
| `logout` | `CustomEvent<{ message: string; }>` | Event that dispatches when the user should be logged out. Composed and bubbles are true.                  |

## CSS Custom Stylings

| Property               | Type           | Description  |Default   |               
|------------------------|----------------|--------------|----------|
| `--body-font`          |`string`        |`Font for the modal`|`Sans-Serif`|              
| `--body-text-color`    |`color(string)` |`Text color for the modal`|`black`|     
| `--time-text-font`     |`string`        |`Font for the timer countdown`|`Sans-serif`|
| `--timer-text-color`   |`color(string)` |`Text color for the timer countdown`|`black`|
| `--timer-circle-color` |`color(string)` |`Color for the circle part of the timer`|`black`|
| `--header-background-color` |`color(string)`|`Background color for the header of the modal`|`gray`|
| `--header-font`        | `string`|`Font for the header of the modal`|`Sans-serif`|
| `--header-text-color`      | `color(string)`     |`Color for the text in the header of the modal`|`white`|
| `--modal-z-index`      | `number`     |`z-index for the modal`|`500`|
| `--logout-button-color`| `color(string)` |`Color of the logout button`|`rgb(202, 60, 60)`|
| `--logout-button-font`           | `string`             |`Font of the logout button`|`Sans-Serif`|
| `--logout-button-text-color`   | `color(string)`             |`Text color for the logout button`|`white`|
| `--stya-button-color`| `color(string)` |`Color of the stay button`|`green`|
| `--stay-button-font`           | `string`             |`Font of the stay button`|`Sans-Serif`|
| `--stay-button-text-color`   | `color(string)`             |`Text color for the stay button`|`white`|
 