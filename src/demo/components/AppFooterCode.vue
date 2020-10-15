<template lang="html">
	<transition name="assets-apper" mode="out-in">
		<div v-show="isActive" class="code">
			<div class="code-item code-item_template">
				<h3 class="code-item__title">CODE EXAMPLE</h3>
					<pre class="code-item__field">
                        <code class="html">
                        </code>
                    </pre>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		isActive: {
			type: Boolean
		}
	},

	computed: {
		sourcecode() {
			const type = this.$store.getters['flashMessage/exampleType'];
			let code;
			switch (type) {
				case 'standart':
					code = this.$store.getters[
						'flashMessage/standartCodeExample'
					];
					break;
				case 'unclickable without icon':
					code = this.$store.getters[
						'flashMessage/unclickableCodeExample'
					];
					break;
				case 'custom position':
					code = this.$store.getters[
						'flashMessage/customPositionCodeExample'
					];
					break;
				case 'custom styles':
					code = this.$store.getters[
						'flashMessage/customStyleCodeExample'
					];
					break;
				case 'custom component':
					code = this.$store.getters[
						'flashMessage/customComponentCodeExample'
					];
					break;
				case 'raw html':
					code = this.$store.getters[
						'flashMessage/rawHtmlCodeExample'
					];
					break;
			}
			return code;
		}
	}
};
</script>

<style lang="css" scoped>
.code {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: calc(var(--column) * 10 + var(--gutter) * 9);
	padding-top: 40px;
	color: var(--app-light-grey);

	& .code-item {
		width: 100%;
		max-height: 80%;
		margin-bottom: 20px;

		& .code-item__title {
			font-family: rift, sans-serif;
			font-weight: 300;
			font-style: normal;
			text-align: left;
			font-size: 1.2em;
		}

		& .code-item__field {
			max-width: 100%;
			max-height: 55vh;
			text-align: left;
		}
	}
}

/* hlsj style */
.html.hljs.xml {
	background-color: var(--app-grey);
	text-align: left;
	padding-right: 20px;
	font-size: 1.3em;
}

.hljs,
.hljs-subst {
	color: var(--app-blue);
}

/* Transition */

.assets-apper-enter,
.assets-apper-leave-to {
	opacity: 0;
}

.assets-apper-enter-active {
	transition: opacity 0.4s ease-out;
}

.assets-apper-leave-active {
	transition: opacity 0.3s ease-in;
}

/* Mobile */

@media (320px <= width < 1024px) {
	.code {
		width: 100%;
	}
}
</style>
