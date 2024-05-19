import type { HTMLImgAttributes } from 'svelte/elements';
import type { WuiColor, WuiDimension, WuiShape, WuiSize, WuiVariant } from '../types';
import type { SurfaceAttributes } from '../surface';

export interface AvatarAttributes
  extends Omit<SurfaceAttributes<Omit<HTMLImgAttributes, 'color'>>, 'element'> {
  size?: WuiSize;
}

import Avatar from './index.svelte';
export default Avatar;