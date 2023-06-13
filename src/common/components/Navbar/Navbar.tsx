import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Icon,
    Link as ChakraLink,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Web3Action } from '../Web3Action/Web3Action'
import { useWeb3 } from '../../../context/Web3/Web3Provider'
import { Link } from 'react-router-dom'

export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure()
    const { isWeb3Enabled } = useWeb3()

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'start' }}
                >
                    <Link to={'/'}>
                        <Text
                            textAlign={useBreakpointValue({
                                base: 'center',
                                md: 'left',
                            })}
                            fontFamily={'heading'}
                            color={useColorModeValue('gray.800', 'white')}
                        >
                            TrustVote
                        </Text>
                    </Link>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                >
                    <Web3Action
                        actionCall={() => {}}
                        actionText={'Wallet Connected'}
                        colorScheme={isWeb3Enabled ? 'green' : 'blue'}
                    />
                </Stack>
            </Flex>
        </Box>
    )
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'white')
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <ChakraLink
                                as={Link}
                                to={navItem.href ?? '#'}
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}
                            >
                                {navItem.label}
                            </ChakraLink>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav
                                            key={child.label}
                                            {...child}
                                        />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <ChakraLink
            as={Link}
            to={href ?? '#'}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('purple.50', 'gray.900') }}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'purple.400' }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{
                        opacity: '100%',
                        transform: 'translateX(0)',
                    }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}
                >
                    <Icon
                        color={'purple.400'}
                        w={5}
                        h={5}
                        as={ChevronRightIcon}
                    />
                </Flex>
            </Stack>
        </ChakraLink>
    )
}

interface NavItem {
    label: string
    subLabel?: string
    children?: Array<NavItem>
    href?: string
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Create poll',
        children: [
            {
                label: 'Create Voting Poll',
                subLabel: 'Security free voting polls',
                href: '/createPoll',
            },
            {
                label: 'New & Noteworthy',
                subLabel: 'Up-and-coming Designers',
                href: '#',
            },
        ],
    },
    {
        label: 'Pricing',
        href: '/pricing',
    },
    {
        label: 'All polls',
        href: '/polls',
    },
]
