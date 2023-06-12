import { useState, useEffect, useContext } from 'react'
import { useWeb3 } from '../Web3/Web3Provider'
import TrustVoteContractContext from './TrustVoteContractContext'
import TrustVoteAuthContract from '../../common/models/TrustVoteAuthContract/TrustVoteAuthContract'
import { getWeb3Config } from '../../utils/getWeb3Config'
import TrustVoteContract from '../../common/models/TrustVoteContract/TrustVoteContract'
import { Contract } from 'ethers'

const TrustVoteContractProvider = ({ children }: { children: any }) => {
    const [trustVoteContract, setTrustVoteContract] =
        useState<TrustVoteContract | null>(null)
    const [trustVoteAuthContract, setTrustVoteAuthContract] =
        useState<TrustVoteAuthContract | null>(null)

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
    }, [signer, account])

    const connectToContract = async () => {
        const currentConfig = getWeb3Config(chainId)

        if (!currentConfig?.deployments) {
            console.log('MISSING DEPLOYMENTS AT connectDEFO')
            return
        }
        const signerOrProvider = signer ? signer : provider
        const trustVoteInstance = new TrustVoteContract(
            currentConfig.deployments.trustVote.address,
            currentConfig.deployments.trustVote.abi,
            signerOrProvider
        )
        const trustVoteAuthInstance = new TrustVoteAuthContract(
            currentConfig.deployments.trustVoteAuth.address,
            currentConfig.deployments.trustVoteAuth.abi,
            signerOrProvider
        )
        setTrustVoteContract(trustVoteInstance)
        setTrustVoteAuthContract(trustVoteAuthInstance)
    }

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
