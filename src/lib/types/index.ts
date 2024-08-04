// TODO: Think about a size multiplier for the sizes
export type WuiColor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'white' | 'black' | 'inherit';
export type WuiColorWeight = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type WuiSize = 'xs' | 'sm' | 'md' | 'lg'| 'xl';
export type WuiVariant = 'solid' | 'soft' | 'outlined' | 'plain' | 'mixed' | 'none';
export type WuiShape = 'rounded' | 'circle' | 'pill' | 'sharp';

export type WuiDimensionWithCalcOrVar = `calc(${string})` | `var(${string})`;
export type WuiDimensionWithUnit = `${string}px` | `${string}em` | `${string}rem` | `${string}vh` | `${string}vw` | `${string}vmin` | `${string}vmax` | `${string}%` | `${string}fr`;
export type WuiDimension = WuiSize | 'auto' | 'inherit' | WuiDimensionWithUnit | WuiDimensionWithCalcOrVar | number;

export type WuiFlexAlign = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
export type WuiFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type WuiFlexJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
export type WuiFlexAlignSelf = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
export type WuiFlexGap = WuiSpacing;
export type WuiFlexWrap = 'wrap' | 'nowrap';

export interface WuiFlexKeys {
  align?: WuiFlexAlign;
  direction?: WuiFlexDirection;
  justify?: WuiFlexJustify;
  self?: WuiFlexAlignSelf;
  gap?: WuiSpacing;
  wrap?: 'wrap' | 'nowrap';
}

export type WuiTextAlign = 'left' | 'center' | 'right' | 'justify' | 'inherit';
export type WuiTextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'inherit' | number;
export type WuiTextWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type WuiTextVariant = 'a' | 'heading' | 'title' | 'body' | 'label';
export type WuiSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | number;

export interface WuiMargin {
  m?: WuiSpacing | 'auto';
  mx?: WuiSpacing | 'auto';
  my?: WuiSpacing | 'auto';
  mt?: WuiSpacing | 'auto';
  mr?: WuiSpacing | 'auto';
  mb?: WuiSpacing | 'auto';
  ml?: WuiSpacing | 'auto';
}

export interface WuiPadding {
  p?: WuiSpacing;
  px?: WuiSpacing;
  py?: WuiSpacing;
  pt?: WuiSpacing;
  pr?: WuiSpacing;
  pb?: WuiSpacing;
  pl?: WuiSpacing;
}

export interface WuiSurface extends WuiMargin, WuiPadding {
  color?: WuiColor;
  colorweight?: WuiColorWeight;
  gap?: WuiFlexGap;
  height?: WuiDimension;
  shape?: WuiShape;
  variant?: WuiVariant;
  width?: WuiDimension;
}

export interface WuiSurfaceTextAttributes {
  textalign?: WuiTextAlign;
  textcolor?: WuiColor;
  textcolorweight?: WuiColorWeight;
  textsize?: WuiTextSize;
  textweight?: WuiTextWeight;
  textbold?: boolean;
  textitalic?: boolean;
  textunderline?: boolean;
  textvariant?: WuiTextVariant;
}

export type WuiListMarker = 'disc' | 'circle' | 'square' | 'decimal' | 'decimal-leading-zero' | 'lower-roman' | 'upper-roman' | 'lower-greek' | 'lower-latin' | 'upper-latin' | 'armenian' | 'georgian' | 'lower-alpha' | 'upper-alpha' | 'none';
