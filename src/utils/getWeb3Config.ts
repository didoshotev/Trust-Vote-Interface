import {
    ConfigType,
    DEFAULT_NETWORK_ID,
    NETWORK_MAPPER,
    SUPPORTED_NETWORKS,
} from './constants'

export const getWeb3Config = (chainId: number): ConfigType => {
    const networkName = NETWORK_MAPPER[chainId || DEFAULT_NETWORK_ID]
    return SUPPORTED_NETWORKS[networkName]
}
