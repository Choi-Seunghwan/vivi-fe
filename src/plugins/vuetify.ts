import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'main',
    themes: {
      main: {
        dark: true,
        colors: {
          // background: '#ccc',
          // surface: '#212121',
          // primary: '#00ff00',
          // 'primary-darken-1': '#3700B3',
          // secondary: '#03DAC5',
        }
      }
    }
  }
});
