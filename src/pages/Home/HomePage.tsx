import { Flex, Container, Heading, Stack, Text, Button } from '@chakra-ui/react'
import { LandingIllustration } from './components/LandingIllustration'

export const HomePage = () => {
    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
            >
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}
                >
                    Create your poll{' '}
                    <Text as={'span'} color={'purple.400'}>
                        in seconds
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Want to ask your friends where to go Friday night or arrange
                    a meeting with co-workers? Create a poll - and get answers
                    in no time.
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <Button
                        px={6}
                        colorScheme={'purple'}
                        bg={'purple.400'}
                        _hover={{ bg: 'purple.500' }}
                    >
                        Get started
                    </Button>
                    <Button px={6}>Learn more</Button>
                </Stack>
                <Flex w={'full'}>
                    <LandingIllustration
                        height={{ sm: '24rem', lg: '28rem' }}
                        mt={{ base: 12, sm: 16 }}
                    />
                </Flex>
            </Stack>

            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
                bg={'gray.700'}
                color={'white'}
            >
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}
                >
                    Stand out with beautiful polls
                </Heading>
                <Text color={'white'} maxW={'3xl'}>
                    Make your polls visually appealing and engaging with our
                    customizable templates and designs.
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <Button
                        px={6}
                        // colorScheme={'purple'}
                        bg={'white'}
                        color={'gray.700'}
                        _hover={{ bg: 'white' }}
                    >
                        See templates
                    </Button>
                    <Button px={6} variant={'outline'} color={'white'}>
                        Learn more
                    </Button>
                </Stack>
            </Stack>
        </Container>
    )
}
