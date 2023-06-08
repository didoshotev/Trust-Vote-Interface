import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'

type Option = {
    id: string
    name: string
    count: number
}

type ChartProps = {
    options: Option[]
}

const Chart: React.FC<ChartProps> = ({ options }) => {
    const totalVotes = options.reduce(
        (total, option) => total + option.count,
        0
    )

    return (
        <VStack align="stretch" spacing={4} width={'100%'}>
            {options.map((option) => {
                const percentage = (option.count / totalVotes) * 100

                return (
                    <Flex key={option.id} align="center">
                        <Box flex="1" width={'100%'}>
                            <Text fontSize="lg" fontWeight="medium">
                                {option.name}
                            </Text>
                            <Box
                                h="18px"
                                bg="gray.200"
                                borderRadius="3xl"
                                mt={2}
                                overflow="hidden"
                            >
                                <Box
                                    h="100%"
                                    bg="blue.500"
                                    borderRadius="md"
                                    width={`${percentage}%`}
                                    position="relative"
                                >
                                    <Text
                                        position="absolute"
                                        top="50%"
                                        left="50%"
                                        transform="translate(-50%, -50%)"
                                        color="white"
                                        fontSize="xs"
                                    >
                                        {`${percentage.toFixed(1)}%`}
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    </Flex>
                )
            })}
        </VStack>
    )
}

export default Chart
