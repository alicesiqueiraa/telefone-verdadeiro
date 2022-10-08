import * as React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'



function MyApp({ Component, pageProps }) {

  const theme = extendTheme({
    colors: {
      royalblue: {
        500: "#3d3ada",
      },

      buttongray: {
        500: "#747474",
      }
    }
  });

  return(
    <ChakraProvider theme={theme}>
       <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
