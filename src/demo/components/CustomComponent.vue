<template lang="html">
	<div class="custom-component">
		<button
			class="close-btn"
			@click="flashMessage.deleteMessage(messageId)"
		/>
		<h2>Meet vue number input</h2>
		<p>
			This is another component I'm working on,
			<a
				target="_blank"
				href="https://smwbtech.github.io/vue-number-input/"
				>vue-number-input</a
			>
		</p>
		<VueNumberInput
			v-model="value"
			class="custom-input"
			:inputClass="'custom-input-class'"
		/>
	</div>
</template>

<script>
import VueNumberInput from '@smartweb/vue-number-input';
export default {
	components: {
		VueNumberInput
	},

	props: {
		messageId: {
			type: Number
		}
	},

	data() {
		return {
			value: 0
		};
	}
};
</script>

<style lang="css">
.custom-component {
	position: relative;
	color: #fff;
	background-color: #d35656;
	padding: 10px;

	& a {
		color: #f9d5bb;
	}

	& .close-btn {
		position: absolute;
		right: 10px;
		top: 10px;
		width: 20px;
		height: 20px;
		background-image: url('~@/assets/img/close-button.svg');
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: center center;
		background-color: rgba(0, 0, 0, 0);
		border: none;
		cursor: pointer;
	}

	& .custom-input {
		width: 40%;
		background-color: rgba(255, 255, 255, 0.2);

		& .custom-input-class {
			background-color: rgba(255, 255, 255, 0);
			text-align: center;
		}
	}
}
</style>
