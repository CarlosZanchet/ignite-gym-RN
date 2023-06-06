import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

interface Props extends IButtonProps {
  title: string;
  variant?: 'solid' | 'outline';
}

export function Button({ title, variant = 'solid', ...rest }: Props) {
  return (
    <NativeBaseButton 
      w="full"
      h={14}
      bg={variant === 'outline' ? 'transparent' : "green.700"}
      borderWidth={variant === 'outline' ? 1 : 0 }
      rounded="sm"
      borderColor="green.500"
      _pressed={{
        bg: variant === 'outline' ? "gray.600" : "green.800"
      }}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? "green.500" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </NativeBaseButton>
  )
}