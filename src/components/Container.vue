<template lang="html">

    <div v-if="strategy === 'single'" class="_vue-flash-msg-container">
        <transition name="flash-message" mode="out-in">
            <VueMessageBlock
                v-if="showMessage"
                :messageObj="message"
            ></VueMessageBlock>
        </transition>
    </div>
    <transition-group v-else name="flash-message" tag="div" class="_vue-flash-msg-container">
        <VueMessageBlock v-for="message in messages" :key="message.id" :messageObj="message"></VueMessageBlock>
    </transition-group>

</template>

<script>

export default {


}
</script>

<style lang="css">

    ._vue-flash-msg-container {
        position: fixed;
        display: flex;
        flex-flow: column;
        z-index: 300;
        bottom: 20px;
        right: 20px;
        width: 35%;
        max-width: 35%;
    }

    /* Small Monitors */
    @media (1024px <= width <= 1200px) {
        ._vue-flash-msg-container {
            width:50%;
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

    /* FlashMessage animation */
    .flash-message-enter-active {
        animation: fromBottom .5s forwards;
    }
    .flash-message-leave-active {
        transform-origin: center center;
        animation: toRight .8s forwards;
    }
    .flash-message-move {
        transition: transform .5s;
    }

    @keyframes fromBottom {
      0% {
          transform: translateY(240px);
          opacity: 0;
      }
      70% {
          transform: translateY(-20px);
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
          max-height: 20vh;
      }
      30% {
          transform: translateX(-20px);
          opacity: 0.8;
          max-height: 20vh;
      }
      70% {
          transform: translateX(240px);
          opacity: 0;
          max-height: 20vh;
      }
      100% {
          transform: translateX(240px);
          opacity: 0;
          max-height: 0vh;
      }
    }

</style>
