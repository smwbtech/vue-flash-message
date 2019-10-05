<template lang="html">
	<section class="content">
		<transition name="message-appear" mode="out-in">
			<div class="message" v-show="showMessage">
				<picture class="message-avatar">
					<source srcset="avatar.jpg" media="(max-width: 768px)" />
					<source srcset="avatar@2x.jpg" />
					<img srcset="avatar@2x.jpg" alt="Roman Privalov avatar" />
				</picture>
				<div class="message-text">
					<h3 class="message-text__title">Hi there!</h3>
					<p>
						Glad to see you on this page! Please if you like this
						project, leave me a
						<a href="https://github.com/smwbtech/vue-flash-message"
							>star on github</a
						>. For any suggestions, bug reports and questions use
						<a
							href="https://github.com/smwbtech/vue-flash-message/issues"
							>github issues</a
						>.
					</p>
				</div>
			</div>
		</transition>
		<!-- Remove? -->
		<!-- <transition name="btn-apper" mode="out-in">
			<button
				class="fm-btn"
				type="button"
				name="button"
				v-show="showMessage"
			>
				push me
			</button>
		</transition> -->
	</section>
</template>

<script>
export default {
	data() {
		return {
			showMessage: false
		};
	},

	// Show message with appear transition
	mounted() {
		setTimeout(() => (this.showMessage = true), 500);
	}
};
</script>

<style lang="css" scoped>

.content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    padding: 0 calc(var(--side-padding) + var(--column) + var(--gutter));

    /* message block */
    & .message {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        width: calc(var(--column) * 9 + var(--gutter) * 8);
        border: 1px solid var(--app-grey);
        border-radius: 10px;
        box-shadow: 2px 2px 8px rgba(0,0,0,.16);

        &:after {
            display: block;
            content: "";
            position: absolute;
            width: 100%;
            height: 80px;
            bottom: -90px;
            background-image: url('/shadow.svg');
            background-size: 100%;
            background-position: center center;
            background-repeat: no-repeat;
        }

        /* avatar */
        & .message-avatar {
            display: block;
            width: calc(var(--column) * 4 + var(--gutter) * 3);
            height: auto;

            & > * {
                display: block;
                max-width: 100%;
                height: auto;
            }
        }/* avatar end*/

        /* message text */
        & .message-text {
            margin-left: var(--gutter);
            text-align: left;

            & .message-text__title {
                font-family: 'Baron Neue', sans-serif;
            }

            & p {
                color: var(--app-grey);
                font-family: mrs-eaves-roman-lining, sans-serif;
                font-weight: 400;
                font-style: normal;
                line-height: 1.4;

                & a {
                    color: var(--app-blue);
                    text-decoration: none;
                }
            }
        } /* message text end */

    }/* message block end*/

    & .fm-btn {
        font-family: 'Baron Neue', sans-serif;
        font-size: 1.2em;
        display: block;
        padding: 10px;
        color: #fff;
        text-align: center;
        border: 1px solid var(--app-grey);
        border-radius: 5px;
        background-color: var(--app-grey);
        margin-top: 100px;
        cursor: pointer;
    }
}

/* transition */

.message-appear-enter,
.message-appear-leave-to {
	opacity: 0;
	transform: translateY(-30px);
	transform-origin: center;

	&.message:after {
		transform: scale(0);
		transform-origin: center;
	}
}

.message-appear-enter-active,
.message-appear-leave-active {
	transition: opacity .6s ease-in, transform .6s ease-out;

	&.message:after {
		transition: transform .6s ease-out;
	}
}

.btn-apper-enter,
.btn-apper-leave-to {
	opacity: 0;
	transform: translateY(30px);
}

.btn-apper-enter-active,
.btn-apper-leave-active {
	transition: opacity .3s ease-in .5s, transform .3s ease-out .5s;
}

/* Mobile */

@media (320px <= width < 1024px) {
	.content {
		padding: 0 var(--m-gutter);

		& .message {
			width: calc(var(--m-column) * 9 + var(--m-gutter) * 8);
			flex-flow: column;
			font-size: .8em;
			text-align: center;

			&:after {
				bottom: -60px;
			}

			& .message-avatar {
				width: 50%;
			}

			& .message-text {
				margin-left: 0;
				text-align: center;
			}
		}
	}
}
</style>
