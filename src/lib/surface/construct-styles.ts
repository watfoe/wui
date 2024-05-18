import type { WuiColor, WuiColorWeight, WuiFlexAlign, WuiFlexAlignSelf, WuiFlexDirection, WuiFlexGap, WuiFlexJustify, WuiFlexWrap, WuiVariant } from "$lib/types";

const SPACES = ['ss', 'xs', 'sm', 'md', 'lg', 'xl', 'xx'];

export function construct_spacing_style(
	type: 'margin' | 'padding',
	which: 'top' | 'right' | 'bottom' | 'left',
	value?: string | number
) {
	if (value) {
		if (typeof value === 'number') {
			return `${type}-${which}:${value}px;`;
		} else if (SPACES.includes(value)) {
			return `${type}-${which}:var(--space-${value},var(--space-md));`;
		} else {
			return `${type}-${which}:${value};`;
		}
	}

	return '';
}

export function construct_size_style(which: 'height' | 'width', value?: string | number) {
	if (value) {
		if (typeof value === 'number') {
			return `--w-size-${which}:${value}px;`;
		} else if (SPACES.includes(value)) {
			return `--w-size-${which}:var(--height-${value});`;
		} else {
			return `--w-size-${which}:${value};`;
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
		textweight = textweight || '5';
	}

	if (variant === 'plain' || variant === 'none') {
		// bg soft is used for hover effect
		return `
			--w-color-text: ${compute_color_value(textcolor || color || 'black', textweight)};
			${clickable ? `--w-color-bg-soft: var(--color-${color === 'black' || color === 'white' ? 'neutral' : color}-${weight || '1'});` : ''}
		`;
	} else if (variant === 'soft') {
		color = color || 'primary';

		if (!textweight && color === 'neutral') {
			textweight = '8';
		}

		return `
			--w-color-text: ${compute_color_value(textcolor || color, textweight)};
			--w-color-bg-soft: var(--color-${color === 'black' || color === 'white' ? 'neutral' : color}-${weight || '1'});
		`;
	} else if (variant === 'solid') {
		if (color === 'white') {
			textcolor = 'black';
		} else if (color === 'black') {
			textcolor = 'white';
		} else {
			color = color || 'primary';
		}

		return `
			--w-color-bg: ${compute_color_value(color, weight)};
			--w-color-text: ${compute_color_value(textcolor || 'white', textweight)};
		`;
	} else if (variant === 'outlined') {
		if (color === 'neutral') {
			weight = weight || '3';
		} else {
			color = color || 'primary';
			weight = weight || '5';
		}

		// The bg color is used for the border color
		// while the bg soft is used for the hover effect
		return `
			--w-color-bg: ${compute_color_value(color, weight)};
			--w-color-text: ${compute_color_value(textcolor || color, textweight)};
			${clickable ? `--w-color-bg-soft: var(--color-${color === 'black' || color === 'white' ? 'neutral' : color}-1);` : ''}
		`;
	} else if (variant === 'mixed') {
		color = color || 'primary';

		return `
			--w-color-bg: ${compute_color_value(color, !weight && color === 'neutral' ? '3' : weight || '5')};
			--w-color-text: ${compute_color_value(textcolor || color, textweight)};
			--w-color-bg-soft: var(--color-${color === 'black' || color === 'white' ? 'neutral' : color}-'1');
		`;
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
		return `var(--color-${color}-${weight || '5'})`;
	}
}

export function construct_flex_style(
	direction?: WuiFlexDirection,
	justify?: WuiFlexJustify,
	align?: WuiFlexAlign,
	self?: WuiFlexAlignSelf,
	wrap?: WuiFlexWrap,
	gap?: WuiFlexGap
) {
	if (direction || justify || align || wrap || gap) {
		return `
			display:flex;
			align-items:${align || 'center'};
			${justify ? `justify-content:${justify};` : ''}
			${wrap ? 'flex-wrap:wrap;' : ''}
			${direction ? `flex-direction:${direction};` : ''}
			${self ? `align-self:${self};` : ''}
			${gap ? `gap:var(--space-${gap});` : ''}
		`;
	}

	return '';
}