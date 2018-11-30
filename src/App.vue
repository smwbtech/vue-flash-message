<template>
  <div id="app">
      <button @click="flashMessage.error({title: 'Error Title', message: text })">ERROR</button>
      <button @click="flashMessage.warning({title: 'Warning Title', message: text})">WARNING</button>
      <button @click="flashMessage.success({title: 'Success Title', message: text})">SUCCESS</button>
      <button @click="flashMessage.info({title: 'Info Title', message: text})">INFO</button>
      <button @click="flashMessage.error({title: 'Message Without Icon', message: text, icon: false})">WITHOUT ICON</button>
      <button @click="flashMessage.show({title: 'Custom Styled Message', message: text, flashMessageStyle: customStyle.flashMessageStyle, iconStyle: customStyle.iconStyle}, {mounted: showText, destroyed: clearText})">CUSTOM STYLE MESSAGE</button>
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
            customStyle: {
                flashMessageStyle: {
                    background: 'linear-gradient(#e66465, #9198e5)'
                },
                iconStyle: {
                    backgroundImage: `url("${require('@/assets/img/poop.svg')}")`
                }
            }
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-flow: column;
  align-items: center;

  & button {
      margin-bottom: 20px;
      max-width: 35%;
  }
}

</style>
