import { Center, Heading, Image, Text, VStack, ScrollView, HStack, Icon } from "native-base";
import BackgroundImage from '@assets/background.png'
import Logo from '@assets/logo-gym.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { useState } from "react";
import { Feather } from '@expo/vector-icons'

interface FormData {
  email: string;
  password: string;
}

export function SignIn() {
  const navigate = useNavigation<AuthNavigatorRoutesProps>()
  const { signIn } = useAuth()
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  const [isLoading, setIsLoading] = useState(false)

  function handleNewAccount() {
    navigate.navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormData) {
    setIsLoading(true)
    signIn(email, password)
    .finally(() => {
      setIsLoading(false)
    })
  }
  
  return (
    <ScrollView contentContainerStyle={{
      flexGrow: 1,
      paddingBottom: Platform.OS === 'ios' ? 180 : 16
  }}>
      <VStack flex={1} px={10} pb={Platform.OS === 'ios' ? 40 : 16}>
        <Image 
          source={BackgroundImage}
          defaultSource={BackgroundImage}
          alt="pessoas treinando"
          resizeMode="contain"
          position="absolute"
          opacity={0.3} 
        />

        <Center my={24}>
          <HStack alignItems="center" mb={1}>
            <Image 
              source={Logo}
              defaultSource={Logo}
              alt="Logo"
              resizeMode="contain"
              w={14}
              h={14}
            />
            <Heading fontFamily="heading" color="white" ml={1} fontSize="3xl">
              MyGym
            </Heading>
          </HStack>
          <Text color="gray.100" fontSize="sm">
            Seu guia de treino na palma da mão.
          </Text>
        </Center>

        <Center py={10}>
          <Heading color="gray.100" fontFamily="heading" fontSize="xl" mb={6}>
            Acesse sua conta
          </Heading>

          <Controller 
            name="email"
            control={control}
            rules={{ required: 'Informe o e-mail '}}
            render={({ field: { onChange } }) => (
              <Input 
                placeholder="E-mail" 
                keyboardType="email-address" 
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller 
            name="password"
            control={control}
            rules={{ required: 'Informe a senha '}}
            render={({ field: { onChange } }) => (
              <Input 
                placeholder="Senha" 
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button 
            mt={1}
            title="Acessar" 
            onPress={handleSubmit(handleSignIn)} 
            isLoading={isLoading}
            startIcon={
              <Icon
                as={Feather}
                name="check"
              />
            }
          />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button 
            title="Criar Conta" 
            variant="outline" 
            onPress={handleNewAccount} 
            startIcon={
              <Icon
                color="green.600"
                as={Feather}
                name="plus"
              />
            } />
        </Center>

      </VStack>
    </ScrollView>
  )
}