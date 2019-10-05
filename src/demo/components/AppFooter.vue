<template lang="html">
	<footer>
		<transition name="menu-appear" mode="out-in">
			<div
				v-show="isLoaded"
				:class="['menu', isActive ? 'menu_active' : 'menu_inactive']"
			>
				<button
					:class="[
						'menu-toggle-btn',
						isActive
							? 'menu-toggle-btn_active'
							: 'menu-toggle-btn_inactive'
					]"
					@click="toggleButtonHandler"
				/>
				<div class="wrapper">
					<AppFooterPresets :isActive="isActive" />
					<AppFooterCode :isActive="isActive" />
				</div>
			</div>
		</transition>
	</footer>
</template>

<script>
import AppFooterPresets from './AppFooterPresets.vue';
import AppFooterCode from './AppFooterCode.vue';

export default {
	components: {
		AppFooterPresets,
		AppFooterCode
	},

	data() {
		return {
			isActive: false,
			isLoaded: false
		};
	},

	mounted() {
		setTimeout(() => (this.isLoaded = true), 500);
	},

	methods: {
		toggleButtonHandler() {
			this.isActive = !this.isActive;
			this.isClicked = true;
		}
	}
};
</script>

<style lang="css" scoped>

/* menu block */
.menu {
    position: fixed;
    left: 0;
    width: 100%;
    height: 70vh;
    background-color: var(--app-grey);
    transition: bottom .4s ease-out;

	& .wrapper {
		display: flex;
	    justify-content: space-between;
		padding-left: calc(var(--side-padding) + var(--column) + var(--gutter));
	    padding-right: calc(var(--side-padding) + var(--column) + var(--gutter));
	}

    /* menu toggle btn */
    & .menu-toggle-btn {
        position: absolute;
        top: -30px;
        left: calc(50% - 30px);
        width: 60px;
        height: 60px;
        margin: 0;
        padding: 0;
        background-color: var(--app-light-grey);
        border: 3px solid var(--app-grey);
        border-radius: 60px;
        overflow: hidden;
        cursor: pointer;

        &:before {
            content: "";
            display: block;
            width: 50px;
            height: 50px;
            margin-top: 5px;
            margin: 0 auto;
            background-image: url('~@/assets/img/arrow.svg');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 80%;
            transition: transform .4s ease-in;
        }

    } /* menu toggle btn end*/

    &.menu_inactive {
        bottom: -60vh;
        & .menu-toggle-btn {
            &:before {
                transform: rotate(180deg);
            }
        }
    }

    &.menu_active {
        bottom: 0%;
        & .menu-toggle-btn {
            &:before {
                transform: rotate(0deg);
            }
        }
    }
} /* menu block end*/

/* Transition */

.menu-appear-enter,
.menu-appear-leave-to {
    transform: translateY(calc(20vh));
}

.menu-appear-enter-active,
.menu-appear-leave-active {
    transition: transform .6s ease-in .6s;
}

/* Mobile */

@media (320px <= width < 1024px) {
	.menu {
		min-height: 70vh;
		& .wrapper {
			height: 90%;
			margin-top: 40px;
			overflow-y: scroll;
			flex-flow: column;
		}
	}
}
</style>
