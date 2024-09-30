import type { WuiColor, WuiColorWeight, WuiFlexAlign, WuiFlexAlignSelf, WuiFlexDirection, WuiFlexGap, WuiFlexJustify, WuiFlexWrap, WuiVariant } from '$lib/types';

const SIZE_MAP = {
	'100%': 4,
	'75%': 3,
	'50%': 2,
	'25%': 1,
	'xl': 'xl',
	'lg': 'lg',
	'md': 'md',
	'sm': 'sm',
	'xs': 'xs',
	'auto': 'a',
	'inherit': 'i'
}

export function construct_spacing_class(
	type: 'margin' | 'padding',
	t?: string | number,
	r?: string | number,
	b?: string | number,
	l?: string | number,
	a?: string | number,
	x?: string | number,
	y?: string | number
) {
	let _abbr = abbr(type);
	let _class = '';
	t = t || y || a;
	b = b || y || a;
	r = r || x || a;
	l = l || x || a;

	if (t && t === r && r === b && b === l) {
		return `${_abbr}-${typeof t === 'number' ? '0' : t === 'auto' ? 'a' : t} `;
	}

	if (t && t === b) {
		_class = `${_abbr}y-${typeof t === 'number' ? '0' : t === 'auto' ? 'a' : t} `;
	} else {
		if (t) {
			_class = `${_abbr}t-${typeof t === 'number' ? '0' : t === 'auto' ? 'a' : t} `;
		}
		if (b) {
			_class += `${_abbr}b-${typeof b === 'number' ? '0' : b === 'auto' ? 'a' : b} `;
		}
	}

	if (l && l === r) {
		_class += `${_abbr}x-${typeof l === 'number' ? '0' : l === 'auto' ? 'a' : l} `;
	} else {
		if (r) {
			_class += `${_abbr}r-${typeof r === 'number' ? '0' : r === 'auto' ? 'a' : r} `;
		}
		if (l) {
			_class += `${_abbr}l-${typeof l === 'number' ? '0' : l === 'auto' ? 'a' : l} `;
		}
	}

	return _class;
}

export function construct_spacing_style(
	type: 'margin' | 'padding',
	t?: string | number,
	r?: string | number,
	b?: string | number,
	l?: string | number,
	a?: string | number,
	x?: string | number,
	y?: string | number
) {
	let _abbr = abbr(type);
	let _style = '';
	t = t || y || a;
	b = b || y || a;
	r = r || x || a;
	l = l || x || a;

	if (t && t === r && r === b && b === l) {
		return typeof t === 'number' ? `--w-${_abbr}-a:${t}px;` : '';
	}

	if (t && t === b) {
		_style = typeof t === 'number' ? `--w-${_abbr}-y:${t}px;` : '';
	} else {
		if (t) {
			_style = typeof t === 'number' ? `--w-${_abbr}-t:${t}px;` : '';
		}
		if (b) {
			_style += typeof b === 'number' ? `--w-${_abbr}-b:${b}px;` : '';
		}
	}

	if (l && l === r) {
		_style += typeof l === 'number' ? `--w-${_abbr}-x:${l}px;` : '';
	} else {
		if (l) {
			_style += typeof l === 'number' ? `--w-${_abbr}-l:${l}px;` : '';
		}
		if (r) {
			_style += typeof r === 'number' ? `--w-${_abbr}-r:${r}px;` : '';
		}
	}

	return _style;
}

export function construct_size_class(which: 'h' | 'w', value?: string | number) {
	if (value) {
		// @ts-expect-error
		let _class = SIZE_MAP[value];
		if (_class) {
			return `${which}-${_class} `;
		} else {
			return `${which}-0 `;
		}
	}

	return '';
}

export function construct_size_style(which: 'h' | 'w', value?: string | number) {
	// @ts-expect-error
	if (value && !SIZE_MAP[value]) {
		if (isNaN(Number(value))) {
			return `--w-${which}:${value};`;
		} else {
			return `--w-${which}:${value}px;`;
		}
	}

	return '';
}

