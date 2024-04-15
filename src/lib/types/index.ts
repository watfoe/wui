// TODO: Think about a size multiplier for the sizes
export type WuiColor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'white' | 'black';
export type WuiSize = 'sm' | 'md' | 'lg';
export type WuiVariant = 'solid' | 'soft' | 'outlined' | 'plain' | 'none';
export type WuiShape = 'rounded' | 'circle' | 'pill' | 'square';

export type WuiHeight = 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';
export type WuiWidth = 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';

export type WuiFlexAlign = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
export type WuiFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type WuiFlexJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
export type WuiFlexGap = 'ss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xx' | 'none';
export type WuiFlexWrap = 'wrap' | 'nowrap';

export type WuiTextWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type WuiSpacing = 'ss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xx' | 'none' | 'auto' | 'inherit';

export interface WuiSurface {
  color?: WuiColor;
  gap?: WuiFlexGap;
  height?: WuiHeight;
  shape?: WuiShape;
  variant?: WuiVariant;
  width?: WuiWidth;
}

export type WuiListMarker = 'disc' | 'circle' | 'square' | 'decimal' | 'decimal-leading-zero' | 'lower-roman' | 'upper-roman' | 'lower-greek' | 'lower-latin' | 'upper-latin' | 'armenian' | 'georgian' | 'lower-alpha' | 'upper-alpha' | 'none';
