import { Box, Button, Center, Container, InputGroup, Link, Text } from "@chakra-ui/react";
import React, {useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { parse } from "papaparse";
import Loading from "./loading";



export default function Home() {

  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>();
  const router = useRouter();

  if(uploading) return <Loading />

  const clickOnRef = () => {
    inputRef.current.click()
  }

  async function handleUploadCSV(){
    setUploading(true);

    const input = inputRef?.current;
    const reader = new FileReader();
    const [file] = input.files;

    reader.onloadend = async ({ target }) => {

      let output = 'numero;mensagem\r\n\r\n' + target.result

      const csv = parse(output, {
        header: true,
        delimiter: ';',
        dynamicTyping: true,
        skipEmptyLines: 'greedy',
      })

      const fileName = file.name

      
      await fetch("https://telefone-verdadeiro-backend.vercel.app/csv_upload", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            csv: csv?.data,
            file: fileName
          })
        })
        .then(function(r) {
          setUploading(false);
          console.log(r.status);
          if (!r.ok) {
            throw new Error("HTTP STATUS: " + r.status)
          }

        })

      router.push('/table')

    };

    reader.readAsText(file);
  };



  return (
    <Center>
      <Box border='4px' borderColor='#3d3ada' textAlign='center' boxShadow='base' h='md' w='fit-content' m='10' p='10'  rounded='xl'>
        <Container width='lg' centerContent>
          <Text fontSize='xx-large' fontWeight='extrabold'>
            Verifique a Validade de uma lista de mensagens 👍
          </Text>
          
          <input accept=".csv" type='file' ref={inputRef} style={{display: 'none'}} onChange={handleUploadCSV} />

          <Button colorScheme='royalblue' size='lg' mt='10' mb='10'
            onClick={clickOnRef}
          >
            Selecionar lista

          </Button>

          <Text fontSize='md' mt='15'>
            Selecione um arquivo CSV para iniciar a verificação de uma lista com numeros e mensagens de SMS.
          </Text>

          <Text mt='5' color='gray.500' fontSize='sm' fontWeight='thin'>
            Use nosso {' '}
            <Link color='blue.500' href='https://telefone-verdadeiro-backend.vercel.app/model_download'>
              modelo
            </Link>
            {' '}de arquivo se você tem alguma duvida.
          </Text>
        </Container>
      </Box>
    </Center>
  )
}
