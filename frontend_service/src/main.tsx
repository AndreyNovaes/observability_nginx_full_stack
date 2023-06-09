import { ChakraProvider, theme } from '@chakra-ui/react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
)

