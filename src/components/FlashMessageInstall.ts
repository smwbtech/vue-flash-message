import { App } from 'vue';
import FlashMessagePlugin from './FlashMessagePlugin';
import FlashMessageContainer from './FlashMessageContainer';


function install(app: App) {
	if (install.installed) return;

	install.installed = true;

	// Set up plugin
	const $flashMessage = FlashMessagePlugin;
	app.config.globalProperties.$flashMessage = $flashMessage;

	//  Set up component
	app.component('FlashMessage', FlashMessageContainer);
	// Vue.component('VueMessageBlock', FlashMessage);
}

install.installed = false;

export default install;