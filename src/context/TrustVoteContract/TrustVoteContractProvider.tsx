'use client'
import { useState, useEffect, useContext } from 'react'
import { useWeb3 } from '../Web3/Web3Provider'
import { NETWORK_MAPPER, SUPPORTED_NETWORKS } from '../../utils/constants'
import { Contract } from 'ethers'
import TrustVoteContractContext from './TrustVoteContractContext'

const TrustVoteContractProvider = ({ children }: { children: any }) => {
    const [trustVoteContract, setTrustVoteContract] = useState<any>(null)

    const { signer, provider, isWeb3Enabled, chainId, account } = useWeb3()

    // INITIALIZE TrustVote
    useEffect(() => {
        console.log('signer: ', signer)
        console.log('provider: ', provider);
        if (isWeb3Enabled && provider && trustVoteContract === null) {
            connectToContract()
        }
        // if(signer) { 
            // connectToContract()
        // }
    }, [account, signer, provider, chainId])

    const connectToContract = async () => {
        const networkName = NETWORK_MAPPER[chainId]
        const currentConfig = SUPPORTED_NETWORKS[networkName]

        if (!currentConfig?.deployments) {
            console.log('MISSING DEPLOYMENTS AT connectDEFO')
            return
        }
        const signerOrProvider = signer ? signer : provider
        const contractInstance = new Contract(
            currentConfig.deployments.trustVote.address,
            currentConfig.deployments.trustVote.abi,
            signerOrProvider
        )
        console.log('SUCCESS settings trust vote contract')
        setTrustVoteContract(contractInstance)
    }

    return (
        <TrustVoteContractContext.Provider value={{}}>
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
