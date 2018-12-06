<template lang="html">

    <div v-if="strategy === 'single'" class="_vue-flash-msg-container" :style="styles">
        <transition name="flash-message" mode="out-in">
            <VueMessageBlock v-if="showMessage"></VueMessageBlock>
        </transition>
    </div>
    <div v-else>

    </div>

</template>

<script>

export default {


}
</script>

<style lang="css" scoped>

    ._vue-flash-msg-container {
        position: fixed;
        z-index: 300;
        bottom: 20px;
        right: 20px;
        width: 35%;
        max-width: 35%;
    }

    /* Small Monitors */
    @media (1024px <= width <= 1200px) {
        ._vue-flash-msg-container {
            max-width: 100%;
            width:50%;
            max-width: 50%;
        }
    }

    /* Mobile devices */
    @media (320px <= width < 1024px) {
        ._vue-flash-msg-container {
            font-size: .9em;
            width: 90%;
            max-width: 90%;
            right: 5%;
        }
    }

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
