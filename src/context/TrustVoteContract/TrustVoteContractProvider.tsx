'use client'
import { useState, useEffect, useContext } from 'react'
import { useWeb3 } from '../Web3/Web3Provider'
import {
    DEFAULT_NETWORK_ID,
    NETWORK_MAPPER,
    SUPPORTED_NETWORKS,
} from '../../utils/constants'
import { Contract } from 'ethers'
import TrustVoteContractContext from './TrustVoteContractContext'

const TrustVoteContractProvider = ({ children }: { children: any }) => {
    const [trustVoteContract, setTrustVoteContract] = useState<any>(null)
    const [trustVoteAuthContract, setTrustVoteAuthContract] =
        useState<any>(null)

    const { signer, provider, isWeb3Enabled, chainId, account } = useWeb3()

    // INITIALIZE TrustVote
    useEffect(() => {
        const connect = async () => {
            if (provider && trustVoteContract === null && !signer) {
                await connectToContract()
            }
        }
        connect()
    }, [account, provider, chainId])

    useEffect(() => {
        const connect = async () => {
            if (isWeb3Enabled && signer) {
                await connectToContract()
            }
        }
        connect()
    }, [signer])

    const connectToContract = async () => {
        const networkName = NETWORK_MAPPER[chainId || DEFAULT_NETWORK_ID]
        const currentConfig = SUPPORTED_NETWORKS[networkName]

        if (!currentConfig?.deployments) {
            console.log('MISSING DEPLOYMENTS AT connectDEFO')
            return
        }
        const signerOrProvider = signer ? signer : provider
        const trustVoteInstance = new Contract(
            currentConfig.deployments.trustVote.address,
            currentConfig.deployments.trustVote.abi,
            signerOrProvider
        )
        const trustVoteAuthInstance = new Contract(
            currentConfig.deployments.trustVoteAuth.address,
            currentConfig.deployments.trustVoteAuth.abi,
            signerOrProvider
        )

        setTrustVoteContract(trustVoteInstance)
        setTrustVoteAuthContract(trustVoteAuthInstance)
    }

    useEffect(() => {
        const fetch = async () => {
            if (!trustVoteAuthContract) {
                return
            }
            const isAuthenticated =
                await trustVoteAuthContract.isUserAuthenticated()
            console.log('isAuthenticated: ', isAuthenticated)
        }

        fetch()
    }, [trustVoteAuthContract])

    return (
        <TrustVoteContractContext.Provider
            value={{ trustVoteContract, trustVoteAuthContract }}
        >
            {children}
        </TrustVoteContractContext.Provider>
    )
}

const useTrustVoteContract = () => {
    const context = useContext(TrustVoteContractContext)
    if (context === undefined) {
        throw new Error(
            'useTrustVoteContract must be used within a TrustVoteContractProvider!'
        )
    }
    return context
}

export { TrustVoteContractProvider, useTrustVoteContract }
