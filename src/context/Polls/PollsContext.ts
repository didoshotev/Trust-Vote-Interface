import { createContext } from 'react'
import { Poll } from '../../utils/types/Poll.type'

type PollContext = {
    pollsCollection: Poll[]
    loading: boolean
    error: boolean
    onFetchDirtyPolls: () => void
}

const PollsContext = createContext<PollContext>({
    pollsCollection: [],
    error: false,
    loading: false,
    onFetchDirtyPolls: () => {},
})

export default PollsContext
