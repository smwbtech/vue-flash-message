<template>
	<div id="app">
		<!-- Navigation -->
		<AppHeader />
		<!-- content section -->
		<AppContent />
		<!-- footer -->

		<footer></footer>

		<!-- footer end -->
	</div>
</template>

<script>
import AppHeader from '@/demo/AppHeader.vue';
import AppContent from '@/demo/AppContent.vue';
export default {
	name: 'app',

	components: {
		AppHeader,
		AppContent
	},

	data() {
		return {
			text:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum, ligula ac accumsan lobortis, nulla ante pharetra magna, sed sagittis dui metus sit amet lorem. ',
			callbackText: '',
			customMessageIcon: `${require('@/assets/img/poop.svg')}`,
			succesIcon: `${require('@/assets/img/success.svg')}`,
			warningIcon: `${require('@/assets/img/light-bulb.svg')}`,
			errorIcon: `${require('@/assets/img/warning.svg')}`,
			infoIcon: `${require('@/assets/img/information.svg')}`,
			doveIcon: `${require('@/assets/img/dove.svg')}`,
			sounds: {
				message: `${require('@/assets/sounds/message.mp3')}`,
				delete: `${require('@/assets/sounds/delete.mp3')}`
			},
			userData: {
				position: 'right bottom',
				strategy: 'single',
				title: '',
				message: '',
				icon: '',
				time: 8000
			}
		};
	},

	methods: {
		showText() {
			let sound = new Audio(this.sounds.message);
			sound.play();
			this.callbackText = 'Hello from callback! FlashMessage is appear';
		},
		clearText() {
			let sound = new Audio(this.sounds.delete);
			sound.play();
			this.callbackText =
				'My time has passed! I will disappear in 3 second...';
			setTimeout(() => (this.callbackText = ''), 3000);
		},
		showUserMessage() {
			let { title, message, icon, time } = this.userData;
			this.flashMessage.show({ title, message, icon, time });
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
