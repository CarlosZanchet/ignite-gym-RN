import { Center, Heading, Image, Text, VStack, ScrollView } from "native-base";
import { useForm, Controller } from 'react-hook-form'
import BackgroundImage from '@assets/background.png'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface FormDataProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  confirmPassword: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'A confirmação da senha não confere.'),
})

export function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })
  const navigate = useNavigation()

  function handleLogin() {
    navigate.goBack()
  }

  function handleSignUp({ name, email, password, confirmPassword }: FormDataProps) {
    console.log({ name, email, password, confirmPassword })
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
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center py={10}>
          <Heading color="gray.100" fontFamily="heading" fontSize="xl" mb={6}>
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Nome" 
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="E-mail" 
                keyboardType="email-address" 
                value={value}
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Senha" 
                value={value}
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Confirmar a Senha" 
                value={value}
                secureTextEntry
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />
        </Center>

        <Button 
          title="Voltar para login" 
          variant="outline" 
          mt={24}  
          onPress={handleLogin} 
        />

      </VStack>
    </ScrollView>
  )
}