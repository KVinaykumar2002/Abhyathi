/** EATnaked semantic theme — merged into tailwind.config.js */
module.exports = {
  fontFamily: {
    sans: ['"Satoshi Variable"', '"Satoshi"', 'sans-serif'],
    primary: ['"Satoshi Variable"', '"Satoshi"', 'sans-serif'],
  },
  extend: {
    colors: {
      surface: {
        base: 'var(--color-surface-base)',
        raised: 'var(--color-surface-raised)',
        disabled: 'var(--color-surface-disabled)',
      },
      text: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        disabled: 'var(--color-text-disabled)',
      },
      border: {
        muted: 'var(--color-border-muted)',
      },
      feedback: {
        error: 'var(--color-feedback-error)',
      },
      focus: {
        ring: 'var(--color-focus-ring)',
      },
      /* Legacy alias for gradual migration */
      brand: 'var(--color-text-secondary)',
    },
    fontSize: {
      'ds-xs': ['var(--font-size-xs)', { lineHeight: 'var(--font-line-height-base)' }],
      'ds-sm': ['var(--font-size-sm)', { lineHeight: 'var(--font-line-height-base)' }],
      'ds-md': ['var(--font-size-md)', { lineHeight: 'var(--font-line-height-base)' }],
      'ds-lg': ['var(--font-size-lg)', { lineHeight: 'var(--font-line-height-base)' }],
      'ds-xl': ['var(--font-size-xl)', { lineHeight: 'var(--font-line-height-base)' }],
      'ds-2xl': ['var(--font-size-2xl)', { lineHeight: 'var(--font-line-height-base)' }],
      'ds-3xl': ['var(--font-size-3xl)', { lineHeight: 'var(--font-line-height-base)' }],
      'ds-4xl': ['var(--font-size-4xl)', { lineHeight: 'var(--font-line-height-base)' }],
    },
    spacing: {
      'ds-1': 'var(--space-1)',
      'ds-2': 'var(--space-2)',
      'ds-3': 'var(--space-3)',
      'ds-4': 'var(--space-4)',
      'ds-5': 'var(--space-5)',
      'ds-6': 'var(--space-6)',
      'ds-7': 'var(--space-7)',
    },
    borderRadius: {
      'ds-xs': 'var(--radius-xs)',
      'ds-sm': 'var(--radius-sm)',
      'ds-md': 'var(--radius-md)',
      'ds-lg': 'var(--radius-lg)',
      'ds-xl': 'var(--radius-xl)',
    },
    transitionDuration: {
      instant: 'var(--motion-duration-instant)',
      fast: 'var(--motion-duration-fast)',
      normal: 'var(--motion-duration-normal)',
      slow: 'var(--motion-duration-slow)',
      slower: 'var(--motion-duration-slower)',
    },
    outlineOffset: {
      focus: '2px',
    },
  },
};
