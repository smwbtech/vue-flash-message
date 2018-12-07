<template lang="html">

        <div
            :style="flashMessageStyle"
            :class="classObj"
            @click="clickHandler">
                <div v-if="icon" class="icon" :style="iconStyle" :image>
                </div>
                <div class="content" :style="contentStyle">
                    <h3 :style="titleStyle">{{ getTitle }}</h3>
                    <p :style="textStyle">{{ message }}</p>
                </div>
        </div>

</template>

<script>
export default {

}
</script>

<style lang="css" scoped>

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

        &.unclickable {
            cursor: auto;
        }

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

            }
        }
    }

    /* Small Monitors */
    @media (1024px <= width <= 1200px) {
        ._vue-flash-msg-body {
            max-width: 100%;
            width:50%;
            max-width: 50%;
            & .content {
                padding: 15px;
            }
        }
    }

    /* Mobile devices */
    @media (320px <= width < 1024px) {
        ._vue-flash-msg-body {
            font-size: .9em;
            width: 90%;
            max-width: 90%;
            right: 5%;

            & .content {
                padding: 10px;
            }
        }
    }


</style>
