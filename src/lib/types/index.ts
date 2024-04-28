import type { HTMLAnchorAttributes, HTMLAreaAttributes, HTMLAttributes, HTMLAudioAttributes, HTMLButtonAttributes, HTMLCanvasAttributes, HTMLDataAttributes, HTMLDetailsAttributes, HTMLDialogAttributes, HTMLFieldsetAttributes, HTMLFormAttributes, HTMLInputAttributes, HTMLLabelAttributes, HTMLLiAttributes, HTMLLinkAttributes, HTMLMenuAttributes, HTMLTableAttributes, HTMLTextareaAttributes, HTMLVideoAttributes } from "svelte/elements";

// TODO: Think about a size multiplier for the sizes
export type WuiColor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'white' | 'black';
export type WuiSize = 'sm' | 'md' | 'lg';
export type WuiVariant = 'solid' | 'soft' | 'outlined' | 'plain' | 'mixed' | 'none';
export type WuiShape = 'rounded' | 'circle' | 'pill' | 'square';

export type WuiDimension = '100%' | '75%' | '50%' | '25%' | 'auto' | 'inherit' | number;

export type WuiFlexAlign = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
export type WuiFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type WuiFlexJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
export type WuiFlexGap = 'ss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xx' | 'none';
export type WuiFlexWrap = 'wrap' | 'nowrap';

export interface WuiFlexKeys {
  align?: WuiFlexAlign;
  direction?: WuiFlexDirection;
  justify?: WuiFlexJustify;
  gap?: WuiSpacing;
  wrap?: 'wrap' | 'nowrap';
}

export type WuiTextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type WuiTextWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type WuiSpacing = 'ss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xx' | 'none' | 'auto' | 'inherit' | number;

export interface WuiMargin {
  m?: WuiSpacing;
  mx?: WuiSpacing;
  my?: WuiSpacing;
  mt?: WuiSpacing;
  mr?: WuiSpacing;
  mb?: WuiSpacing;
  ml?: WuiSpacing;
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
  gap?: WuiFlexGap;
  height?: WuiDimension;
  shape?: WuiShape;
  variant?: WuiVariant;
  width?: WuiDimension;
}

export type WuiListMarker = 'disc' | 'circle' | 'square' | 'decimal' | 'decimal-leading-zero' | 'lower-roman' | 'upper-roman' | 'lower-greek' | 'lower-latin' | 'upper-latin' | 'armenian' | 'georgian' | 'lower-alpha' | 'upper-alpha' | 'none';

export type WuiSurfaceHTMLAttributes =
  | HTMLAnchorAttributes
  | HTMLButtonAttributes
  | HTMLAttributes<HTMLDivElement>
  | HTMLFieldsetAttributes
  | HTMLFormAttributes
  | HTMLInputAttributes
  | HTMLLiAttributes
  | HTMLLabelAttributes
  | HTMLAttributes<HTMLOListElement>
  | HTMLAttributes<HTMLParagraphElement>
  | HTMLAttributes<HTMLSpanElement>
  | HTMLAttributes<HTMLTableCellElement>
  | HTMLAttributes<HTMLTableColElement>
  | HTMLTableAttributes
  | HTMLAttributes<HTMLTableRowElement>
  | HTMLTextareaAttributes
  | HTMLAttributes<HTMLUListElement>;

export type WuiSurfaceElement =
  | 'a'
  | 'button'
  | 'div'
  | 'fieldset'
  | 'form'
  | 'input'
  | 'li'
  | 'label'
  | 'ol'
  | 'p'
  | 'span'
  | 'table'
  | 'td'
  | 'textarea'
  | 'th'
  | 'tr'
  | 'ul;'
