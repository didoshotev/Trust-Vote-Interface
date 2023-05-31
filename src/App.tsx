import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/Home/HomePage'
import { CreatePollPage } from './pages/CreatePoll/CreatePollPage'
import { ChakraProvider } from '@chakra-ui/react'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import { MoralisProvider } from 'react-moralis'
import { TrustVoteContractProvider } from './context/TrustVoteContract/TrustVoteContractProvider'
import WithSubnavigation from './components/Navbar/Navbar'
import { Web3Provider } from './context/Web3/Web3Provider'

const App = () => {
    return (
        <ChakraProvider>
            <MoralisProvider initializeOnMount={false}>
                <Web3Provider>
                    <TrustVoteContractProvider>
                        <Router>
                            <WithSubnavigation />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/createPoll"
                                    element={<CreatePollPage />}
                                />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </Router>
                    </TrustVoteContractProvider>
                </Web3Provider>
            </MoralisProvider>
        </ChakraProvider>
    )
}

export default App
