<template lang="html">

    <div v-if="strategy === 'single'">
        <transition name="flash-message" mode="out-in">
            <VueMessageBlock v-if="showMessage"></VueMessageBlock>
        </transition>
    </div>
    <div v-else>

    </div>

</template>

<script>

import FlashMessage from './FlashMessage.vue';

export default {


    computed: {

        strategy() {
            return this.flashMessage.strategy;
        },

        showMessage() {
            return this.flashMessage.strategy;
        }
    }
}
</script>

<style lang="css" scoped>

/* Анимация FlashMessage */
.flash-message-enter-active {
  animation: fromBottom .5s forwards;
}
.flash-message-leave-active {
  animation: toRight .5s forwards;
}
@keyframes fromBottom {
  0% {
      transform: translateY(240px);
      opacity: 0;
  }
  70% {
      transform: translateY(-50px);
      opacity: 0.8;
  }
  100% {
      transform: translateY(0);
      opacity: 1;
  }
}
@keyframes toRight {
  0% {
      transform: translateX(0);
      opacity: 1;
  }
  30% {
      transform: translateX(-50px);
      opacity: 0.8;
  }
  100% {
      transform: translateX(240px);
      opacity: 0;
  }
}

</style>
