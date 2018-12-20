<template>
  <div id="app">

    <section>
        <h1>Vue Flash Messages</h1>
        <p>An easy way to notify your users </p>
        <p class="callback-text">{{ callbackText }}</p>
    </section>


    <aside class="settings">

        <div class="settings-presets">

            <h3>Preset Styles</h3>
            <button
                class="error"
                @click="flashMessage.error({ title: 'Error Title', message: text, icon: errorIcon });"
            >
                ERROR
            </button>
            <button
                class="warning"
                @click="flashMessage.warning({ title: 'Warning Title', message: text, icon: warningIcon });"
            >
            WARNING
            </button>
            <button
                class="success"
                @click="flashMessage.success({ title: 'Success Title', message: text, icon: succesIcon});"
            >
            SUCCESS
            </button>
            <button
                class="info"
                @click="flashMessage.info({ title: 'Info Title', message: text, icon: infoIcon});"
            >
            INFO
        </button>
        <button
            class="empty"
            @click="
            flashMessage.error({
                title: 'Message Without Icon',
                message: text,
                icon: false,
                clickable: false
            });"
        >
        WITHOUT ICON AND UNCKLICKABE
        </button>
        <button
            class="custom"
            @click="
                flashMessage.show(
                    {
                        title: 'Custom Styled Message',
                        message: text,
                        icon: customMessageIcon,
                        blockClass: 'custom_msg'
                    },
                    {
                        mounted: showText,
                        destroyed: clearText
                    }
                );"
            >
            CUSTOM STYLE MESSAGE WITH CALLBACKS
        </button>
        <button
            class="custom_two"
            @click="
                flashMessage.show(
                    {
                        title: 'Custom Styled Message',
                        message: text,
                        icon: doveIcon,
                        blockClass: 'custom_msg_two',
                        position: 'left top',
                        x: $event.clientX + 20,
                        y: $event.clientY + 20
                    }
                );"
            >
            MESSAGE WITH POSITION PROP
        </button>
        </div>

        <div class="custom-settings">

            <h3>Customize your own message</h3>

            <form action="">
                <label for="">Strategy</label>
                <label for="">Position</label>
                <select name="" id="" @change="flashMessage.setStrategy($event.target.value)" v-model="userData.strategy">
                    <option value="single" selected>single</option>
                    <option value="multiple">multiple</option>
                </select>
                <select name="" id="" v-model="userData.position">
                    <option value="right bottom " selected>right bottom</option>
                    <option value="right top">right top</option>
                    <option value="left bottom">left bottom</option>
                    <option value="left top">left top</option>
                </select>
                <label for="">Title</label>
                <label for="">Message</label>
                <input type="text" name="" id="" placeholder="Message Title" v-model="userData.title">
                <input type="text" name="" id="" placeholder="Message Text" v-model="userData.message">
                <label for="">Icon</label>
                <label for="">Duration in ms</label>
                <input type="text" name="" id="" placeholder="URL to image" v-model="userData.icon">
                <input type="text" name="" id="" placeholder="Time the message will live in ms" v-model.number="userData.time">
                <button type="button" name="button" @click="showUserMessage">Show Message</button>
            </form>

        </div>




    </aside>
    <FlashMessage :position="userData.position"></FlashMessage>
  </div>
</template>

<script>

export default {
    name: 'app',
    data() {
        return {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum, ligula ac accumsan lobortis, nulla ante pharetra magna, sed sagittis dui metus sit amet lorem. ',
            callbackText: '',
            customMessageIcon: `${require('@/assets/img/poop.svg')}`,
            succesIcon: `${require('@/assets/img/success.svg')}`,
            warningIcon: `${require('@/assets/img/light-bulb.svg')}`,
            errorIcon: `${require('@/assets/img/warning.svg')}`,
            infoIcon: `${require('@/assets/img/information.svg')}`,
            doveIcon: `${require('@/assets/img/dove.svg')}`,
            sounds: {
                message: `${require('@/assets/sounds/message.mp3')}`,
                delete: `${require('@/assets/sounds/delete.mp3')}`
            },
            userData: {
                position: 'right bottom',
                strategy: 'single',
                title: '',
                message: '',
                icon: '',
                time: 8000
            }
        }
    },

    methods: {
        showText() {
            let sound = new Audio(this.sounds.message);
            sound.play();
            this.callbackText = 'Hello from callback! FlashMessage is appear'
        },
        clearText() {
            let sound = new Audio(this.sounds.delete);
            sound.play();
            this.callbackText = 'My time has passed! I will disappear in 3 second...';
            setTimeout( () => this.callbackText = '', 3000);
        },
        showUserMessage() {
            let { title, message, icon, time } = this.userData;
            this.flashMessage.show({title, message, icon, time});
        }
    }
}
</script>

