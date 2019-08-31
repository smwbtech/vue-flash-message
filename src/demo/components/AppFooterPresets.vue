<template lang="html">
	<transition name="assets-apper" mode="out-in">
		<div class="presets" v-show="isActive">
			<!-- preset styles -->
			<div class="preset-item preset-item_styles">
				<h3 class="preset-item__title">READY STYLES PRESETS</h3>
				<ul class="preset-list">
					<li
						v-for="item in readyStylesPresets"
						:class="[
							'preset-list-item',
							'preset-list-item_styles',
							`preset-list-item_${item}`
						]"
						@click="showPreset(item)"
					>
						{{ item }}
					</li>
				</ul>
			</div>
			<!-- preset position -->
			<div class="preset-item preset-item_styles">
				<h3 class="preset-item__title">DEFAULT POSITIONS</h3>
				<ul class="preset-list">
					<li
						v-for="item in defaultPositions"
						:class="[
							'preset-list-item',
							item === currentPosition
								? 'preset-list-item_active'
								: ''
						]"
						@click="setPosition(item)"
					>
						{{ item }}
					</li>
				</ul>
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

	data() {
		return {
			readyStylesPresets: ['error', 'warning', 'success', 'info'],
			defaultPositions: [
				'right bottom',
				'right top',
				'left bottom',
				'left top'
			],
			strategy: ['single', 'multiple']
		};
	},

	computed: {
		currentPosition() {
			return this.$store.getters['flashMessage/currentPosition'];
		}
	},

	methods: {
		showPreset(v) {
			this.flashMessage[v]({
				icon: `/${v}.svg`,
				title: `Title for ${v} message`,
				message:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum, ligula ac accumsan lobortis, nulla ante pharetra magna, sed sagittis dui metus sit amet lorem.'
			});
		},

		setPosition(v) {
			this.$store.commit('flashMessage/setPosition', v);
		}
	}
};
</script>

<style lang="css" scoped>

.presets {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: calc(var(--column) * 10 + var(--gutter) * 9);
    padding-top: 40px;
    color: var(--app-light-grey);

    /* presets block */
    & .preset-item {
        width: calc(var(--column) * 5 + var(--gutter) * 4);
        text-align: left;

        & .preset-item__title {
            font-family: mrs-eaves-roman-lining, sans-serif;
            font-weight: 100;
            font-size: 1.2em;
        }

        /* standart list */
        & .preset-list {
            font-family: 'Baron Neue', sans-serif;
            font-size: 1.2em;
            margin: 0;
            padding: 0;

            & .preset-list-item {
                list-style: none;
                margin-bottom: 20px;
                opacity: .6;
                cursor: pointer;
                transition: opacity .2s ease-in;

                &:hover {
                    opacity: 1;
                }

                &.preset-list-item_active {
                    opacity: 1;
                }
            }

        } /* standart list end */

        /* preset styles list */
        &.preset-item_styles {
            & .preset-list {
                & .preset-list-item_styles {
                    padding-left: 40px;
                    position: relative;
                    opacity: 1;

                    &:before {
                        position: absolute;
                        left: 0;
                        content: "";
                        display: block;
                        background-repeat: no-repeat;
                        background-position: center center;
                        background-size: 100%;
                        width: 13px;
                        height: 13px;
                    }

                    &.preset-list-item_error:before {
                        background-image: url('/before_error.svg');
                    }

                    &.preset-list-item_warning:before {
                        background-image: url('/before_warning.svg');
                    }

                    &.preset-list-item_success:before {
                        background-image: url('/before_success.svg');
                    }

                    &.preset-list-item_info:before {
                        background-image: url('/before_info.svg');
                    }
                }
            }
        }/* preset styles list end*/
    } /* presets block end */
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
