<template lang="html">
	<header>
		<div class="logo">
			<img
				src="fm-logo.svg"
				alt="vue flash message logotype"
				class="logo__img"
			/>
			<h1 class="logo__title">vue flash message</h1>
		</div>
		<nav class="nav">
			<ul class="nav-list">
				<li
					v-for="item in navItems"
					:key="item.text"
					class="nav-list-item"
				>
					<a class="nav-list-item__link" :href="item.link">{{
						item.text
					}}</a>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	data() {
		return {
			navItems: [
				{
					link: 'https://github.com/smwbtech/vue-flash-message',
					text: 'github'
				},
				{
					link:
						'https://www.npmjs.com/package/@smartweb/vue-flash-message',
					text: 'npm'
				},
				{
					link:
						'https://github.com/smwbtech/vue-flash-message/issues',
					text: 'issues'
				}
			]
		};
	}
};
</script>

<style lang="css" scoped>

header {
    width: 100%;
    padding-top: 20px;
    padding-left: calc(var(--side-padding) + var(--column) + var(--gutter));
    padding-right: calc(var(--side-padding) + var(--column) + var(--gutter));
    color: var(--app-grey);
    display: flex;
    align-items: center;
    justify-content: space-between;
	font-family: rift, sans-serif;
	font-weight: 700;
	font-style: normal;

    /* Logo */
    & .logo {
        display: flex;
        align-items: center;

        & .logo__title {
            margin-left: var(--gutter);
        }
    }/* Logo end*/

    /* navigation */

    & .nav {

        & .nav-list {
            display: flex;
            align-items: center;
            padding: 0;
            margin: 0;
            list-style: none;

            & .nav-list-item {
                display: block;
                margin-left: calc(var(--column) + var(--gutter));

                /* links */
                & .nav-list-item__link {
                    color: var(--app-grey);
                    text-decoration: none;
                    transition: color .2s ease-in;

                    &:hover {
                        color:var(--app-blue);
                    }

                }/* links  end*/
            }
        }
    }/* navigation end */
}

/* Mobile */

@media (320px <= width < 1024px)  {
	header {
		padding: var(--m-gutter);

		& .logo {

			width: calc(var(--m-column) * 3 + var(--m-gutter) * 2);

			& .logo__img {
				max-width: 100%;
			}

			& .logo__title {
				display: none;
			}
		}

		& .nav {
			& .nav-list {
				& .nav-list-item {
					margin-left: calc(var(--m-column) + var(--m-gutter));
				}
			}
		}
	}
}
</style>