<style>
#app {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100vw;
    min-height: 100vh;
    background: linear-gradient(.25turn, #a224dc, #3624dc);
    background-repeat: no-repeat;
    background-size: cover;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;

    & section {
        order: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 40vw;

        & > h1, & > p {
            color: #fff;
        }

        & > p {
            margin-bottom: 60px;
        }

        & .callback-text {
            min-height: 2.5rem;
        }
    }



    & .settings {
        width: 40vw;
        min-width: 425px;
        margin-left: 40px;
        padding: 20px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        box-shadow: var(--block-shadow);

        & .settings-presets {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            & h3 {
                width: 100%;
                color: #fff;
            }
        }

        & .custom-settings {

            & h3 {
                width: 100%;
                color: #fff;
            }

            & form {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                width: 100%;
            }

            & label {
                display: block;
                font-weight: 300;
                letter-spacing: 1.3px;
                min-width: 40%;
                margin-bottom: 20px;
                color: #fff;
            }

            & input, & select {
                display: block;
                min-width: 40%;
                margin-bottom: 20px;
                border: none;
                background-color: rgba(255, 255, 255, 0.7);
                padding: 5px;
            }

            & button {
                display: block;
                max-width: 40%;
                margin: 0 auto;
                margin-bottom: 20px;
            }
        }
    }

    & button {
        display: block;
        margin-bottom: 20px;
        max-width: 50%;
        width: 40%;
        padding: 10px;
        border: 2px solid;
        border-radius: 5px;
        font-size: .8rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color .2s ease-in;

        &.error {
        background-color: rgba(241, 34, 34, 0.68);
        border-color: #f12222;

            &:hover {
                background-color: rgba(241, 34, 34, 1);
            }
        }

        &.warning {
          background-color: rgba(241, 139, 34, 0.68);
          border-color: #f18b22;

            &:hover {
                background-color: rgba(241, 139, 34, 1);
            }

        }

        &.success {
          background-color: rgba(1, 148, 122, 0.68);
          border-color: #01947a;

            &:hover {
                background-color: rgba(1, 148, 122, 1);
            }
        }

        &.info {
          background-color: rgba(16, 135, 194, 0.68);
          border-color: #1087c2;

            &:hover {
                background-color: rgba(16, 135, 194, 1);
            }

        }

        &.empty {
          background-color: rgba(191, 39, 222, 0.68);
          border-color: rgba(191, 39, 222, 1);

            &:hover {
                 background-color: rgba(191, 39, 222, 1);
            }

        }

        &.custom {
          background-image: linear-gradient(0.2turn, rgba(230, 100, 101, 1), rgba(46, 63, 250, 1));
          border-color: #e66465;
          color: #fff;
        }

        &.custom_two {
            background-color: rgba(222, 39, 176, 0.68);
            border-color: rgba(222, 39, 176, 1);

              &:hover {
                   background-color: rgba(222, 39, 176, 1);
              }
        }



    }
}

.custom_msg {
    background: linear-gradient(0.2turn, rgba(247, 19, 204, 1), rgba(23, 123, 255, 1));

    &._vue-flash-msg-body ._vue-flash-msg-body__icon {
        width: 100%;
    }

}

/* Small Monitors */
@media (1024px <= width <= 1200px) {

}

/* Mobile devices */
@media (320px <= width < 1024px) {
    #app {

        flex-direction: column;

        & button {
            width: 45%;
            max-width: 45%;
            font-size: .6rem;
        }

        & section {
            order: 1;
            width: 90%;
        }

        & .settings {
            order: 2;
            width: 90%;
            min-width: 90%;
            margin: 0 auto;

            & form {

                & input, & select {
                    width: 35%;
                    max-width: 35%;
                }
            }
        }

        & .custom_msg_two {
            width: 100%;
            max-width: 100%;
        }
    }
}

</style>
