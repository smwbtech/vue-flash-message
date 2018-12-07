<template lang="html">

        <div
            :style="flashMessageStyle"
            :class="classObj"
            @click="clickHandler">
                <div v-if="icon" class="icon" :style="iconStyle">
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
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4NiA0ODYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4NiA0ODY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPjxnPjxwYXRoIGlkPSJYTUxJRF80OV8iIGQ9Ik0yOTguNCw0MjQuN3YxNC4yYzAsMTEuMy04LjMsMjAuNy0xOS4xLDIyLjNsLTMuNSwxMi45Yy0xLjksNy04LjIsMTEuOS0xNS41LDExLjloLTM0LjcgICBjLTcuMywwLTEzLjYtNC45LTE1LjUtMTEuOWwtMy40LTEyLjljLTEwLjktMS43LTE5LjItMTEtMTkuMi0yMi40di0xNC4yYzAtNy42LDYuMS0xMy43LDEzLjctMTMuN2g4My41ICAgQzI5Mi4zLDQxMSwyOTguNCw0MTcuMSwyOTguNCw0MjQuN3ogTTM2Mi43LDIzMy4zYzAsMzIuMy0xMi44LDYxLjYtMzMuNiw4My4xYy0xNS44LDE2LjQtMjYsMzcuMy0yOS40LDU5LjYgICBjLTEuNSw5LjYtOS44LDE2LjctMTkuNiwxNi43aC03NC4zYy05LjcsMC0xOC4xLTctMTkuNS0xNi42Yy0zLjUtMjIuMy0xMy44LTQzLjUtMjkuNi01OS44Yy0yMC40LTIxLjItMzMuMS01MC0zMy40LTgxLjcgICBjLTAuNy02Ni42LDUyLjMtMTIwLjUsMTE4LjktMTIxQzMwOC43LDExMy4xLDM2Mi43LDE2Ni45LDM2Mi43LDIzMy4zeiBNMjU2LjUsMTYwLjhjMC03LjQtNi0xMy41LTEzLjUtMTMuNSAgIGMtNDcuNiwwLTg2LjQsMzguNy04Ni40LDg2LjRjMCw3LjQsNiwxMy41LDEzLjUsMTMuNWM3LjQsMCwxMy41LTYsMTMuNS0xMy41YzAtMzIuOCwyNi43LTU5LjQsNTkuNC01OS40ICAgQzI1MC41LDE3NC4zLDI1Ni41LDE2OC4zLDI1Ni41LDE2MC44eiBNMjQzLDc0LjNjNy40LDAsMTMuNS02LDEzLjUtMTMuNVYxMy41YzAtNy40LTYtMTMuNS0xMy41LTEzLjVzLTEzLjUsNi0xMy41LDEzLjV2NDcuMyAgIEMyMjkuNSw2OC4zLDIzNS42LDc0LjMsMjQzLDc0LjN6IE04NC4xLDIzMy4yYzAtNy40LTYtMTMuNS0xMy41LTEzLjVIMjMuM2MtNy40LDAtMTMuNSw2LTEzLjUsMTMuNWMwLDcuNCw2LDEzLjUsMTMuNSwxMy41aDQ3LjMgICBDNzguMSwyNDYuNyw4NC4xLDI0MC43LDg0LjEsMjMzLjJ6IE00NjIuNywyMTkuN2gtNDcuM2MtNy40LDAtMTMuNSw2LTEzLjUsMTMuNWMwLDcuNCw2LDEzLjUsMTMuNSwxMy41aDQ3LjMgICBjNy40LDAsMTMuNS02LDEzLjUtMTMuNUM0NzYuMiwyMjUuOCw0NzAuMiwyMTkuNyw0NjIuNywyMTkuN3ogTTExMS42LDM0NS42bC0zMy41LDMzLjVjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xICAgYzIuNiwyLjYsNi4xLDMuOSw5LjUsMy45czYuOS0xLjMsOS41LTMuOWwzMy41LTMzLjVjNS4zLTUuMyw1LjMtMTMuOCwwLTE5LjFDMTI1LjQsMzQwLjMsMTE2LjgsMzQwLjMsMTExLjYsMzQ1LjZ6IE0zNjQuOSwxMjQuOCAgIGMzLjQsMCw2LjktMS4zLDkuNS0zLjlsMzMuNS0zMy41YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xYy01LjMtNS4zLTEzLjgtNS4zLTE5LjEsMGwtMzMuNSwzMy41Yy01LjMsNS4zLTUuMywxMy44LDAsMTkuMSAgIEMzNTgsMTIzLjUsMzYxLjQsMTI0LjgsMzY0LjksMTI0Ljh6IE0xMTEuNiwxMjAuOGMyLjYsMi42LDYuMSwzLjksOS41LDMuOXM2LjktMS4zLDkuNS0zLjljNS4zLTUuMyw1LjMtMTMuOCwwLTE5LjFMOTcuMSw2OC4yICAgYy01LjMtNS4zLTEzLjgtNS4zLTE5LjEsMGMtNS4zLDUuMy01LjMsMTMuOCwwLDE5LjFMMTExLjYsMTIwLjh6IE0zNzQuNCwzNDUuNmMtNS4zLTUuMy0xMy44LTUuMy0xOS4xLDBjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xICAgbDMzLjUsMzMuNWMyLjYsMi42LDYuMSwzLjksOS41LDMuOXM2LjktMS4zLDkuNS0zLjljNS4zLTUuMyw1LjMtMTMuOCwwLTE5LjFMMzc0LjQsMzQ1LjZ6IiBmaWxsPSIjZjE4YjIyIi8+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvc3ZnPg==);
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
