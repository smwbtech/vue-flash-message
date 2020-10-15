<template lang="html">
	<div class="custom-component">
		<button
			class="close-btn"
			@click="$flashMessage.remove(messageObj.id)"
		/>
		<h2>Please, enter some number</h2>
		<form action="">

			<input type="text" name="" id="">
		</form>
	</div>
</template>

<script>
export default {
	props: {
		messageObj: {
			type: Object,
			default: () => {}
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
