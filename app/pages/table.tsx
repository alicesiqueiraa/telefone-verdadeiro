/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Container, Stack, Text, Table, Thead, Tbody, Tr, Td, Th, HStack } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from 'next/router';

type Mensagem = {
    numero: number
    mensagem: string
    validez: boolean
}

const columnHelper = createColumnHelper<Mensagem>()

const columns: ColumnDef<Mensagem>[] = [

        columnHelper.accessor(row => row.numero, {
            id: "Numero",
            header: () => 'Número',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
    
        columnHelper.accessor('mensagem', {
            header: () => 'Prévia da mensagem',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
    
        columnHelper.accessor('validez', {
            header: 'Resultado',
            cell: info => (<>{info.getValue() == true ? (<HStack spacing='5'>
                <span>Válido</span>
                <CheckIcon color='green'></CheckIcon>
            </HStack>) : (<HStack>
                <span>Invalido</span>
                <CloseIcon color='red'></CloseIcon>
            </HStack>) }</>),
            footer: info => info.column.id,
        }),

]

export default function table({ data }) {


let numvalidMessages : number = 0;
const validMessages = data.forEach(data => {
    Object.entries(data).forEach(([key, value]) => {
        if(key == 'validez'){
            if(value == true){
                numvalidMessages++;
            }
        }
    });
});

const uploadData = () => {
    fetch('https://telefone-verdadeiro-backend.vercel.app/db_upload')
    .then(() => {
        console.log("Uploading data to db!");
        router.push('/success')
    })
    .catch((err) => {
        console.warn(err)
    })
}

const defaultTable = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
})

const router = useRouter();


    return(
        <Center>
            <Box border='4px' borderColor='#3d3ada' textAlign='center' boxShadow='base' h='fit-content' w='3xl' m='10' p='5' rounded='xl'>
                <Container centerContent>

                    <Text as='span' fontSize='xx-large' fontWeight='bold' mb='5'>
                        Encontramos <Text as='span' color='green.500' fontSize='xx-large' fontWeight='extrabold' mb='5'>{`${numvalidMessages} `}</Text>
                        mensagens válidas em sua lista 🎉
                    </Text>

                    <Box w='2xl' border='2px' borderColor='gray.100' rounded='md'>
                        <Table variant='simple' size='md'>
                            <Thead>
                                {defaultTable.getHeaderGroups().map(headerGroup => (
                                    <Tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <Th key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                }
                                            </Th>
                                        ))}
                                    </Tr>
                                ))}
                            </Thead>
                            <Tbody>
                                {defaultTable.getRowModel().rows.map(row => (
                                    <Tr key={row.id}>
                                        {row.getAllCells().map(cell => (
                                            <Td key={cell.id} >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </Td>
                                        ))}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>

                    <Text fontSize='xl' fontWeight='bold' mb='4' mt='10'>
                        Está pronto para prosseguir? 🤔
                    </Text>

                    <Stack direction='row' spacing={4} align='center'>
                        <Button onClick={() => router.push('/')} rightIcon={<CloseIcon />} colorScheme='buttongray' variant='outline'>
                            Cancelar
                        </Button>

                        <Button onClick={uploadData} rightIcon={<CheckIcon />} colorScheme='royalblue'>
                            Salvar lista
                        </Button>

                    </Stack>

                </Container>
            </Box>
        </Center>
    )
}

export async function getServerSideProps() {
    const res = await fetch('https://telefone-verdadeiro-backend.vercel.app/uploads/payload') 
    const data = await res.json()

    return { props: { data }}
}