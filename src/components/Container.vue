<template lang="html">

    <div v-if="strategy === 'single'" :class="['_vue-flash-msg-container',positionClass]">
        <transition name="flash-message" mode="out-in">
            <VueMessageBlock
                v-if="showMessage"
                :messageObj="message"
            ></VueMessageBlock>
        </transition>
    </div>
    <transition-group v-else :name="positionClass" tag="div" :class="['_vue-flash-msg-container',positionClass]">
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
        flex-direction: column;
        z-index: 300;
        width: 35%;
        max-width: 35%;

        &._vue-flash-msg-container_right-bottom {
            right: 20px;
            bottom: 20px;
        }

        &._vue-flash-msg-container_right-top {
            right: 20px;
            top: 20px;
            flex-direction: column-reverse;
        }

        &._vue-flash-msg-container_left-bottom {
            left: 20px;
            bottom: 20px;
        }

        &._vue-flash-msg-container_left-top {
            left: 20px;
            top: 20px;
            flex-direction: column-reverse;
        }

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
    ._vue-flash-msg-container_right-bottom-enter-active,
    ._vue-flash-msg-container_left-bottom-enter-active {
        animation: fromBottom .5s forwards;
    }

    ._vue-flash-msg-container_right-top-enter-active,
    ._vue-flash-msg-container_left-top-enter-active {
        animation: fromTop .5s forwards;
    }

    ._vue-flash-msg-container_right-bottom-leave-active,
    ._vue-flash-msg-container_right-top-leave-active {
        transform-origin: center center;
        animation: toRight .8s forwards;
    }

    ._vue-flash-msg-container_left-bottom-leave-active,
    ._vue-flash-msg-container_left-top-leave-active {
        transform-origin: center center;
        animation: toLeft .8s forwards;
    }


    .flash-message-move {
        transition: transform .2s;
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

    @keyframes fromTop {
      0% {
          transform: translateY(-240px);
          opacity: 0;
      }
      70% {
          transform: translateY(20px);
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

    @keyframes toLeft {
      0% {
          transform: translateX(0);
          opacity: 1;
          max-height: 20vh;
      }
      30% {
          transform: translateX(20px);
          opacity: 0.8;
          max-height: 20vh;
      }
      70% {
          transform: translateX(-240px);
          opacity: 0;
          max-height: 20vh;
      }
      100% {
          transform: translateX(-240px);
          opacity: 0;
          max-height: 0vh;
      }
    }

</style>
