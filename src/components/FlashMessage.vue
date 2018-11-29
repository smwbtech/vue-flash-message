<template lang="html">

    <transition name="flash-message">
        <div
            v-if="message.length > 0"
            :style="style.flashMessageStyle"
            :class="classObj"
            @click="clearData">
                <div v-if="icon" class="icon" :style="style.iconStyle">
                </div>
                <div class="content" :style="style.contentStyle">
                    <h3 :style="style.titleStyle">{{ getTitle }}</h3>
                    <p :style="style.textStyle">{{ message }}</p>
                </div>
        </div>
    </transition>

</template>

<script>
export default {

    computed: {
        classObj() {
            return {
                success: this.status === 'success',
                error: this.status === 'error',
                warning: this.status === 'warning',
                info: this.status === 'info',
                'error-body': true
            }
        }
    }

}
</script>

<style lang="css" scoped>

    .error-body {
        position: fixed;
        display: flex;
        z-index: 300;
        bottom: 20px;
        right: 20px;
        width: 35%;
        max-width: 35%;
        border-radius: 5px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        color: #fff;
        text-align: left;
        overflow: hidden;
        cursor: pointer;
        transition: all .3s ease-in;

        & .icon {
            width: 20%;
            min-width: 20%;
            min-height: 100%;
            padding: 0px 10px;
            background-color: #fff;
            background-position: center;
            background-size: 70%;
            background-repeat: no-repeat;
        }

        & .content {
            padding-left: 20px;
        }

        &.success {

            border: 1px solid var(--dark-green);
            background-color: rgba(var(--dark-green-rgb), 0.68);
            &:hover {
                background-color: rgba(var(--dark-green-rgb), 1);
            }

            & .content {
                border-left: 5px solid rgba(var(--dark-green-rgb), 1);
            }

            & .icon {
                background-image: url('~@/assets/img/success.svg');
            }
        }


        &.info {
            border: 1px solid var(--dark-blue);
            background-color: rgba(var(--dark-blue-rgb), 0.68);
            &:hover {
                background-color: rgba(var(--dark-blue-rgb), 1);
            }

            & .content {
                border-left: 5px solid rgba(var(--dark-blue-rgb), 1);
            }

            & .icon {
                background-image: url('~@/assets/img/information.svg');
            }
        }


        &.error{
            border: 1px solid var(--red);
            background-color: rgba(var(--red-rgb), 0.68);
            &:hover {
                background-color: rgba(var(--red-rgb), 1);
            }

            & .content {
                border-left: 5px solid rgba(var(--red-rgb), 1);
            }

            & .icon {
                background-image: url('~@/assets/img/warning.svg');
            }
        }


        &.warning {
            border: 1px solid var(--orange);
            background-color: rgba(var(--orange-rgb), 0.68);
            &:hover {
                background-color: rgba(var(--orange-rgb), 1);
            }

            & .content {
                border-left: 5px solid rgba(var(--orange-rgb), 1);
            }

            & .icon {
                background-image: url('~@/assets/img/light-bulb.svg');
            }
        }
    }

    /* Верстка для мобильных устройств */
    @media (320px <= width < 1024px) {
        div {
            max-width: 100%;
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
