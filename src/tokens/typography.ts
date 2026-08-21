export interface M3TypographyStyle {
  fontFamily: string;
  weight: number | string;
  size: string;
  lineHeight: string;
  letterSpacing: string;
}

export const typographyTokens = {
  fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  displayLarge: { size: '57px', lineHeight: '64px', letterSpacing: '-0.25px', weight: 400 },
  displayMedium: { size: '45px', lineHeight: '52px', letterSpacing: '0px', weight: 400 },
  displaySmall: { size: '36px', lineHeight: '44px', letterSpacing: '0px', weight: 400 },
  headlineLarge: { size: '32px', lineHeight: '40px', letterSpacing: '0px', weight: 400 },
  headlineMedium: { size: '28px', lineHeight: '36px', letterSpacing: '0px', weight: 400 },
  headlineSmall: { size: '24px', lineHeight: '32px', letterSpacing: '0px', weight: 400 },
  titleLarge: { size: '22px', lineHeight: '28px', letterSpacing: '0px', weight: 400 },
  titleMedium: { size: '16px', lineHeight: '24px', letterSpacing: '0.15px', weight: 500 },
  titleSmall: { size: '14px', lineHeight: '20px', letterSpacing: '0.1px', weight: 500 },
  bodyLarge: { size: '16px', lineHeight: '24px', letterSpacing: '0.5px', weight: 400 },
  bodyMedium: { size: '14px', lineHeight: '20px', letterSpacing: '0.25px', weight: 400 },
  bodySmall: { size: '12px', lineHeight: '16px', letterSpacing: '0.4px', weight: 400 },
  labelLarge: { size: '14px', lineHeight: '20px', letterSpacing: '0.1px', weight: 500 },
  labelMedium: { size: '12px', lineHeight: '16px', letterSpacing: '0.5px', weight: 500 },
  labelSmall: { size: '11px', lineHeight: '16px', letterSpacing: '0.5px', weight: 500 },
};

