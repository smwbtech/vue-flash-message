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
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxnPjxwYXRoIGZpbGw9IiMwMTk0N0EiIGQ9Ik00NjguOTA3LDIxNC42MDRjLTExLjQyMywwLTIwLjY4Myw5LjI2LTIwLjY4MywyMC42ODN2MjAuODMxYy0wLjAzLDU0LjMzNy0yMS4yMjEsMTA1LjQxMS01OS42NjYsMTQzLjgxMmMtMzguNDE2LDM4LjM3Mi04OS40NjgsNTkuNS0xNDMuNzYyLDU5LjVjLTAuMDQsMC0wLjA3OSwwLTAuMTE5LDBDMTMyLjUwNiw0NTkuMzY1LDQxLjMsMzY4LjA1Niw0MS4zNjQsMjU1Ljg4M2MwLjAzMS01NC4zMzcsMjEuMjIxLTEwNS40MTEsNTkuNjY3LTE0My44MTNjMzguNDE3LTM4LjM3Miw4OS40NjgtNTkuNSwxNDMuNzYxLTU5LjVjMC4wNCwwLDAuMDgsMCwwLjEyLDBjMjguNjcyLDAuMDE3LDU2LjQ5LDUuOTQyLDgyLjY4LDE3LjYxMWMxMC40MzgsNC42NSwyMi42NTktMC4wNDEsMjcuMzExLTEwLjQ3NGM0LjY0Ni0xMC40MzQtMC4wNDEtMjIuNjU5LTEwLjQ3Ni0yNy4zMWMtMzEuNTE2LTE0LjA0My02NC45ODctMjEuMTczLTk5LjQ5MS0yMS4xOTFjLTAuMDUzLDAtMC4wOTMsMC0wLjE0NSwwYy02NS4zMjksMC0xMjYuNzY3LDI1LjQyOC0xNzIuOTkzLDcxLjZDMjUuNTM2LDEyOS4wMTQsMC4wMzgsMTkwLjQ3MywwLDI1NS44NjFjLTAuMDM3LDY1LjM4NiwyNS4zOSwxMjYuODc1LDcxLjYsMTczLjEzNmM0Ni4yMSw0Ni4yNjMsMTA3LjY2OCw3MS43NjEsMTczLjA1NSw3MS43OTljMC4wNTEsMCwwLjA5MiwwLDAuMTQ0LDBjNjUuMzI5LDAsMTI2Ljc2OC0yNS40MjgsMTcyLjk5My03MS42MDFjNDYuMjYzLTQ2LjIwOSw3MS43NjEtMTA3LjY2OCw3MS43OTktMTczLjA2NXYtMjAuODQyQzQ4OS41OSwyMjMuODY0LDQ4MC4zMywyMTQuNjA0LDQ2OC45MDcsMjE0LjYwNHoiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGZpbGw9IiMwMTk0N0EiIGQ9Ik01MDUuOTQyLDM5LjgwM2MtOC4wNzctOC4wNzYtMjEuMTczLTguMDc2LTI5LjI0OSwwTDI0NC43OTQsMjcxLjcwMWwtNTIuNjA4LTUyLjYwOWMtOC4wNzYtOC4wNzctMjEuMTcyLTguMDc3LTI5LjI0OCwwYy04LjA3Nyw4LjA3Ny04LjA3NywyMS4xNzIsMCwyOS4yNDlsNjcuMjMzLDY3LjIzM2M0LjAzOCw0LjAzOSw5LjMzMiw2LjA1OSwxNC42MjUsNi4wNTlzMTAuNTg2LTIuMDIsMTQuNjI1LTYuMDU5TDUwNS45NDIsNjkuMDUyQzUxNC4wMTksNjAuOTc1LDUxNC4wMTksNDcuODgsNTA1Ljk0MiwzOS44MDN6Ii8+PC9nPjwvZz48L3N2Zz4=);
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
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQzNy42IDQzNy42IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MzcuNiA0MzcuNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGc+PGc+PGc+PHBhdGggZD0iTTE5NCwxNDIuOGMwLjgsMS42LDEuNiwzLjIsMi40LDQuNGMwLjgsMS4yLDIsMi40LDIuOCwzLjZjMS4yLDEuMiwyLjQsMi40LDQsMy42YzEuMiwwLjgsMi44LDIsNC44LDIuNCAgICAgYzEuNiwwLjgsMy4yLDEuMiw1LjIsMS42YzIsMC40LDMuNiwwLjQsNS4yLDAuNGMxLjYsMCwzLjYsMCw1LjItMC40YzEuNi0wLjQsMy4yLTAuOCw0LjQtMS42aDAuNGMxLjYtMC44LDMuMi0xLjYsNC44LTIuOCAgICAgYzEuMi0wLjgsMi40LTIsMy42LTMuMmwwLjQtMC40YzEuMi0xLjIsMi0yLjQsMi44LTMuNnMxLjYtMi40LDItNGMwLTAuNCwwLTAuNCwwLjQtMC44YzAuOC0xLjYsMS4yLTMuNiwxLjYtNS4yICAgICBjMC40LTEuNiwwLjQtMy42LDAuNC01LjJzMC0zLjYtMC40LTUuMmMtMC40LTEuNi0wLjgtMy4yLTEuNi01LjJjLTEuMi0yLjgtMi44LTUuMi00LjgtNy4yYy0wLjQtMC40LTAuNC0wLjQtMC44LTAuOCAgICAgYy0xLjItMS4yLTIuNC0yLTQtMy4yYy0xLjYtMC44LTIuOC0xLjYtNC40LTIuNGMtMS42LTAuOC0zLjItMS4yLTQuOC0xLjZjLTItMC40LTMuNi0wLjQtNS4yLTAuNGMtMS42LDAtMy42LDAtNS4yLDAuNCAgICAgYy0xLjYsMC40LTMuMiwwLjgtNC44LDEuNkgyMDhjLTEuNiwwLjgtMy4yLDEuNi00LjQsMi40Yy0xLjYsMS4yLTIuOCwyLTQsMy4yYy0xLjIsMS4yLTIuNCwyLjQtMy4yLDMuNiAgICAgYy0wLjgsMS4yLTEuNiwyLjgtMi40LDQuNGMtMC44LDEuNi0xLjIsMy4yLTEuNiw0LjhjLTAuNCwyLTAuNCwzLjYtMC40LDUuMmMwLDEuNiwwLDMuNiwwLjQsNS4yICAgICBDMTkyLjgsMTM5LjYsMTkzLjYsMTQxLjIsMTk0LDE0Mi44eiIgZmlsbD0iIzEwODdjMiIvPjxwYXRoIGQ9Ik0yNDkuNiwyODkuMmgtOS4ydi05OGMwLTUuNi00LjQtMTAuNC0xMC40LTEwLjRoLTQyYy01LjYsMC0xMC40LDQuNC0xMC40LDEwLjR2MjEuNmMwLDUuNiw0LjQsMTAuNCwxMC40LDEwLjRoOC40djY2LjQgICAgIEgxODhjLTUuNiwwLTEwLjQsNC40LTEwLjQsMTAuNHYyMS42YzAsNS42LDQuNCwxMC40LDEwLjQsMTAuNGg2MS42YzUuNiwwLDEwLjQtNC40LDEwLjQtMTAuNFYzMDAgICAgIEMyNjAsMjk0LDI1NS4yLDI4OS4yLDI0OS42LDI4OS4yeiIgZmlsbD0iIzEwODdjMiIvPjxwYXRoIGQ9Ik0yMTguOCwwQzk4LDAsMCw5OCwwLDIxOC44czk4LDIxOC44LDIxOC44LDIxOC44czIxOC44LTk4LDIxOC44LTIxOC44UzMzOS42LDAsMjE4LjgsMHogTTIxOC44LDQwOC44ICAgICBjLTEwNC44LDAtMTkwLTg1LjItMTkwLTE5MHM4NS4yLTE5MCwxOTAtMTkwczE5MCw4NS4yLDE5MCwxOTBTMzIzLjYsNDA4LjgsMjE4LjgsNDA4Ljh6IiBmaWxsPSIjMTA4N2MyIi8+PC9nPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);
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
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PGc+PHBhdGggZmlsbD0iI0YxMjIyMiIgZD0iTTI1NS45OTMsMzUwLjg4M2MtMTQuMzEzLDAtMjYuMzEzLDExLjk5OC0yNi4zMTMsMjYuMzEzYzAsMTQuMzEzLDExLjk5OSwyNi4zMTIsMjYuMzEzLDI2LjMxMmMxMy43ODgsMCwyNi4zMTMtMTEuOTk4LDI1LjY4MS0yNS42ODFDMjgyLjMwNSwzNjIuNzc2LDI3MC40MTIsMzUwLjg4MywyNTUuOTkzLDM1MC44ODN6Ii8+PHBhdGggZmlsbD0iI0YxMjIyMiIgZD0iTTQ5OS41NDEsNDQ0LjEzNGMxNi41MjQtMjguNTIyLDE2LjYzLTYyLjUxOSwwLjIxMS05MC45MzZMMzM0LjkzLDY3Ljc2MmMtMTYuMzEzLTI4LjczMy00NS43ODMtNDUuNzg0LTc4LjgzMi00NS43ODRjLTMzLjA0OCwwLTYyLjUxOSwxNy4xNTYtNzguODMyLDQ1LjY3OUwxMi4yMzUsMzUzLjQwOGMtMTYuNDE5LDI4LjczMy0xNi4zMTMsNjIuOTM5LDAuMzE2LDkxLjQ2MmMxNi40MTgsMjguMjA3LDQ1Ljc4Myw0NS4xNTIsNzguNjIxLDQ1LjE1MmgzMjkuMjIxQzQ1My4zMzcsNDkwLjAyMyw0ODIuOTEyLDQ3Mi44NjcsNDk5LjU0MSw0NDQuMTM0eiBNNDYzLjc1Niw0MjMuNTA1Yy05LjE1NiwxNS43ODctMjUuMzY1LDI1LjE1NC00My40NjgsMjUuMTU0SDkxLjA2N2MtMTcuODkzLDAtMzMuOTk1LTkuMTU2LTQyLjk0MS0yNC42MjhjLTkuMDUyLTE1LjY4My05LjE1Ny0zNC40MTctMC4xMDUtNTAuMjA0TDIxMy4wNTIsODguMThjOC45NDYtMTUuNjgyLDI0Ljk0NC0yNC45NDQsNDMuMDQ3LTI0Ljk0NGMxNy45OTgsMCwzNC4xMDEsOS4zNjcsNDMuMDQ3LDI1LjA1bDE2NC45MjcsMjg1LjY0NkM0NzIuOTEzLDM4OS4yOTksNDcyLjgwNyw0MDcuODIzLDQ2My43NTYsNDIzLjUwNXoiLz48cGF0aCBmaWxsPSIjRjEyMjIyIiBkPSJNMjQ5LjQ2OCwxNjYuMTdjLTEyLjUyNCwzLjU3OC0yMC4zMTMsMTQuOTQ1LTIwLjMxMywyOC43MzNjMC42MzIsOC4zMTQsMS4xNTgsMTYuNzM0LDEuNzksMjUuMDQ5YzEuNzg5LDMxLjY4MSwzLjU3OCw2Mi43MjksNS4zNjcsOTQuNDA5YzAuNjMyLDEwLjczNSw4Ljk0NiwxOC41MjMsMTkuNjgyLDE4LjUyM3MxOS4xNTUtOC4zMTQsMTkuNjgyLTE5LjE1NWMwLTYuNTI1LDAtMTIuNTI0LDAuNjMyLTE5LjE1NWMxLjE1Ny0yMC4zMTMsMi40MjEtNDAuNjI2LDMuNTc4LTYwLjkzOWMwLjYzMi0xMy4xNTYsMS43ODktMjYuMzEzLDIuNDIxLTM5LjQ2OWMwLTQuNzM2LTAuNjMyLTguOTQ2LTIuNDIxLTEzLjE1NkMyNzQuNTE3LDE2OS4yMjIsMjYxLjk5MiwxNjMuMjIzLDI0OS40NjgsMTY2LjE3eiIvPjwvZz48L2c+PC9zdmc+);
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
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i0KHQu9C+0LlfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGZpbGw9IiNGMUI5MjIiIGQ9Ik0zNjAuNzYsMjg5LjI2YzE3LjQyNy0yMi45NzksMjYuNjM3LTUwLjQwNiwyNi42MzctNzkuMzE3YzAtMzUuNDQ5LTEzLjkwMi02OC42NzktMzkuMTQ3LTkzLjU3Yy0yNS4yNC0yNC44ODYtNTguNjk0LTM4LjMyNS05NC4xNDctMzcuODEzYy0zNC4zNTYsMC40ODYtNjYuNzI2LDE0LjI3Mi05MS4xNDQsMzguODE4cy0zOC4wMzYsNTYuOTg3LTM4LjM0OSw5MS4zNDhjLTAuMjY4LDI5LjQ1Nyw4Ljk5Nyw1Ny4zNzcsMjYuNzkxLDgwLjc0NGMyOC44ODgsMzcuOTM0LDQ0Ljc5OCw4NC4zOTksNDQuNzk4LDEzMC44Mzl2NTAuODEzYzAsMjIuNTM5LDE4LjMzNyw0MC44NzYsNDAuODc2LDQwLjg3NmgzOC4wMjFjMjIuNTM5LDAsNDAuODc2LTE4LjMzOCw0MC44NzYtNDAuODc2di01MC44MTFDMzE1Ljk3MywzNzMuMzYsMzMxLjM0OCwzMjguMDQxLDM2MC43NiwyODkuMjZ6IE0xNjQuODAzLDI3OS4yNjVjLTE1LjUwOC0yMC4zNjQtMjMuNTgxLTQ0LjcwMy0yMy4zNDktNzAuMzg1YzAuNTYtNjEuNjk4LDUxLjE5OS0xMTIuNjAzLDExMi44ODUtMTEzLjQ3NWMzMC45NDQtMC40MTYsNjAuMDc4LDExLjI3LDgyLjA4LDMyLjk2NWMyMi4wMSwyMS42OTksMzQuMTMsNTAuNjcsMzQuMTMsODEuNTczYzAsMjUuMjA0LTguMDI2LDQ5LjExMS0yMy4yMTMsNjkuMTM4Yy0zMC45ODksNDAuODY0LTQ3LjY3Niw4OC41MzctNDguMzU4LDEzOC4wNjNIMjEzLjAyQzIxMi4zMTYsMzY4LjA5OSwxOTUuMjU3LDMxOS4yNTMsMTY0LjgwMywyNzkuMjY1eiBNMjEzLjA0NSw0NjUuNDEzdi02LjgxOWw4Ni4wODIsOS44NjJ2Mi42NjZjMCwxLjQwNC0wLjE0NiwyLjc3MS0wLjM3OCw0LjEwOUwyMTMuMDQ1LDQ2NS40MTN6IE0yMTMuMDQ1LDQ0MS42Mzh2LTcuNjQ3aDg2LjA4MnYxNy41MDlMMjEzLjA0NSw0NDEuNjM4eiBNMjM3LjA3NCw0OTUuMTU0Yy05LjA0OSwwLTE2LjkzOC01LjAzMi0yMS4wMzctMTIuNDQxbDcyLjUxNiw4LjMwOGMtMy44NDIsMi42MDctOC40NzQsNC4xMzItMTMuNDU2LDQuMTMyaC0zOC4wMjJWNDk1LjE1NHoiLz48cGF0aCBmaWxsPSIjRjFCOTIyIiBkPSJNMTcyLjcwNiwyMjIuNjEzYy0wLjY1Ny00LjQwNy0wLjk3MS04LjkzNy0wLjkyOS0xMy40NThjMC4wNDMtNC42NTEtMy42OTQtOC40NTctOC4zNDYtOC40OTljLTQuNjItMC4wNDEtOC40NTcsMy42OTMtOC41LDguMzQ2Yy0wLjA0OSw1LjQwMiwwLjMyNSwxMC44MTcsMS4xMTIsMTYuMDk4YzAuNjIzLDQuMTgsNC4yMTcsNy4xODIsOC4zMjEsNy4xODJjMC40MTMsMCwwLjgzMi0wLjAzLDEuMjUzLTAuMDkzQzE3MC4yMTksMjMxLjUsMTczLjM5MiwyMjcuMjE0LDE3Mi43MDYsMjIyLjYxM0wxNzIuNzA2LDIyMi42MTN6Ii8+PHBhdGggZmlsbD0iI0YxQjkyMiIgZD0iTTIyMi4yNzYsMzUwLjU1OWMwLjg3MSwwLDEuNzU5LTAuMTM4LDIuNjMzLTAuNDI0YzQuNDE5LTEuNDUzLDYuODIzLTYuMjE0LDUuMzctMTAuNjMyYy05LjMzNS0yOC4zODktMjMuMjQ4LTU0LjgzOC00MS4zNTMtNzguNjFjLTIuOTkxLTMuOTMtNS42NDQtOC4xMTUtNy44OC0xMi40NDNjLTIuMTM2LTQuMTMzLTcuMjE4LTUuNzUtMTEuMzUxLTMuNjEzYy00LjEzMiwyLjEzNi01Ljc1LDcuMjE4LTMuNjE0LDExLjM1MWMyLjY4NSw1LjE5MSw1Ljg2LDEwLjIwOCw5LjQ0MywxNC45MTNjMTYuOTY1LDIyLjI3NywzMC4wMDMsNDcuMDYyLDM4Ljc1MSw3My42NjVDMjE1LjQ0MiwzNDguMzEsMjE4LjczNiwzNTAuNTU5LDIyMi4yNzYsMzUwLjU1OUwyMjIuMjc2LDM1MC41NTl6Ii8+PHBhdGggZmlsbD0iI0YxQjkyMiIgZD0iTTM0NC41MDcsMjM4Ljc4NWMtNC4yNzItMS44NDEtOS4yMjksMC4xMzItMTEuMDY4LDQuNDA0Yy0yLjY2OCw2LjE5Ny02LjEyMiwxMi4xMDctMTAuMjY0LDE3LjU2OGMtMi44MTIsMy43MDYtMi4wODUsOC45OSwxLjYyMSwxMS44MDJjMS41MjIsMS4xNTQsMy4zMTEsMS43MTEsNS4wODQsMS43MTFjMi41NDYsMCw1LjA2Mi0xLjE0OCw2LjcxOC0zLjMzNGM0Ljk2My02LjU0NCw5LjEwNS0xMy42MzgsMTIuMzEzLTIxLjA4M0MzNTAuNzUxLDI0NS41ODEsMzQ4Ljc4LDI0MC42MjUsMzQ0LjUwNywyMzguNzg1TDM0NC41MDcsMjM4Ljc4NXoiLz48cGF0aCBmaWxsPSIjRjFCOTIyIiBkPSJNMjU2LjAwMSwxMjUuNzE4YzQ2LjQ0MiwwLDg0LjIyNiwzNy43ODQsODQuMjI2LDg0LjIyN2MwLDIuNjQxLTAuMTIxLDUuMzAxLTAuMzYsNy45MDdjLTAuNDI1LDQuNjMzLDIuOTg1LDguNzMyLDcuNjE4LDkuMTU4YzAuMjYyLDAuMDIzLDAuNTIxLDAuMDM2LDAuNzc5LDAuMDM2YzQuMzA1LDAsNy45NzgtMy4yODMsOC4zNzgtNy42NTRjMC4yODUtMy4xMTYsMC40MzItNi4yOTUsMC40MzItOS40NDdjMC01NS43MzEtNDUuMzQxLTEwMS4wNzMtMTAxLjA3Mi0xMDEuMDczYy00LjY1MiwwLTguNDI0LDMuNzcxLTguNDI0LDguNDIzQzI0Ny41NzcsMTIxLjk0NywyNTEuMzQ4LDEyNS43MTgsMjU2LjAwMSwxMjUuNzE4TDI1Ni4wMDEsMTI1LjcxOHoiLz48cGF0aCBmaWxsPSIjRjFCOTIyIiBkPSJNMjU2LjAwMSw2NC4wMTdjNC42NTEsMCw4LjQyMy0zLjc3MSw4LjQyMy04LjQyNFY4LjQyM2MwLTQuNjUxLTMuNzcxLTguNDIzLTguNDIzLTguNDIzYy00LjY1MiwwLTguNDI0LDMuNzcxLTguNDI0LDguNDIzdjQ3LjE3QzI0Ny41NzcsNjAuMjQ1LDI1MS4zNDgsNjQuMDE3LDI1Ni4wMDEsNjQuMDE3eiIvPjxwYXRoIGZpbGw9IiNGMUI5MjIiIGQ9Ik0xNzAuNzg0LDgwLjY2MWMxLjU2MiwyLjcwMyw0LjM5Miw0LjIxNCw3LjMwMyw0LjIxNGMxLjQyOSwwLDIuODc3LTAuMzY0LDQuMjA0LTEuMTNjNC4wMjgtMi4zMjYsNS40MDktNy40NzgsMy4wODQtMTEuNTA3bC0yMy41NzQtNDAuODM2Yy0yLjMyNy00LjAyOS03LjQ3OC01LjQwOS0xMS41MDYtMy4wODRjLTQuMDI5LDIuMzI2LTUuNDEsNy40NzgtMy4wODQsMTEuNTA3TDE3MC43ODQsODAuNjYxeiIvPjxwYXRoIGZpbGw9IiNGMUI5MjIiIGQ9Ik00MzYuMDEsMzA1LjYxM2wtNDAuODM3LTIzLjU3NGMtNC4wMjktMi4zMjctOS4xODEtMC45NDUtMTEuNTA2LDMuMDg0Yy0yLjMyNiw0LjAyOC0wLjk0NSw5LjE4MSwzLjA4NCwxMS41MDdsNDAuODM2LDIzLjU3M2MxLjMyNywwLjc2NiwyLjc3NCwxLjEzLDQuMjA0LDEuMTNjMi45MTEsMCw1Ljc0Mi0xLjUxMiw3LjMwMy00LjIxNEM0NDEuNDIsMzEzLjA5LDQ0MC4wMzksMzA3LjkzOCw0MzYuMDEsMzA1LjYxM0w0MzYuMDEsMzA1LjYxM3oiLz48cGF0aCBmaWxsPSIjRjFCOTIyIiBkPSJNNzUuOTksMTE3LjIxM2w0MC44MzYsMjMuNTc0YzEuMzI2LDAuNzY2LDIuNzc0LDEuMTMsNC4yMDQsMS4xM2MyLjkxMSwwLDUuNzQyLTEuNTEyLDcuMzAyLTQuMjE0YzIuMzI2LTQuMDI4LDAuOTQ2LTkuMTgxLTMuMDg0LTExLjUwNmwtNDAuODM2LTIzLjU3NGMtNC4wMjgtMi4zMjctOS4xOC0wLjk0NS0xMS41MDYsMy4wODRDNzAuNTgsMTA5LjczNiw3MS45NjEsMTE0Ljg4Niw3NS45OSwxMTcuMjEzeiIvPjxwYXRoIGZpbGw9IiNGMUI5MjIiIGQ9Ik00NTguOTg5LDIwMi45OWgtNDcuMTcxYy00LjY1MSwwLTguNDIzLDMuNzcxLTguNDIzLDguNDIzczMuNzcxLDguNDIzLDguNDIzLDguNDIzaDQ3LjE3MWM0LjY1MSwwLDguNDIzLTMuNzcxLDguNDIzLTguNDIzUzQ2My42NDEsMjAyLjk5LDQ1OC45ODksMjAyLjk5eiIvPjxwYXRoIGZpbGw9IiNGMUI5MjIiIGQ9Ik0xMDguNjA0LDIxMS40MTJjMC00LjY1Mi0zLjc3MS04LjQyMy04LjQyNC04LjQyM0g1My4wMWMtNC42NTIsMC04LjQyNCwzLjc3MS04LjQyNCw4LjQyM3MzLjc3MSw4LjQyMyw4LjQyNCw4LjQyM2g0Ny4xN0MxMDQuODM0LDIxOS44MzUsMTA4LjYwNCwyMTYuMDY1LDEwOC42MDQsMjExLjQxMnoiLz48cGF0aCBmaWxsPSIjRjFCOTIyIiBkPSJNMzkwLjk3LDE0MS45MTdjMS40MjksMCwyLjg3Ny0wLjM2NCw0LjIwMy0xLjEzbDQwLjgzNy0yMy41NzRjNC4wMjgtMi4zMjUsNS40MDktNy40NzgsMy4wODQtMTEuNTA2Yy0yLjMyNi00LjAyOC03LjQ3OS01LjQxLTExLjUwNy0zLjA4NGwtNDAuODM2LDIzLjU3NGMtNC4wMjgsMi4zMjUtNS40MSw3LjQ3OC0zLjA4NCwxMS41MDZDMzg1LjIyOCwxNDAuNDA2LDM4OC4wNiwxNDEuOTE3LDM5MC45NywxNDEuOTE3TDM5MC45NywxNDEuOTE3eiIvPjxwYXRoIGZpbGw9IiNGMUI5MjIiIGQ9Ik0xMTYuODI2LDI4Mi4wMzhMNzUuOTksMzA1LjYxM2MtNC4wMjgsMi4zMjUtNS40MSw3LjQ3OC0zLjA4NCwxMS41MDZjMS41NiwyLjcwMiw0LjM5Miw0LjIxNCw3LjMwMyw0LjIxNGMxLjQyOSwwLDIuODc3LTAuMzY0LDQuMjAzLTEuMTNsNDAuODM2LTIzLjU3M2M0LjAyOS0yLjMyNiw1LjQxLTcuNDc5LDMuMDg0LTExLjUwN0MxMjYuMDA4LDI4MS4wOTMsMTIwLjg1MiwyNzkuNzEyLDExNi44MjYsMjgyLjAzOHoiLz48cGF0aCBmaWxsPSIjRjFCOTIyIiBkPSJNMzI5LjcxLDgzLjc0NWMxLjMyNiwwLjc2NiwyLjc3NCwxLjEzLDQuMjA0LDEuMTNjMi45MTEsMCw1Ljc0Mi0xLjUxMiw3LjMwMi00LjIxNGwyMy41NzQtNDAuODM2YzIuMzI2LTQuMDI5LDAuOTQ0LTkuMTgxLTMuMDg0LTExLjUwN2MtNC4wMjctMi4zMjUtOS4xODEtMC45NDUtMTEuNTA2LDMuMDg0bC0yMy41NzQsNDAuODM2QzMyNC4zLDc2LjI2OCwzMjUuNjgxLDgxLjQxOSwzMjkuNzEsODMuNzQ1TDMyOS43MSw4My43NDV6Ii8+PC9nPjwvc3ZnPg==);
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
