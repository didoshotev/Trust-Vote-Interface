import { useEffect, useState } from 'react'
import {
    Box,
    Heading,
    Text,
    VStack,
    Radio,
    RadioGroup,
    Badge,
    List,
    ListItem,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePolls } from '../../context/Polls/PollsProvider'
import { Poll, Option } from '../../utils/types/Poll.type'
import { formatTime } from '../Polls/pollsHelper'
import { useTrustVoteContract } from '../../context/TrustVoteContract/TrustVoteContractProvider'
import { Web3Action } from '../../components/Web3Action/Web3Action'
import { usePollData } from './usePollData'

export const PollPage = () => {
    const [poll, setPoll] = useState<Poll | null>(null)
    const [selectedOption, setSelectedOption] = useState<Option | null>(null)
    const { id } = useParams()
    const { pollsCollection } = usePolls()
    const { trustVoteContract } = useTrustVoteContract()
    const { hasVoted } = usePollData({ pollId: id })
    const navigate = useNavigate()

    useEffect(() => {
        const currentPoll = pollsCollection.find((item) => item.id === id)

        if (currentPoll) {
            setPoll(currentPoll)
        }
    }, [pollsCollection.length, id])

    const handleVote = async () => {
        if (!poll) {
            return
        }

        if (!selectedOption) {
            console.error('Please select an option')
            return
        }
        try {
            const transaction = await trustVoteContract.vote(
                poll.id,
                selectedOption.id
            )

            await transaction.wait()

            console.log('Voting for poll:', poll.id)
            console.log('Selected option:', selectedOption)
            navigate('/polls')
        } catch (error) {
            console.error('Error occurred while voting:', error)
        }

        console.log('Voting for poll:', poll?.id)
        console.log('Selected option:', selectedOption)
    }

    const handleChangeOption = (value: string) => {
        const currentOption =
            poll?.options && poll?.options.find((item) => item.id === value)
        if (currentOption) {
            setSelectedOption(currentOption)
        }
    }

    if (!poll) {
        return <Box>Loading....</Box>
    }

    const formattedStartTime = formatTime(poll.startTime)
    const formattedEndTime = formatTime(poll.endTime)
    const isExpired = new Date(poll.endTime) < new Date()

    return (
        <Box p={4} maxWidth="500px" mx="auto">
            <Heading as="h1" size="xl" mb={4}>
                {poll.name}
            </Heading>
            <Box mb={4}>
                <Text color="gray.400">
                    <Badge colorScheme="green">Start Time:</Badge>{' '}
                    {formattedStartTime}
                </Text>
                <Text color="gray.400">
                    <Badge colorScheme="red">End Time:</Badge>{' '}
                    {formattedEndTime}
                </Text>
            </Box>
            <Text fontSize="lg" mb={4}>
                {poll.description}
            </Text>

            <VStack align="start" spacing={4} mt={4}>
                <Text fontSize="lg" fontWeight="bold">
                    Vote Options
                </Text>
                <RadioGroup
                    value={selectedOption?.id}
                    onChange={handleChangeOption}
                >
                    <List spacing={2}>
                        {poll.options &&
                            poll.options.map((option: Option) => (
                                <ListItem key={option.id}>
                                    <Radio
                                        value={option.id}
                                        size="lg"
                                        colorScheme="blue"
                                    >
                                        {option.name}
                                    </Radio>
                                </ListItem>
                            ))}
                    </List>
                </RadioGroup>

                {isExpired && (
                    <Text color="red" fontStyle="italic">
                        This poll has expired. Voting is no longer available.
                    </Text>
                )}

                {hasVoted && (
                    <Text color="red" fontStyle="italic">
                        You have already voted.
                    </Text>
                )}

                <Web3Action
                    actionCall={handleVote}
                    actionText="Vote"
                    colorScheme="blue"
                    width={'50%'}
                    actionDisabled={hasVoted}
                />
            </VStack>
        </Box>
    )
}
