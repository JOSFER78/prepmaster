import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.touchef.app',
  appName: 'TouChef',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    hostname: 'gen-lang-client-0115864240.firebaseapp.com'
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['google.com']
    }
  }
};

export default config;
