<template>
  <div id="app">

    <h1>Vue Flash Messages</h1>
    <p>An easy way to notify your users </p>

    <button
      class="error"
      @click="flashMessage.error({ title: 'Error Title', message: text });"
    >
      ERROR
    </button>
    <button
      class="warning"
      @click="flashMessage.warning({ title: 'Warning Title', message: text });"
    >
      WARNING
    </button>
    <button
      class="success"
      @click="flashMessage.success({ title: 'Success Title', message: text, icon: succesIcon, time: 10000000 });"
    >
      SUCCESS
    </button>
    <button
      class="info"
      @click="flashMessage.info({ title: 'Info Title', message: text });"
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
        });
      "
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
        );
      "
    >
      CUSTOM STYLE MESSAGE
    </button>
    <p>{{ callbackText }}</p>
    <FlashMessage></FlashMessage>
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
        }
    },

    methods: {
        showText() {
            this.callbackText = 'Hello from callback! FlashMessage is appear'
        },
        clearText() {
            this.callbackText = 'My time has passed! I will disappear in 3 second...';
            setTimeout( () => this.callbackText = '', 3000);
        }
    }
}
</script>

<style>
#app {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(.25turn, #a224dc, #3624dc);
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-flow: column;
    align-items: center;

    & h1, & p {
        color: #fff;
    }

    & button {
        font-weight: bold;
        display: block;
        margin-bottom: 20px;
        max-width: 50%;
        width: 50%;
        padding: 10px;
        border: 2px solid;
        border-radius: 5px;
        cursor: pointer;

        &.error {
        background-color: rgba(241, 34, 34, 0.68);
        border-color: #f12222;
        }

        &.warning {
          background-color: rgba(241, 139, 34, 0.68);
          border-color: #f18b22;
        }

        &.success {
          background-color: rgba(1, 148, 122, 0.68);
          border-color: #01947a;
        }

        &.info {
          background-color: rgba(16, 135, 194, 0.68);
          border-color: #1087c2;
        }

        &.empty {
          background-color: #fff;
          border-color: #1087c2;
        }

        &.custom {
          background: linear-gradient(0.2turn, #e66465, #9198e5);
          border-color: #e66465;
          color: #fff;
        }

    }
}

.custom_msg {
    background: linear-gradient(#e66465, #9198e5);
}

</style>
