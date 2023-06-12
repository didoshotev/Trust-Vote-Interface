import { ReactNode, useContext, useEffect, useState } from 'react'
import UserContext from './UserContext'
import { useTrustVoteContract } from '../TrustVoteContract/TrustVoteContractProvider'
import { useWeb3 } from '../Web3/Web3Provider'
import { AUTH_TYPES, User } from '../../utils/types/User.type'
import { usePolls } from '../Polls/PollsProvider'

const UserProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const [userState, setUserState] = useState<User | null>(null)
    const { trustVoteAuthContract } = useTrustVoteContract()
    const { isWeb3Enabled, signer, account } = useWeb3()
    const { pollsCollection } = usePolls()

    useEffect(() => {
        const getUserState = async () => {
            if (!signer || !isWeb3Enabled) {
                setUserState(null)
                return
            }
            const isAuthenticated =
                await trustVoteAuthContract.isUserAuthenticated()

            const currentPlanId = isAuthenticated
                ? Number(await trustVoteAuthContract.getCurrentPlan())
                : AUTH_TYPES.NONE

            const currentPolls = pollsCollection
                .filter(
                    (poll) => poll.admin.toLowerCase() === account.toLowerCase()
                )
                .map((poll) => +poll.id)

            const user: User = {
                isAuthenticated,
                planId: currentPlanId,
                activePollIds: currentPolls,
            }
            setUserState(user)
        }

        getUserState()
    }, [trustVoteAuthContract, isWeb3Enabled, signer])

    return (
        <UserContext.Provider value={{ user: userState }}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error(`Cannot use the Web3 Context`)
    }
    return context
}

export { UserProvider, useUser }
