import { useState } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Textarea,
    Button,
    VStack,
    Box,
    Flex,
    Heading,
} from '@chakra-ui/react'
import { useWeb3 } from '../../context/Web3/Web3Provider'
import { useTrustVoteContract } from '../../context/TrustVoteContract/TrustVoteContractProvider'
import {
    convertToUnixTimestamp,
    formatDateToYYYYMMDD,
} from '../../utils/helper'
import { AddPollOptions } from './components/AddPollOption/AddPollOption'

type CreatePollFormType = {
    title: string
    description: string
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    options: string[]
}

export const CreatePollPage = () => {
    const { connectWeb3, isWeb3Enabled } = useWeb3()
    const { trustVoteContract } = useTrustVoteContract()
    const [formData, setFormData] = useState<CreatePollFormType>({
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        options: [''],
    })

    const [formError, setFormError] = useState({ field: null, message: null })

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleCreatePoll = async (event: any) => {
        event.preventDefault()

        const startTime = convertToUnixTimestamp(
            formData.startDate,
            formData.startTime
        )
        const endTime = convertToUnixTimestamp(
            formData.endDate,
            formData.endTime
        )
        if (startTime > endTime) {
            console.log('Invalid Time slots')
            return
        }

        const tx = await trustVoteContract.createPoll(
            formData.title,
            formData.description,
            startTime,
            endTime,
            formData.options
        )
        await tx.wait()
        console.log('Poll created successfully!')
        setFormData({
            title: '',
            description: '',
            startDate: formatDateToYYYYMMDD(new Date()),
            startTime: '',
            endDate: '',
            endTime: '',
            options: [''],
        })
    }

    const handleConnectWallet = async (event: any) => {
        event.preventDefault()
        await connectWeb3()
    }

    const handleAddOption = () => {
        setFormData({ ...formData, options: [...formData.options, ''] })
    }

    const handleRemoveOption = (index: number) => {
        const updatedOptions = [...formData.options]
        updatedOptions.splice(index, 1)
        setFormData({ ...formData, options: updatedOptions })
    }

    const handleChangeOption = (index: number, value: string) => {
        const updatedOptions = [...formData.options]
        updatedOptions[index] = value
        setFormData({ ...formData, options: updatedOptions })
    }

    return (
        <Box mt={10}>
            <Heading as="h2" size={'xl'} mb={6} textAlign={'center'}>
                Create a poll
            </Heading>
            <Heading
                as={'h5'}
                size={'sm'}
                textAlign={'center'}
                color={'gray.500'}
            >
                Complete the below fields to create your poll.
            </Heading>
            <Box
                w="70%"
                bg="gray.800"
                borderRadius="lg"
                p={8}
                m={'40px auto 0px auto'}
            >
                <VStack
                    as="form"
                    onSubmit={
                        !isWeb3Enabled ? handleConnectWallet : handleCreatePoll
                    }
                    spacing={6}
                >
                    <FormControl isInvalid={formError?.field === 'title'}>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage>
                            {formError?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formError?.field === 'description'}>
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage>
                            {formError?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl
                        style={{ display: 'flex' }}
                        isInvalid={formError?.field === 'startDate'}
                    >
                        <FormLabel htmlFor="startDate">Start Date</FormLabel>
                        <input
                            type="date"
                            id="start-date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            min={Date.now()}
                        />
                        <FormLabel htmlFor="startTime">Start Time</FormLabel>
                        <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl
                        style={{ display: 'flex' }}
                        isInvalid={formError?.field === 'endDate'}
                    >
                        <FormLabel htmlFor="endDate">End Date</FormLabel>
                        <input
                            type="date"
                            id="end-date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            min={Date.now()}
                        />
                        <FormLabel htmlFor="endTime">End Time</FormLabel>
                        <input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl>
                        <AddPollOptions
                            options={formData.options}
                            addOption={handleAddOption}
                            removeOption={handleRemoveOption}
                            changeOption={handleChangeOption}
                        />
                    </FormControl>

                    <Flex w="100%">
                        <Button
                            onClick={
                                !isWeb3Enabled
                                    ? handleConnectWallet
                                    : handleCreatePoll
                            }
                            colorScheme="blue"
                            width={'25%'}
                            type="submit"
                            mr="5"
                        >
                            {!isWeb3Enabled
                                ? 'Connect Wallet'
                                : 'Create a poll'}
                        </Button>
                        <Button type="submit" width={'25%'}>
                            Save as draft
                        </Button>
                    </Flex>
                </VStack>
            </Box>
        </Box>
    )
}
