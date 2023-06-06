import { ChangeEvent } from 'react'
import { Box, Flex, Input, IconButton } from '@chakra-ui/react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'

type AddPollOptionsProps = {
    options: string[]
    addOption: () => void
    removeOption: (index: number) => void
    changeOption: (index: number, value: string) => void
}

export const AddPollOptions = ({
    options,
    addOption,
    removeOption,
    changeOption,
}: AddPollOptionsProps) => {
    return (
        <Box width={'65%'}>
            {options.map((option, index) => (
                <Flex key={index} mb={2}>
                    <Input
                        value={option}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            changeOption(index, e.target.value)
                        }
                        placeholder={`Option ${index + 1}`}
                        mr={2}
                    />
                    {index === options.length - 1 && (
                        <IconButton
                            icon={<AddIcon />}
                            onClick={addOption}
                            aria-label="Add Option"
                        />
                    )}
                    {index !== options.length - 1 && (
                        <IconButton
                            icon={<CloseIcon />}
                            onClick={() => removeOption(index)}
                            aria-label="Remove Option"
                        />
                    )}
                </Flex>
            ))}
        </Box>
    )
}
