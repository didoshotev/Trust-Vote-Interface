import { Box, Text, Badge, Grid, Button } from '@chakra-ui/react';
import { usePollsData } from './usePollsData';
import { calculateRemainingHours, formatTime } from './pollsHelper';

export const PollsPage: React.FC = () => {
  const { pollsData, error } = usePollsData();

  if (error) {
    return (
      <Box m={10}>
        <Text>Error occurred while fetching polls. Please try again later.</Text>
      </Box>
    );
  }

  if (!pollsData || pollsData.length === 0) {
    return (
      <Box m={10}>
        <Text>No polls found.</Text>
      </Box>
    );
  }

  return (
    <Box m={10}>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {pollsData.map((poll) => {
          const remainingHours = calculateRemainingHours(poll.endTime);
          const formattedStartTime = formatTime(poll.startTime);
          const formattedEndTime = formatTime(poll.endTime);
          const isExpired = remainingHours <= 0;

          return (
            <Box
              key={poll.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="sm"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              backgroundColor="gray.700"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'md',
              }}
              position="relative"
            >
              <Box>
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  mb={2}
                  color="white"
                >
                  {poll.name}
                </Text>
                <Box mb={2}>
                  <Text color="gray.400">
                    <Badge colorScheme="green">
                      Start Time:
                    </Badge>{' '}
                    {formattedStartTime}
                  </Text>
                  <Text color="gray.400">
                    <Badge colorScheme="red">
                      End Time:
                    </Badge>{' '}
                    {formattedEndTime}
                  </Text>
                </Box>
                <Text color="white">{poll.description}</Text>
              </Box>
              <Box
                position="absolute"
                top={2}
                right={2}
                py={1}
                px={2}
                borderRadius="md"
                backgroundColor={isExpired ? 'red.600' : 'gray.600'}
              >
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color={'white'}
                >
                  {isExpired
                    ? 'Expired'
                    : `Remaining Hours: ${remainingHours}`}
                </Text>
              </Box>
              <Box mt={4}>
                <Button colorScheme="blue" mt={2}>
                  View Poll
                </Button>
              </Box>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};
