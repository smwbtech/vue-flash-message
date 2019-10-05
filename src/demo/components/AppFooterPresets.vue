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
			<div class="preset-item">
				<h3 class="preset-item__title">DEFAULT POSITIONS</h3>
				<ul class="preset-list">
					<li
						v-for="item in defaultPositions"
						:key="item"
						:class="[
							'preset-list-item',
							item === position ? 'preset-list-item_active' : ''
						]"
						@click="
							$store.commit('flashMessage/setItem', {
								position: item
							})
						"
					>
						{{ item }}
					</li>
				</ul>
			</div>
			<!-- preset strategy -->
			<div class="preset-item preset-item_strategy">
				<h3 class="preset-item__title">STRATEGY</h3>
				<ul class="preset-list">
					<li
						v-for="item in strategyList"
						:key="item"
						:class="[
							'preset-list-item',
							item === strategy ? 'preset-list-item_active' : ''
						]"
						@click="strategyHandler(item)"
					>
						{{ item }}
					</li>
				</ul>
			</div>
			<!-- preset custom messages examples -->
			<div class="preset-item preset-item_examples">
				<h3 class="preset-item__title">EXAMPLES</h3>
				<ul class="preset-list">
					<li
						v-for="item in examples"
						:key="item"
						:class="['preset-list-item', 'preset-list-item_active']"
						@click="customMessagesHandler(item)"
					>
						{{ item }}
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from 'vuex';

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
			strategyList: ['single', 'multiple'],
			examples: [
				'unclickable without icon',
				'custom position',
				'custom styles'
			],
			lorem:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum, ligula ac accumsan lobortis, nulla ante pharetra magna, sed sagittis dui metus sit amet lorem.'
		};
	},

	computed: {
		...mapGetters('flashMessage', ['position', 'strategy'])
	},

	methods: {
		showPreset(v) {
			this.$store.commit('flashMessage/setItem', {
				shorthand: v,
				exampleType: 'standart'
			});
			this.flashMessage[v]({
				icon: `${v}.svg`,
				title: `Title for ${v} message`,
				message: this.lorem
			});
		},

		strategyHandler(strategy) {
			this.flashMessage.setStrategy(strategy);
			this.$store.commit('flashMessage/setItem', { strategy });
		},

		customMessagesHandler(v) {
			switch (v) {
				case 'unclickable without icon':
					this.$store.commit('flashMessage/setItem', {
						exampleType: v
					});
					this.flashMessage.error({
						title: 'Message Without Icon',
						message: this.lorem,
						icon: false,
						clickable: false
					});
					break;
				case 'custom position':
					this.$store.commit('flashMessage/setItem', {
						exampleType: v
					});
					this.flashMessage.show({
						title: 'Custom Position Message',
						message: this.lorem,
						icon: 'custom_position.svg',
						blockClass: 'custom_msg_two',
						position: 'left top',
						x: window.innerWidth / 2,
						y: window.innerHeight / 2
					});
					break;
				case 'custom styles':
					this.$store.commit('flashMessage/setItem', {
						exampleType: v
					});
					this.flashMessage.show(
						{
							title: 'Custom Styled Message',
							message: this.lorem,
							icon: 'custom_style.svg',
							blockClass: 'custom_msg'
						},
						{
							mounted: this.mountedSound,
							destroyed: this.destroyedSound
						}
					);
					break;
			}
		},

		mountedSound() {
			let sound = new Audio('/sounds/message.mp3');
			sound.play();
		},

		destroyedSound() {
			let sound = new Audio('/sounds/delete.mp3');
			sound.play();
		}
	}
};
</script>

<style lang="css">

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
						top: calc(50% - 13px / 2);
                        content: "";
                        display: block;
                        background-repeat: no-repeat;
                        background-position: center center;
                        background-size: 100%;
                        width: 13px;
                        height: 13px;
                    }

                    &.preset-list-item_error:before {
                        background-image: url('~@/assets/img/before_error.svg');
                    }

                    &.preset-list-item_warning:before {
                        background-image: url('~@/assets/img/before_warning.svg');
                    }

                    &.preset-list-item_success:before {
                        background-image: url('~@/assets/img/before_success.svg');
                    }

                    &.preset-list-item_info:before {
                        background-image: url('~@/assets/img/before_info.svg');
                    }
                }
            }
        }/* preset styles list end*/
    } /* presets block end */
}

/* class for custom message */
.custom_msg {
	background: linear-gradient(
		0.2turn,
		rgba(247, 19, 204, 1),
		rgba(23, 123, 255, 1)
	);
	&._vue-flash-msg-body ._vue-flash-msg-body__icon {
		width: 100%;
	}

	& ._vue-flash-msg-body__content {
		color: #fff;
	}
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

/* Mobile */

@media (320px <= width < 1024px) {
	.presets {
		width: 100%;
		flex-flow: column;
		& .preset-item {
			width: 100%;
		}
	}
}
</style>
