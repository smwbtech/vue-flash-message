<template>
	<div id="app">
		<!-- Navigation -->
		<AppHeader />
		<!-- content section -->
		<AppContent />
		<!-- footer -->
		<AppFooter />

		<FlashMessage :position="currentPosition"></FlashMessage>
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
		currentPosition() {
			return this.$store.getters['flashMessage/currentPosition'];
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
