import { KeyboardAvoidingView, NativeBaseProvider } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto' 
import { Platform, StatusBar } from 'react-native';
import { Loading } from '@components/Loading';
import { THEME } from './src/theme';
import { Routes } from '@routes/index';

export default function App() {5

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content" 
        translucent 
        backgroundColor="transparent" 
      />
      {fontsLoaded ? <Routes /> : <Loading /> }
    </NativeBaseProvider>
  );
}