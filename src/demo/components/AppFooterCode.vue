<template lang="html">
	<transition name="assets-apper" mode="out-in">
		<div v-show="isActive" class="code">
			<div class="code-item code-item_template">
				<h3 class="code-item__title">CODE EXAMPLE</h3>
				<vue-scroll>
					<pre class="code-item__field" v-highlightjs="sourcecode">
                        <code class="html">
                        </code>
                    </pre>
				</vue-scroll>
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
			return this.$store.getters['flashMessage/standartCodeExample'];
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
            text-align: left;
            font-family: mrs-eaves-roman-lining, sans-serif;
            font-weight: 100;
            font-size: 1.2em;
        }

        & .code-item__field {
            max-width: 100%;
            max-height: 55vh;
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

.hljs, .hljs-subst {
    color: var(--app-blue);
}

/* Transition */

.assets-apper-enter,
.assets-apper-leave-to {
    opacity: 0;
}

.assets-apper-enter-active {
    transition: opacity .4s ease-out;
}

.assets-apper-leave-active {
    transition: opacity .3s ease-in;
}
</style>
