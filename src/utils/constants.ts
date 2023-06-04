import TrustVoteDeployment from './TrustVoteDeployment.json'

export const INFURA_ID = import.meta.env.VITE_PUBLIC_INFURA_ID
export const DEFAULT_NETWORK_ID = import.meta.env.VITE_DEFAULT_NETWORK_ID

export const RPC = {
    4: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    1337: `http://localhost:8545`,
    31337: `http://localhost:8545`,
}

export enum SUPPORTED_NETWORKS_ENUM {
    HARDHAT = 'hardhat',
    RINKEBY = 'rinkeby',
}

export const NETWORK_MAPPER: { [key: number]: string } = {
    1337: SUPPORTED_NETWORKS_ENUM.HARDHAT,
    31337: SUPPORTED_NETWORKS_ENUM.HARDHAT,
    4: SUPPORTED_NETWORKS_ENUM.RINKEBY,
}

export const ACTIVE_NETOWORKS_COLLECTION = [1337, 31337]

export const SUPPORTED_NETWORKS: { [key: string]: ConfigType } = {
    hardhat: {
        chainName: 'Hardhat localhost',
        chainId: 1337,
        chainRPC: RPC[1337],
        chainExplorer: 'https://testnet.snowtrace.io/',
        nativeCurrency: {
            name: 'GO',
            symbol: 'GO',
            decimals: 18,
        },
        deployments: {
            trustVote: {
                abi: TrustVoteDeployment.abi,
                address: TrustVoteDeployment.address,
            },
        },
    },
    rinkeby: {
        chainName: 'Rinkeby Test Network',
        chainId: 4,
        chainRPC: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
        chainExplorer: 'https://rinkeby.etherscan.io/',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
        },
    },
}

export type ConfigType = {
    chainName: string
    chainId: number
    chainRPC: string
    chainExplorer: string
    nativeCurrency: {
        name: string
        symbol: string
        decimals: number
    }

    deployments?: {
        trustVote: {
            address: string
            abi: any[]
        }
    }
}
