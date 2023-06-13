import { BigNumber, Contract, ContractInterface, Signer, ethers } from 'ethers'
import { TxDocumentBuilder } from 'moralis/streams'

class TrustVoteContract extends Contract {
    contract: any
    constructor(
        address: string,
        abi: ContractInterface,
        signerOrProvider?: Signer | ethers.providers.Provider | undefined
    ) {
        super(address, abi, signerOrProvider)
    }

    async createPoll(
        name: string,
        description: string,
        startTime: number,
        endTime: number,
        optionNames: string[]
    ): Promise<void> {
        const tx = await this.functions.createPoll(
            name,
            description,
            startTime,
            endTime,
            optionNames
        )
        await tx.wait()
    }

    async vote(pollId: number, optionId: number): Promise<any> {
        const tx = await this.functions.vote(pollId, optionId)
        return await tx.wait()
    }

    async getPollResult(
        pollId: number
    ): Promise<{ counts: number[]; optionNames: string[] }> {
        return (await this.functions.getPollResult(pollId))[0]
    }

    async hasVoted(pollId: number): Promise<boolean> {
        return (await this.functions.hasVoted(pollId))[0]
    }

    async getAllPollIds(): Promise<BigNumber[]> {
        return (await this.functions.getAllPollIds())[0]
    }
}

export default TrustVoteContract
