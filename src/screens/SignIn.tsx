import { Center, Heading, Image, Text, VStack, ScrollView } from "native-base";

import BackgroundImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Platform } from "react-native";

export function SignIn() {
  return (
    <ScrollView bg="gray.700" contentContainerStyle={{
      flexGrow: 1,
      paddingBottom: Platform.OS === 'ios' ? 180 : 16
  }}>
      <VStack flex={1} bg="gray.700" px={10} pb={Platform.OS === 'ios' ? 40 : 16}>
        <Image 
          source={BackgroundImage}
          alt="pessoas treinando"
          resizeMode="contain"
          position="absolute" 
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center py={10}>
          <Heading color="gray.100" fontFamily="heading" fontSize="xl" mb={6}>
            Acesse sua conta
          </Heading>
          <Input 
            placeholder="E-mail" 
            keyboardType="email-address" 
            autoCapitalize="none"
          />
          <Input 
            placeholder="Senha" 
            secureTextEntry
          />

          <Button title="Acessar" />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button title="Criar Conta" variant="outline" />
        </Center>

      </VStack>
    </ScrollView>
  )
}