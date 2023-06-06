import { useEffect, useState } from 'react'
import { Poll, Option } from '../../utils/types/Poll.type'
import { useTrustVoteContract } from '../../context/TrustVoteContract/TrustVoteContractProvider'
import { BigNumber } from 'ethers'

export const usePollsData = () => {
    const { trustVoteContract } = useTrustVoteContract()
    const [pollsCollection, setPollsCollection] = useState<Poll[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!trustVoteContract) return

        const fetchPollsData = async () => {
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
                                votes: {}, // Initialize votes property
                            }
                            return poll
                        } catch (error) {
                            // Handle error for individual poll
                            console.error(
                                `Error fetching poll details for poll ID ${pollId}:`,
                                error
                            )
                            return null
                        }
                    })
                )

                const filteredPolls = polls.filter((poll) => poll !== null)

                setPollsCollection(filteredPolls)
                setError(null)
            } catch (error) {
                // Handle overall error
                console.error('Error fetching polls data:', error)
                setError('Error fetching polls data')
            }
        }

        fetchPollsData()
    }, [trustVoteContract])

    return {
        pollsData: pollsCollection,
        error,
    }
}
