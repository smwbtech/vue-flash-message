<template lang="html">

    <div v-if="strategy === 'single'">
        <FlashMessage></FlashMessage>
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
