import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useWeb3 } from '../../../../context/Web3/Web3Provider'
import { Web3Action } from '../../../../components/Web3Action/Web3Action'

type AccessModalProps = {
    isOpen: boolean
    onClose: () => void
}

export const AccessModal = ({ isOpen, onClose }: AccessModalProps) => {
    const { isWeb3Enabled } = useWeb3()
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            closeOnOverlayClick={false}
            closeOnEsc={false}
        >
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(4px)" />
            <ModalContent>
                <ModalHeader>Subscription Required</ModalHeader>
                <ModalBody>
                    A subscription is required to create a poll. Please visit
                    the pricing page to subscribe.
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                    <Button
                        as={Link}
                        to="/pricing"
                        colorScheme="blue"
                        mr={3}
                        onClick={onClose}
                        width="100%"
                    >
                        Go to Pricing
                    </Button>
                    {!isWeb3Enabled ? (
                        <Web3Action
                            actionCall={() => {}}
                            actionText=""
                            width="100%"
                        />
                    ) : null}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
