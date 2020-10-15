<template>
	<div id="app">
		<!-- Navigation -->
		<AppHeader />
		<!-- content section -->
		<AppContent />
		<!-- footer -->
		<AppFooter />

		<FlashMessage :position="position"/>
		<FlashMessage position="left top" group="custom-position" transition-name="custom-transition"/>
	</div>
</template>

<script>
import AppHeader from '@/demo/components/AppHeader.vue';
import AppContent from '@/demo/components/AppContent.vue';
import AppFooter from '@/demo/components/AppFooter.vue';
export default {
	name: 'app',
	components: {
		AppHeader,
		AppContent,
		AppFooter
	},
	computed: {
		position() {
			return this.$store.getters['flashMessage/position'];
		}
	}
};
</script>

<style>
#app {
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: space-between;
	min-width: 100vw;
	min-height: 100vh;
	background: #fff;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}
</style>