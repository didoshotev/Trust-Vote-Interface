import { useEffect, useState } from 'react'
import { useWeb3 } from '../../context/Web3/Web3Provider'
import { useTrustVoteContract } from '../../context/TrustVoteContract/TrustVoteContractProvider'

type usePollDataProps = {
    pollId?: string
}

export const usePollData = ({ pollId }: usePollDataProps) => {
    const { account, signer } = useWeb3()
    const { trustVoteContract } = useTrustVoteContract()
    const [hasVoted, setHasVoted] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            try {
                if (
                    !account ||
                    !trustVoteContract ||
                    !signer ||
                    pollId === undefined
                ) {
                    return
                }
                const hasUserVoted = await trustVoteContract.hasVoted(pollId)
                setHasVoted(hasUserVoted)
            } catch (error) {
                console.error(
                    'errro while trying check if user has voted in usePollData'
                )
                console.error(error)
            }
        }

        fetch()
    }, [account, trustVoteContract, signer])

    return {
        hasVoted,
    }
}
