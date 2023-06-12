import {
    BigNumber,
    Contract,
    ContractInterface,
    Signer,
    ethers,
    providers,
} from 'ethers'

class TrustVoteAuthContract extends Contract {
    constructor(
        address: string,
        abi: ContractInterface,
        signerOrProvider?: Signer | ethers.providers.Provider | undefined
    ) {
        super(address, abi, signerOrProvider)
    }

    async authenticate(planId: number, value: BigNumber): Promise<any> {
        const tx = await this.functions.authenticate(planId, { value })
        return await tx.wait()
    }

    async getCurrentPlan(): Promise<number[]> {
        return (await this.functions.getCurrentPlan())[0]
    }

    async isUserAuthenticated(): Promise<boolean> {
        return (await this.functions.isUserAuthenticated())[0]
    }
}

export default TrustVoteAuthContract
