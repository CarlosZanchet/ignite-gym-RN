import { Center, Heading, Text } from "native-base";

interface Props {
  title: string
}

export function ScreenHeader({ title }: Props) {
  return (
    <Center pb={6} bg="gray.600" pt={"20"}>
      <Heading fontFamily="heading" color="gray.100" fontSize="xl">
        {title}
      </Heading>
    </Center>
  )
}