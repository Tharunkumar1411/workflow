import { BrowserRouter } from 'react-router'
import AppRoute from './AppRoute'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <BrowserRouter>
      <AppRoute />
      <Toaster />
    </BrowserRouter>
  )
}

export default App
