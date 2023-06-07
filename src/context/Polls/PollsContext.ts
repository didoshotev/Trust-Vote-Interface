import { createContext } from 'react'
import { Poll } from '../../utils/types/Poll.type'

type PollContext = {
    pollsCollection: Poll[]
    loading: boolean
    error: boolean
}

const PollsContext = createContext<PollContext>({
    pollsCollection: [],
    error: false,
    loading: false,
})

export default PollsContext
