export function $_vueFlashMessage_setDimensions_fb({ height, id, img }) {
	this.messages.value.length > 0
		? (this.currentHeight.value += height)
		: (this.currentHeight.value = 0);
	// If we decreasing height
	if (height < 0 && typeof id === 'number') {
		/* istanbul ignore next */
		setTimeout(() => {
			this.$emit('changePosition', {
				height: Math.abs(height),
				id
			});
		}, 500);
	} else {
		this.$emit('changePosition', { height, id, img });
	}
}

export function show_fb(data, callbacks = {}) {
	//TODO: this is for versions compability
	const strategy = this.strategy.value;
	//TODO: this is for versions compability
	const messagesLength = this.messages.value.length;
	let message = {
		id: this.nextMessageId.value++, //TODO: this is for versions compability
		time: data.time || this._config.time, //TODO: this is for versions compability
		status: 'default',
		message: '',
		icon: '',
		clickable: true
	};
	message = Object.assign(message, data, callbacks);
	// If some message is showing
	// clear messages array
	// clear timeout and set new one
	if (strategy === 'single' && messagesLength > 0) {
		//TODO: this is for versions compability
		clearTimeout(this.timeoutId.value);
		this.messages.value = [];
		/* istanbul ignore next */
		this.timeoutId.value = setTimeout(() => {
			this.messages.length > 0 ? (this.messages.value = []) : false;
			this.messages.value.push(message);
		}, 600);
	} else {
		this.messages.value.push(message);
	}

	return message.id;
}

export function setStrategy_fb(strategy) {
	if (/^(single)|(multiple)$/i.test(strategy)) {
		this.strategy.value = strategy;
		return true;
	}
	return false;
}

export function deleteMessage_fb(id) {
	this.messages.value = this.messages.value.filter(v => v.id !== id);
}
