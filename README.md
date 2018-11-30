# vue-flash-msg

The component to display single flash messages to user. It has styles presets, but can be easily customized by passing style object in argument.

## Setup
```
npm i vue-flash-msg
```
## Configuration

```javascript
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
Vue.use(VueFlashMessage);
```

You can pass configuration object as second argument

```javascript
Vue.use(VueFlashMessage, config);
```
### Configuration object

| Property | Description | Default |
| --- | --- |
| name | {String} It is name of component and alias for EventBus global property. | 'flashMessage' |
| tag | {String} Custom tag for component to use in your application. | 'FlashMesage' |
| time | {Number} The duration (in ms) of the message display (can be customized during message call). | 8000  |
| icon | {Boolean} If you would like to use icons as default. | true  |
