import type { WuiPadding } from "$lib/types";

/**
 * p-xs p-sm p-md p-lg p-xl p-2x p-3x
 * px-xs px-sm px-md px-lg px-xl px-2x px-3x
 * py-xs py-sm py-md py-lg py-xl py-2x py-3x
 * pt-xs pt-sm pt-md pt-lg pt-xl pt-2x pt-3x
 * pr-xs pr-sm pr-md pr-lg pr-xl pr-2x pr-3x
 * pb-xs pb-sm pb-md pb-lg pb-xl pb-2x pb-3x
 * pl-xs pl-sm pl-md pl-lg pl-xl pl-2x pl-3x
 */
export default function padding(p?: WuiPadding, px?: WuiPadding, py?: WuiPadding, pt?: WuiPadding, pr?: WuiPadding, pb?: WuiPadding, pl?: WuiPadding) {
	return `
		${p ? 'p-' + p : ''}
		${px ? 'px-' + px : ''}
		${py ? 'py-' + py : ''}
		${pt ? 'pt-' + pt : ''}
		${pr ? 'pr-' + pr : ''}
		${pb ? 'pb-' + pb : ''}
		${pl ? 'pl-' + pl : ''}
	`
}
