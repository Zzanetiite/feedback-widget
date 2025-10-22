// src/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      border: string;
      text: {
        primary: string;
        secondary: string;
      };
    };
    fonts: {
      main: string;
    };
  }
}
