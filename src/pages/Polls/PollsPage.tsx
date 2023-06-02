import { Box, Text, Badge, Grid, useColorModeValue, Button } from "@chakra-ui/react";
import { format } from "date-fns";

interface Poll {
  name: string;
  startTime: string;
  endTime: string;
  description: string;
}

const pollsData: Poll[] = [
  {
    name: "Poll 1",
    startTime: "2023-06-01 08:00:00",
    endTime: "2023-06-01 18:00:00",
    description: "This is the description for Poll 1.",
  },
  {
    name: "Poll 2",
    startTime: "2023-06-02 10:00:00",
    endTime: "2023-06-02 20:00:00",
    description: "This is the description for Poll 2.",
  },
];

export const PollsPage: React.FC = () => {
  const boxBgColor = useColorModeValue("white", "gray.700");
  const badgeColorScheme = useColorModeValue("green", "teal");

  const calculateRemainingHours = (endTime: string): number => {
    const endDateTime = new Date(endTime);
    const currentTime = new Date();
    const timeDiff = endDateTime.getTime() - currentTime.getTime();
    const remainingHours = Math.ceil(timeDiff / (1000 * 60 * 60));
    return remainingHours;
  };

  const formatTime = (time: string): string => {
    const formattedTime = format(new Date(time), "dd MMMM yyyy, HH:mm");
    return formattedTime;
  };

  return (
    <Box m={10}>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {pollsData.map((poll: Poll, index: number) => {
          const remainingHours = calculateRemainingHours(poll.endTime);
          const isExpired = remainingHours <= 0;
          const formattedStartTime = formatTime(poll.startTime);
          const formattedEndTime = formatTime(poll.endTime);
          return (
            <Box
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="sm"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              backgroundColor={boxBgColor}
              transition="all 0.3s"
              _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              position="relative"
            >
              <Box>
                <Text fontWeight="bold" fontSize="lg" mb={2} color={useColorModeValue("black", "white")}>
                  {poll.name}
                </Text>
                <Box mb={2}>
                  <Text color={useColorModeValue("gray.500", "gray.400")}>
                    <Badge colorScheme={badgeColorScheme}>Start Time:</Badge>{" "}
                    {formattedStartTime}
                  </Text>
                  <Text color={useColorModeValue("gray.500", "gray.400")}>
                    <Badge colorScheme="red">End Time:</Badge> {formattedEndTime}
                  </Text>
                </Box>
                <Text color={useColorModeValue("black", "white")}>{poll.description}</Text>
              </Box>
              <Box
                position="absolute"
                top={2}
                right={2}
                bg={isExpired ? useColorModeValue("red.200", "red.600") : useColorModeValue("gray.200", "gray.600")}
                py={1}
                px={2}
                borderRadius="md"
              >
                <Text fontSize="sm" color={isExpired ? useColorModeValue("red.700", "white") : useColorModeValue("gray.700", "white")} fontWeight="bold">
                  {isExpired ? "Expired" : `Remaining Hours: ${remainingHours}`}
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
