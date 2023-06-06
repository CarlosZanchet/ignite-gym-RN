import { NativeBaseProvider } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto' 
import { StatusBar } from 'react-native';
import { Loading } from '@components/Loading';
import { THEME } from './src/theme';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

export default function App() {5

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content" 
        translucent 
        backgroundColor="transparent" 
      />
      {fontsLoaded ? <SignUp /> : <Loading /> }
    </NativeBaseProvider>
  );
}