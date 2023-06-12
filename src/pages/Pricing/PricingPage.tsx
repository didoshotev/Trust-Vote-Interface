import { ReactNode } from 'react'
import {
    Box,
    Stack,
    HStack,
    Heading,
    Text,
    VStack,
    useColorModeValue,
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { AUTH_TYPES, User } from '../../utils/types/User.type'
import { useTrustVoteContract } from '../../context/TrustVoteContract/TrustVoteContractProvider'
import { Web3Action } from '../../components/Web3Action/Web3Action'
import { ethers } from 'ethers'
import { useUser } from '../../context/User/UserProvider'
import { useNavigate } from 'react-router-dom'

export const PricingPage = () => {
    const { trustVoteAuthContract } = useTrustVoteContract()
    const { user, updateUser } = useUser()
    const navigate = useNavigate()

    const handleStartTrial = async (planId: number) => {
        // Check if the user already has the plan
        if (user && user.planId === planId) {
            console.log('Already active:', planId)
            return
        }

        let tx
        if (planId === AUTH_TYPES.BRONZE) {
            tx = await trustVoteAuthContract.authenticate(planId, {
                value: ethers.utils.parseEther('0.1'),
            })
        } else if (planId === AUTH_TYPES.SILVER) {
            tx = await trustVoteAuthContract.authenticate(planId, {
                value: ethers.utils.parseEther('1'),
            })
        } else if (planId === AUTH_TYPES.GOLD) {
            tx = await trustVoteAuthContract.authenticate(planId, {
                value: ethers.utils.parseEther('2'),
            })
        }
        const receipt = await tx.wait()

        // Access the event logs
        const event = receipt.events.find(
            (event: any) => event.event === 'UserAuthenticated'
        )
        if (event) {
            const { user, planId } = event.args
            console.log('Plan ID:', planId)
        }
        const newUser: User = {
            isAuthenticated: true,
            planId: Number(planId),
            activePollIds: [],
        }
        updateUser(newUser)
        navigate('/')
    }

    const getButtonLabel = (planId: number) => {
        if (user && user.planId === planId) {
            return 'Active'
        } else {
            return 'Purchase'
        }
    }

    const getButtonColorScheme = (planId: number) => {
        if (user && user.planId === planId) {
            return 'green'
        } else {
            return 'blue'
        }
    }

    return (
        <Box py={12}>
            <VStack spacing={2} textAlign="center">
                <Heading as="h1" fontSize="4xl">
                    Plans that fit your need
                </Heading>
                <Text fontSize="lg" color={'gray.500'}>
                    Start with 14-day free trial. No credit card needed. Cancel
                    at anytime.
                </Text>
            </VStack>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                textAlign="center"
                justify="center"
                spacing={{ base: 4, lg: 10 }}
                py={10}
            >
                <PriceWrapper>
                    <Box py={4} px={12}>
                        <Text fontWeight="500" fontSize="2xl">
                            Hobby
                        </Text>
                        <HStack justifyContent="center">
                            <Text fontSize="3xl" fontWeight="600">
                                $
                            </Text>
                            <Text fontSize="5xl" fontWeight="900">
                                19
                            </Text>
                            <Text fontSize="3xl" color="gray.500">
                                /month
                            </Text>
                        </HStack>
                    </Box>
                    <VStack
                        bg={useColorModeValue('gray.50', 'gray.700')}
                        py={4}
                        borderBottomRadius={'xl'}
                    >
                        <List spacing={3} textAlign="start" px={12}>
                            <ListItem>
                                <ListIcon
                                    as={CheckCircleIcon}
                                    color="green.500"
                                />
                                Secured by Blockchain
                            </ListItem>
                            <ListItem>
                                <ListIcon
                                    as={CheckCircleIcon}
                                    color="green.500"
                                />
                                Fully transparent
                            </ListItem>
                        </List>
                        <Box w="80%" pt={7}>
                            <Web3Action
                                actionCall={() =>
                                    handleStartTrial(AUTH_TYPES.BRONZE)
                                }
                                actionText={getButtonLabel(AUTH_TYPES.BRONZE)}
                                colorScheme={getButtonColorScheme(
                                    AUTH_TYPES.BRONZE
                                )}
                                variant={
                                    user && user.planId === AUTH_TYPES.BRONZE
                                        ? 'solid'
                                        : 'outline'
                                }
                                w="full"
                            />
                        </Box>
                    </VStack>
                </PriceWrapper>

                <PriceWrapper>
                    <Box position="relative">
                        <Box
                            position="absolute"
                            top="-16px"
                            left="50%"
                            style={{ transform: 'translate(-50%)' }}
                        >
                            <Text
                                textTransform="uppercase"
                                bg={useColorModeValue(
                                    'purple.300',
                                    'purple.700'
                                )}
                                px={3}
                                py={1}
                                color={useColorModeValue(
                                    'gray.900',
                                    'gray.300'
                                )}
                                fontSize="sm"
                                fontWeight="600"
                                rounded="xl"
                            >
                                Most Popular
                            </Text>
                        </Box>
                        <Box py={4} px={12}>
                            <Text fontWeight="500" fontSize="2xl">
                                Growth
                            </Text>
                            <HStack justifyContent="center">
                                <Text fontSize="3xl" fontWeight="600">
                                    $
                                </Text>
                                <Text fontSize="5xl" fontWeight="900">
                                    149
                                </Text>
                                <Text fontSize="3xl" color="gray.500">
                                    /month
                                </Text>
                            </HStack>
                        </Box>
                        <VStack
                            bg={useColorModeValue('gray.50', 'gray.700')}
                            py={4}
                            borderBottomRadius={'xl'}
                        >
                            <List spacing={3} textAlign="start" px={12}>
                                <ListItem>
                                    <ListIcon
                                        as={CheckCircleIcon}
                                        color="green.500"
                                    />
                                    Real time results
                                </ListItem>
                                <ListItem>
                                    <ListIcon
                                        as={CheckCircleIcon}
                                        color="green.500"
                                    />
                                    Fully transparent
                                </ListItem>
                                <ListItem>
                                    <ListIcon
                                        as={CheckCircleIcon}
                                        color="green.500"
                                    />
                                    Extra configuration options
                                </ListItem>
                            </List>
                            <Box w="80%" pt={7}>
                                <Web3Action
                                    actionCall={() =>
                                        handleStartTrial(AUTH_TYPES.SILVER)
                                    }
                                    actionText={getButtonLabel(
                                        AUTH_TYPES.SILVER
                                    )}
                                    colorScheme={getButtonColorScheme(
                                        AUTH_TYPES.SILVER
                                    )}
                                    variant={
                                        user &&
                                        user.planId === AUTH_TYPES.SILVER
                                            ? 'solid'
                                            : 'outline'
                                    }
                                    w="full"
                                />
                            </Box>
                        </VStack>
                    </Box>
                </PriceWrapper>
                <PriceWrapper>
                    <Box py={4} px={12}>
                        <Text fontWeight="500" fontSize="2xl">
                            Scale
                        </Text>
                        <HStack justifyContent="center">
                            <Text fontSize="3xl" fontWeight="600">
                                $
                            </Text>
                            <Text fontSize="5xl" fontWeight="900">
                                349
                            </Text>
                            <Text fontSize="3xl" color="gray.500">
                                /month
                            </Text>
                        </HStack>
                    </Box>
                    <VStack
                        bg={useColorModeValue('gray.50', 'gray.700')}
                        py={4}
                        borderBottomRadius={'xl'}
                    >
                        <List spacing={3} textAlign="start" px={12}>
                            <ListItem>
                                <ListIcon
                                    as={CheckCircleIcon}
                                    color="green.500"
                                />
                                Customizable
                            </ListItem>
                            <ListItem>
                                <ListIcon
                                    as={CheckCircleIcon}
                                    color="green.500"
                                />
                                24/7 support
                            </ListItem>
                        </List>
                        <Box w="80%" pt={7}>
                            <Web3Action
                                actionCall={() =>
                                    handleStartTrial(AUTH_TYPES.GOLD)
                                }
                                actionText={getButtonLabel(AUTH_TYPES.GOLD)}
                                colorScheme={getButtonColorScheme(
                                    AUTH_TYPES.GOLD
                                )}
                                variant={
                                    user && user.planId === AUTH_TYPES.GOLD
                                        ? 'solid'
                                        : 'outline'
                                }
                                w="full"
                            />
                        </Box>
                    </VStack>
                </PriceWrapper>
            </Stack>
        </Box>
    )
}

const PriceWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <Box
            mb={4}
            shadow="base"
            borderWidth="1px"
            alignSelf={{ base: 'center', lg: 'flex-start' }}
            borderColor={useColorModeValue('gray.200', 'gray.500')}
            borderRadius={'xl'}
        >
            {children}
        </Box>
    )
}
