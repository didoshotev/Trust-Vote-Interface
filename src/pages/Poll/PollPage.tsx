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
    Grid,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePolls } from '../../context/Polls/PollsProvider'
import { Poll, Option } from '../../common/utils/types/Poll.type'
import { formatTime } from '../Polls/pollsHelper'
import { useTrustVoteContract } from '../../context/TrustVoteContract/TrustVoteContractProvider'
import { Web3Action } from '../../common/components/Web3Action/Web3Action'
import { usePollData } from './usePollData'
import Chart from './Chart/Chart'
import { useWeb3 } from '../../context/Web3/Web3Provider'

export const PollPage = () => {
    const [poll, setPoll] = useState<Poll | null>(null)
    const [selectedOption, setSelectedOption] = useState<Option | null>(null)
    const { id } = useParams()
    const { pollsCollection, onFetchDirtyPolls } = usePolls()
    const { trustVoteContract } = useTrustVoteContract()
    const { hasVoted } = usePollData({ pollId: id })
    const navigate = useNavigate()
    const { isWeb3Enabled } = useWeb3()

    useEffect(() => {
        const currentPoll = pollsCollection.find((item) => item.id === id)

        if (currentPoll) {
            setPoll(currentPoll)
        }
    }, [pollsCollection.length, id])

    const handleVote = async () => {
        if (!poll || !trustVoteContract) {
            return
        }

        if (!selectedOption) {
            console.error('Please select an option')
            return
        }

        try {
            await trustVoteContract.vote(+poll.id, +selectedOption.id)

            console.log('Voting for poll:', poll.id)
            console.log('Selected option:', selectedOption)
            onFetchDirtyPolls()
            navigate('/polls')
        } catch (error) {
            console.error('Error occurred while voting:', error)
        }
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
        <Grid
            templateColumns="1fr 1fr"
            gap={8}
            p={4}
            maxWidth="900px"
            mx="auto"
        >
            <Box>
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
                            This poll has expired. Voting is no longer
                            available.
                        </Text>
                    )}
                    <Box h={5}>
                        {isWeb3Enabled && hasVoted && (
                            <Text color="red" fontStyle="italic">
                                You have already voted.
                            </Text>
                        )}
                    </Box>

                    <Web3Action
                        actionCall={handleVote}
                        actionText="Vote"
                        colorScheme="blue"
                        width={'50%'}
                        actionDisabled={hasVoted}
                    />
                </VStack>
            </Box>

            <Box>
                <Heading as="h2" size="lg" mb={4}>
                    Poll Results
                </Heading>
                <Chart options={poll.options ?? []} />
            </Box>
        </Grid>
    )
}
