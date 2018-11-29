<template>
  <div id="app">
      <button @click="flashMessage.error({title: 'Error Title', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum, ligula ac accumsan lobortis, nulla ante pharetra magna, sed sagittis dui metus sit amet lorem. '})">ERROR</button>
      <button @click="flashMessage.warning({title: 'Warning Title', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum, ligula ac accumsan lobortis, nulla ante pharetra magna, sed sagittis dui metus sit amet lorem. '})">WARNING</button>
      <button @click="flashMessage.success({title: 'Success Title', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum, ligula ac accumsan lobortis, nulla ante pharetra magna, sed sagittis dui metus sit amet lorem. '})">SUCCESS</button>
      <button @click="flashMessage.info({title: 'Info Title', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum, ligula ac accumsan lobortis, nulla ante pharetra magna, sed sagittis dui metus sit amet lorem. '})">INFO</button>
      <FlashMessage></FlashMessage>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
      return {
          customStyle: {
              backgroundColor: '#000'
          }
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
}

</style>