export function construct_color_style(
	color?: WuiColor,
	variant?: WuiVariant,
	weight?: WuiColorWeight,
	textcolor?: WuiColor,
	textweight?: WuiColorWeight,
	clickable = false
) {
	if (color === 'inherit' || (textcolor === 'inherit' && (!variant || variant === 'none'))) {
		return '';
	}

	if (!textweight && (textcolor === 'neutral' || color === 'neutral')) {
		textweight = '8';
	} else {
		textweight = textweight || '6';
	}

	if (variant === 'plain' || variant === 'none') {
		// bg soft is used for hover effect
		return `--w-clr-fg:${compute_color_value(textcolor || color || 'black', textweight)};${clickable ? `--w-clr-bg-soft:var(--color-${color === 'black' || color === 'white' ? 'neutral' : color}-${weight || '1'});` : ''}`;
	} else if (variant === 'soft') {
		color = color || 'primary';
		if (!textweight && color === 'neutral') {
			textweight = '8';
		}
		return `--w-clr-fg:${compute_color_value(textcolor || color, textweight)};--w-clr-bg-soft:var(--color-${color === 'black' || color === 'white' ? 'neutral' : color}-${weight || '1'});`;
	} else if (variant === 'solid') {
		if (color === 'white') {
			textcolor = 'black';
		} else if (color === 'black') {
			textcolor = 'white';
		} else {
			color = color || 'primary';
		}
		return `--w-clr-bg: ${compute_color_value(color, weight)};--w-clr-fg:${compute_color_value(textcolor || 'white', textweight)};--w-clr-bg-soft: ${compute_color_value(color, '7')};`;
	} else if (variant === 'outlined' || variant === 'mixed') {
		if (color === 'neutral') {
			weight = weight || '4';
		} else {
			color = color || 'primary';
			weight = weight || '6';
		}
		// The bg color is used for the border color
		// while the bg soft is used for the hover effect for outlined surfaces and background color for mixed surfaces
		return `--w-clr-bg:${compute_color_value(color, weight)};--w-clr-fg:${compute_color_value(textcolor || color, textweight)};${clickable ? `--w-clr-bg-soft:var(--color-${color === 'black' || color === 'white' ? 'neutral' : color}-1);` : ''}`;
	}

	return '';
}

export function compute_color_value(color: WuiColor, weight?: WuiColorWeight) {
	if (color === 'white') {
		return 'var(--color-white)';
	} else if (color === 'black') {
		return 'var(--color-black)';
	} else if (color === 'inherit') {
		return 'inherit';
	} else {
		return `var(--color-${color}-${weight || '6'})`;
	}
}

export function construct_flex_class(
	direction?: WuiFlexDirection,
	justify: WuiFlexJustify = 'start',
	align: WuiFlexAlign = 'center',
	self?: WuiFlexAlignSelf,
	wrap?: WuiFlexWrap,
	gap?: WuiFlexGap
) {
	if (direction || justify || align || wrap || gap) {
		let _class = 'f';
		if (direction) _class += ` f${abbr(direction)}`;
		if (wrap) _class += wrap ? ' f-wrap' : '';
		if (justify) _class += ` fj${abbr(justify)}`;
		if (align) _class += ` fi${abbr(align)}`;
		if (self) _class += ` fs${abbr(self)}`;
		if (gap) _class += ` fg-${typeof gap === 'number' ? '0' : gap}`;
		return _class + ' ';
	} else if (self) {
		return `fs${abbr(self)} `;
	}

	return '';
}

export function construct_flex_gap_style(gap?: WuiFlexGap) {
	if (gap && typeof gap === 'number') {
		return `--w-fg:${gap}px;`;
	}
	return '';
}

function abbr(str: string) {
	return str.split('-').map((s) => s[0]).join('');
}