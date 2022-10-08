import { Box, Button, Center, Container, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Success() {


    return (
        <Center>
            <Box border='4px' borderColor='#3d3ada' textAlign='center' boxShadow='base' h='md' w='fit-content' m='10' p='10' rounded='xl'>
                <Container width='lg' centerContent>

                    <Text color='royalblue' fontWeight='bold' fontSize='xx-large' mb='5'>
                        É isso aí! 🚀
                    </Text>

                    <Text fontSize='xx-large' fontWeight='bold'>
                        Sua lista está pronta para entrar em produção!
                    </Text>

                    <Text fontSize='lg' mt='4'>
                        Já guardamos todas as mensagens válidas para que você
                        possa usá-las em uma campanha no futuro.
                    </Text>

                    <Text fontSize='md' mt='5'>
                        <NextLink href="/" passHref>
                            <Link color='blue.500'>
                                Voltar ao início
                            </Link>
                        </NextLink>
                        {' '} para iniciar outra verificação
                    </Text>

                </Container>
            </Box>
        </Center>
    )


}