import { useContext, useEffect, useState } from 'react'
import PollsContext from './PollsContext'
import { Poll } from '../../common/utils/types/Poll.type'
import { useTrustVoteContract } from '../TrustVoteContract/TrustVoteContractProvider'
import { BigNumber } from 'ethers'

const PollsProvider = ({ children }: { children: React.ReactNode }) => {
    const [pollsCollection, setPollsCollection] = useState<Poll[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { trustVoteContract } = useTrustVoteContract()
    const [triggerUpdate, setTriggerUpdate] = useState(false)

    const onFetchDirtyPolls = () => {
        setTriggerUpdate(!triggerUpdate)
    }

    useEffect(() => {
        if (!trustVoteContract) return

        const fetchPollsData = async () => {
            setLoading(true)
            setError(false)

            try {
                const pollIds = await trustVoteContract.getAllPollIds()

                const polls = await Promise.all(
                    pollIds.map(async (pollId: BigNumber) => {
                        try {
                            const [
                                name,
                                description,
                                startTime,
                                endTime,
                                admin,
                                isActive,
                                options,
                                voteCounts,
                            ] = await trustVoteContract.getPollDetails(
                                pollId.toNumber()
                            )

                            const startDate = new Date(
                                startTime * 1000
                            ).toISOString()
                            const endDate = new Date(
                                endTime * 1000
                            ).toISOString()

                            const formattedOptions = options.map(
                                (item: any) => {
                                    return {
                                        name: item.name.toString(),
                                        id: item.id.toString(),
                                        count: +item.count,
                                    }
                                }
                            )

                            const poll: Poll = {
                                id: pollId.toString(),
                                name: name,
                                description,
                                startTime: startDate,
                                endTime: endDate,
                                admin: admin,
                                options: formattedOptions,
                                votes: {},
                            }
                            return poll
                        } catch (error) {
                            console.error(
                                `Error fetching poll details for poll ID ${pollId}:`,
                                error
                            )
                            return null
                        }
                    })
                )
                const filteredPolls = polls.filter(
                    (poll) => poll !== null
                ) as Poll[]
                setPollsCollection(filteredPolls)
            } catch (error) {
                console.error('Error fetching polls data:', error)
                setError(true) // Updated to true
            } finally {
                setLoading(false)
            }
        }

        fetchPollsData()
    }, [trustVoteContract, triggerUpdate])

    return (
        <PollsContext.Provider
            value={{ pollsCollection, loading, error, onFetchDirtyPolls }}
        >
            {children}
        </PollsContext.Provider>
    )
}

const usePolls = () => {
    const context = useContext(PollsContext)
    if (context === undefined) {
        throw new Error('usePolls must be used within a PollsProvider!')
    }
    return context
}

export { PollsProvider, usePolls }
