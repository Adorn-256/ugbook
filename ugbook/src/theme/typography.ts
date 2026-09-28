export type FontScale = 1 | 1.15 | 1.3;

export const FONT_SCALES: FontScale[] = [1, 1.15, 1.3];

export const FONT_SCALE_LABELS: Record<FontScale, string> = {
  1: 'Default',
  1.15: 'Large',
  1.3: 'XL',
};

export const fontScale = (scale: FontScale): number => scale;