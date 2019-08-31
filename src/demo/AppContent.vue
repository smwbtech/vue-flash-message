<template lang="html">
	<section class="content">
		<div class="message">
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

		<button class="fm-btn" type="button" name="button">push me</button>
	</section>
</template>

<script>
export default {};
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
</style>
