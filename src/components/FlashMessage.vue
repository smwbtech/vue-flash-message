<template lang="html">

        <div
            :class="[classObj, blockClass]"
            @click="clickHandler">
                <div v-if="icon" :class="['_vue-flash-msg-body__icon', iconClass]">
                    <img :src="icon" alt="">
                </div>
                <div :class="['_vue-flash-msg-body__content', contentClass]">
                    <h3>{{ getTitle }}</h3>
                    <p>{{ message }}</p>
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
        border-radius: 5px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        color: #fff;
        text-align: left;
        overflow: hidden;
        cursor: pointer;
        transition: all .3s ease-in;

        &._vue-flash-msg-body_unclickabe {
            cursor: auto;
        }

        & ._vue-flash-msg-body__icon {
            display: flex;
            width: 20%;
            min-width: 20%;
            min-height: 100%;
            padding: 0px 10px;
            background-color: #fff;

            & img {
                display: block;
                width: 90%;
                margin: 0 auto;
            }
        }

        & ._vue-flash-msg-body__content {
            padding-left: 20px;
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
