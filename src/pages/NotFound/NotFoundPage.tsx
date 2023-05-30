import {
    ChakraProvider,
    Box,
    Flex,
    Heading,
    Text,
    Button,
} from '@chakra-ui/react'

const NotFoundPage = () => {
    return (
        <ChakraProvider>
            <Flex
                minHeight="100vh"
                align="center"
                justify="center"
                bg="gray.100"
            >
                <Box
                    p={8}
                    maxWidth="md"
                    borderWidth={1}
                    borderRadius="md"
                    bg="white"
                >
                    <Heading as="h1" size="2xl" textAlign="center">
                        Oops, page not found!
                    </Heading>
                    <Text mt={4} fontSize="xl" textAlign="center">
                        The page you are looking for does not exist.
                    </Text>
                    <Box textAlign={'center'}>
                        <Button
                            mt={8}
                            colorScheme="blue"
                            alignSelf="center"
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </ChakraProvider>
    )
}

export default NotFoundPage
