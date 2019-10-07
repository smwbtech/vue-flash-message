<template lang="html">
	<div class="custom-component">
		<h2>Meet vue number input</h2>
		<p>
			This is another component I'm working on,
			<a href="https://smwbtech.github.io/vue-number-input/"
				>vue-number-input</a
			>
		</p>
		<VueNumberInput v-model="value" />
	</div>
</template>

<script>
import VueNumberInput from '@smartweb/vue-number-input';
export default {
	components: {
		VueNumberInput
	},

	data() {
		return {
			value: 0
		};
	}
};
</script>

<style lang="css" scoped></style>
