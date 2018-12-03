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
}
</script>

<style lang="css" scoped>
</style>
