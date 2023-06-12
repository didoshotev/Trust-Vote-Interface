import { createContext } from 'react'
import TrustVoteAuthContract from '../../common/models/TrustVoteAuthContract/TrustVoteAuthContract'
import TrustVoteContract from '../../common/models/TrustVoteContract/TrustVoteContract'

type TrustVoteContractContext = {
    trustVoteContract: TrustVoteContract | null
    trustVoteAuthContract: TrustVoteAuthContract | null
}

const TrustVoteContractContext = createContext<TrustVoteContractContext>({
    trustVoteAuthContract: null,
    trustVoteContract: null,
})

export default TrustVoteContractContext
