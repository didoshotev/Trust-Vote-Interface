import { Button, ButtonProps } from '@chakra-ui/react'
import { useWeb3 } from '../../context/Web3/Web3Provider'

type Web3ActionProps = {
    actionCall: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    actionText: string
    actionDisabled?: boolean
} & ButtonProps

export const Web3Action = ({
    actionCall,
    actionText,
    actionDisabled = false,
    ...buttonProps
}: Web3ActionProps) => {
    const { connectWeb3, isWeb3Enabled } = useWeb3()

    const handleConnectWallet = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()
        await connectWeb3()
    }

    return (
        <Button
            onClick={!isWeb3Enabled ? handleConnectWallet : actionCall}
            type="submit"
            isDisabled={isWeb3Enabled && actionDisabled}
            {...buttonProps}
        >
            {!isWeb3Enabled ? 'Connect Wallet' : actionText}
        </Button>
    )
}
