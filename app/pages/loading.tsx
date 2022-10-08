import { Box, Center, Container, Link, Spinner, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Loading() {

    return(
        <Center>
            <Box border='4px' borderColor='#3d3ada' textAlign='center' boxShadow='base' h='md' w='fit-content' m='10' p='10' rounded='xl'>
                <Container width='lg' centerContent>

                    <Text fontWeight='extrabold' fontSize='xx-large' mb='10'>
                        Estamos verificando todas as mensagens em seu arquivo...
                    </Text>

                    <Spinner size='xl' thickness='4px' speed='0.65s' color='royalblue' mb='20' emptyColor='gray.200' />

                    <Text color='gray.500'>
                        Voce quer {' '}
                        <NextLink href='/' passHref>
                            <Link color='blue.500'>
                                cancelar e voltar ao início {''}
                            </Link>
                        </NextLink>
                        ?
                    </Text>

                </Container>
            </Box>
        </Center>
    )
}