<script context="module" lang="ts">
	export interface LogoAttributes {
		brand?: 'watfoe' | 'apple' | 'facebook' | 'github' | 'google' | 'microsoft';
		class?: string;
		size?: number;
		style?: string;
	}
</script>

<script lang="ts">
	let { brand = 'watfoe', size = 100, ...rest } = $props<LogoAttributes>();
</script>

{#if brand === 'watfoe'}
	<enhanced:img
		src="../../styles/images/logo-no-bg.png"
		class="WuiLogo {rest.class || ''}"
		alt="Watfoe official logo"
		style="--size:{size}px;{rest.style || ''}"
	/>
{:else}
	<span class="WuiBrandLogo" data-provider={brand} />
{/if}

<style>
	.WuiLogo {
		width: var(--size);
		height: auto;
	}

	.WuiBrandLogo {
		display: inline-block;
		width: 20px;
		height: 20px;
		position: relative;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: 50%;
	}

	.WuiBrandLogo[data-provider^='apple'] {
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='170' xmlns='http://www.w3.org/2000/svg' height='170'%3E%3Cpath d='M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375a25.222 25.222 0 0 1-.188-3.07c0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71.12 1.083.17 2.166.17 3.24z'/%3E%3C/svg%3E");
	}
	.WuiBrandLogo[data-provider^='facebook'] {
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='none' class='_96z7' aria-labelledby='fb-app-logo'%3E%3Cpath d='M30 15.091C30 6.756 23.285 0 15 0S0 6.756 0 15.091C0 22.625 5.484 28.868 12.656 30V19.454H8.848V15.09h3.808v-3.324c0-3.782 2.239-5.872 5.666-5.872 1.64 0 3.358.295 3.358.295v3.714h-1.893c-1.863 0-2.443 1.164-2.443 2.358v2.83h4.16l-.665 4.362h-3.495V30C24.516 28.868 30 22.625 30 15.091z' fill='%23000'/%3E%3C/svg%3E");
	}
	.WuiBrandLogo[data-provider^='github'] {
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0C4.477 0 0 4.36 0 9.74c0 4.304 2.865 7.955 6.839 9.243.5.09.682-.211.682-.47 0-.23-.008-.843-.013-1.656-2.782.588-3.369-1.306-3.369-1.306-.454-1.125-1.11-1.425-1.11-1.425-.908-.604.069-.592.069-.592 1.003.069 1.531 1.004 1.531 1.004.892 1.488 2.341 1.059 2.91.81.092-.63.35-1.06.636-1.303-2.22-.245-4.555-1.081-4.555-4.814 0-1.063.39-1.933 1.029-2.613-.103-.247-.446-1.238.098-2.578 0 0 .84-.262 2.75.998A9.818 9.818 0 0 1 10 4.71c.85.004 1.705.112 2.504.328 1.909-1.26 2.747-.998 2.747-.998.546 1.34.203 2.331.1 2.578.64.68 1.028 1.55 1.028 2.613 0 3.742-2.339 4.566-4.566 4.807.359.3.678.895.678 1.804 0 1.301-.012 2.352-.012 2.671 0 .261.18.564.688.47C17.137 17.69 20 14.042 20 9.74 20 4.36 15.522 0 10 0z' fill='%23161514' fill-rule='evenodd'/%3E%3C/svg%3E");
	}
	.WuiBrandLogo[data-provider^='google'] {
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 48 48'%3E%3Cdefs%3E%3Cpath id='a' d='M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z'/%3E%3C/defs%3E%3CclipPath id='b'%3E%3Cuse xlink:href='%23a' overflow='visible'/%3E%3C/clipPath%3E%3Cpath clip-path='url(%23b)' fill='%23FBBC05' d='M0 37V11l17 13z'/%3E%3Cpath clip-path='url(%23b)' fill='%23EA4335' d='M0 11l17 13 7-6.1L48 14V0H0z'/%3E%3Cpath clip-path='url(%23b)' fill='%2334A853' d='M0 37l30-23 7.9 1L48 0v48H0z'/%3E%3Cpath clip-path='url(%23b)' fill='%234285F4' d='M48 48L17 24l-4-3 35-10z'/%3E%3C/svg%3E");
	}
	.WuiBrandLogo[data-provider^='microsoft'] {
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='21'%3E%3Cpath fill='%23f25022' d='M1 1h9v9H1z'/%3E%3Cpath fill='%2300a4ef' d='M1 11h9v9H1z'/%3E%3Cpath fill='%237fba00' d='M11 1h9v9h-9z'/%3E%3Cpath fill='%23ffb900' d='M11 11h9v9h-9z'/%3E%3C/svg%3E");
	}
</style>
