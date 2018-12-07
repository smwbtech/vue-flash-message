# vue-flash-message

[![vue](https://img.shields.io/badge/Vue-2.x-green.svg)](https://vuejs.org/index.html)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/smwbtech/vue-flash-message/blob/master/LICENSE.md)


The component to display single flash message to user. It has styles presets, but can be easily customized by passing style object as argument.

#### [Live Demo](https://codesandbox.io/s/ovoyyy4om6?view=preview)

## Setup
```
npm i @smartweb/vue-flash-message
```
## Configuration

```javascript
import Vue from 'vue';
import FlashMessage from '@smartweb/vue-flash-message';
Vue.use(FlashMessage);
```

You can pass [configuration object](#configuration-object) as second argument

```javascript
Vue.use(FlashMessage, config);
```


### Configuration object
------
| Property | Type | Description | Default |
| ------ | ------ | ------ | ------ |
| **name** | **String** | It is a name of the component and alias for the EventBus global property. | 'flashMessage' |
| **tag** | **String** | Custom tag for the component to use in your application. | 'FlashMesage' |
| **time** | **Number** | Duration (in ms) of the message display (can be customized during message call). | 8000  |
| **icon** | **Boolean** | If you would like to use icons as default. | true  |



## Usage

Put the component into your template

```html
<FlashMessage></FlashMessage>
```
You can pass Style Object in attribute :styles of component to configure the block, where flash message will appear

```html
<FlashMessage :styles="{your styles goes here}"></FlashMessage>
```

Now you can access flash message by using global EventBus alias (that is "flashMessage" by default) of your Vue instance

```javascript
this.flashMessage.show({status: 'error', title: 'Error Message Title', message: 'Oh, you broke my heart! Shame on you!'})
```

## Methods

### Display Methods
------

Every display message method will return the id of the message instance

```javascript
this.flashMessage.show({status: 'error', title: 'Error Message Title', message: 'Oh, you broke my heart! Shame on you!'})
```

You also can use shorthands without status property.

```javascript
this.flashMessage.error({title: 'Error Message Title', message: 'Oh, you broke my heart! Shame on you!'});
this.flashMessage.warning({title: 'Warning Message Title', message: 'Don\'t stop me nooooow....!'});
this.flashMessage.info({title: 'Info Message Title', message: 'Just want you to know, that Vue is so cool'});
this.flashMessage.success({title: 'Success Message Title', message: 'Hoorah, it is my fist npm package and it works!'});
```
You can pass the [data object](#data-object) to configure a message instance.


### Data Object
------
The first argument - is data object.

| Property | Type | Description |
| ------ | ------ | ------ |
| **status** | **String** | Status of component. Default presets: 'error', 'warning', 'info', 'success' |
| **title** | **String** | Title of your message |
| **message** | **String** | Text of your message |
| **time** | **Number** | Duration (in ms) of the single message display |
| **icon** | **Boolean** |  If you would like to use icons for this single message|
| **clickable** | **Boolean** |  Allows to control whether the user can remove message by click on it or not.|
| **flashMessageStyle** | **Object** | style Object for flashMessage block |
| **iconStyle** | **Object** | style Object for icon block. You can pass your own icon as 'backgroundImage' |
| **contentStyle** | **Object** | Style of content block |
| **titleStyle** | **Object** | Styles for title |
| **textStyle** | **Object** |  Styles for text |
------


**Example:**

```javascript
    methods: {
        deleteTrouble() {
            this.$axios.delete(`/delete/trouble/${trouble.id}`)
                .then( res => {
                    let { status, data, error } = res.data;
                    if(status) {
                        this.flashMessage.success({
                            title: 'Don\'t Warry',
                            message: 'Be Happy!',
                            time: 5000,
                            flashMessageStyle: {
                                backgroundColor: 'linear-gradient(#e66465, #9198e5)'
                            }
                        });
                    }
                    else {
                        this.flashMessage.error({title: error.name || 'Error', message: error.message});
                    }
                })
                .catch(e);
        }
    }
```


### Callbacks
------

As second argument you can pass object with two properties: "mounted" and "destroyed".

| Property | Type | Description |
| ------ | ------ | ------ |
| **mounted** | **Function** | Will be invoked, when flashMessage appears |
| **destroyed** | **Function** | Will be invoked, when flashMessage gone |
------


**Example:**

```html
<p>{{ text }}</p>
<button @click="clickHandler" type="button" name="button">Show Text!</button>
```

For example you can add some sound which will be played when message appears

```javascript
    methods: {
        showText() {
            this.text = 'Hello from callback!'
        },
        clearText() {
            this.text = 'Bye... 1, ..2, ..3';
            let sound = new Audio('audio surce'); // add sound source
            sound.play(); // and play it
            setTimeout( () => this.text = '', 3000);
        },
        clickHandler() {
            this.flashMessage.info({
                title: 'Ooooooops!',
                message: 'Do you see this text and hear this sound? Wtf?'
            },
            {
                mounted: showText,
                destroyed: clearText
            })
        }
    }
```


### Delete Methods
------

You can delete message programmatically using deleteMessage method


**Example:**

```javascript
    let id = this.flashMessage.info({title: 'Hey, man. Time for beer!', message: 'It is Friday. Time to have a little party.'})
    this.flashMessage.deleteMessage(id);
```


## LICENSE

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
