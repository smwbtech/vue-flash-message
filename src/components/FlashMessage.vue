<template lang="html">

        <div
            :class="[classObj, position.class, messageObj.blockClass]"
            :style="[position.style]"
            @click="clickHandler">
                <div v-if="messageObj.icon" :class="['_vue-flash-msg-body__icon', messageObj.iconClass]">
                    <img :src="messageObj.icon" alt="">
                </div>
                <div :class="['_vue-flash-msg-body__content', messageObj.contentClass]">
                    <h3><span :v-html="messageObj.title"></span></h3>
                    <p><span :v-html="messageObj.message"></span></p>
                </div>
        </div>

</template>

<script>
export default {

}
</script>

<style lang="css">

    ._vue-flash-msg-body {
        display: flex;
        width: 100%;
        margin-bottom: 20px;
        border-radius: 5px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        color: #fff;
        text-align: left;
        overflow: hidden;
        cursor: pointer;
        transition: all .3s ease-in;
        max-height: 20vh;

        &._vue-flash-msg-body_unclickabe {
            cursor: auto;
        }

        &._vue-flash-msg-body_flying {
            max-width: 35%;
        }

        & ._vue-flash-msg-body__icon {
            display: flex;
            justify-content: center;
            max-width: 20%;
            align-items: center;
            padding: 10px;
            background-color: #fff;
            overflow: hidden;

            & img {
                width: 80%;
                height: auto;
            }
        }

        & ._vue-flash-msg-body__content {
            padding-left: 20px;
        }

        &._vue-flash-msg-body_default {
            color: #000;
        }

        &._vue-flash-msg-body_success {

            border: 1px solid var(--dark-green);
            background-color: rgba(var(--dark-green-rgb), 0.68);
            &:hover {
                background-color: rgba(var(--dark-green-rgb), 1);
            }
            & ._vue-flash-msg-body__content {
                border-left: 5px solid var(--dark-green);
            }
        }


        &._vue-flash-msg-body_info {
            border: 1px solid var(--dark-blue);
            background-color: rgba(var(--dark-blue-rgb), 0.68);
            &:hover {
                background-color: rgba(var(--dark-blue-rgb), 1);
            }
            & ._vue-flash-msg-body__content {
                border-left: 5px solid var(--dark-blue);
            }
        }


        &._vue-flash-msg-body_error{
            border: 1px solid var(--red);
            background-color: rgba(var(--red-rgb), 0.68);
            &:hover {
                background-color: rgba(var(--red-rgb), 1);
            }
            & ._vue-flash-msg-body__content {
                border-left: 5px solid var(--red);
            }
        }


        &._vue-flash-msg-body_warning {
            border: 1px solid var(--orange);
            background-color: rgba(var(--orange-rgb), 0.68);
            &:hover {
                background-color: rgba(var(--orange-rgb), 1);
            }
            & ._vue-flash-msg-body__content {
                border-left: 5px solid var(--orange);
            }
        }
    }

    /* Small Monitors */
    @media (1024px <= width <= 1200px) {
        ._vue-flash-msg-body {
            width: 100%;
            & ._vue-flash-msg-body__content {
                padding: 15px;
            }
        }
    }

    /* Mobile devices */
    @media (320px <= width < 1024px) {
        ._vue-flash-msg-body {
            font-size: .9em;
            width: 100%;
            right: 5%;

            & ._vue-flash-msg-body__content {
                padding: 10px;
            }
        }
    }


</style>
