import { HTMLAttributes } from 'svelte/elements';
import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '../types';
import { Snippet } from 'svelte';

export interface AvatarGroupAttributes extends HTMLAttributes<HTMLDivElement> {
  children: Snippet;
  class?: string;
  color?: WuiColor;
  size?: WuiSize;
  variant?: WuiVariant;
  shape?: Omit<WuiShape, 'pill'>;
}

import AvatarGroup from './index.svelte';
export default AvatarGroup;
