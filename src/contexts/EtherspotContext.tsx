import React, { createContext } from 'react';
import { Sdk as EtherspotSdk } from 'etherspot/dist/sdk/sdk';
import { TokenListToken } from 'etherspot/dist/sdk/assets/classes/token-list-token';
import { AccountBalance } from 'etherspot';

export interface EtherspotContextData {
  initialized: boolean;
  data: {
    account: string | null;
    providerWalletAddress: string | null;
    connect: () => Promise<string | undefined>;
    chainId: number;
    setChainId: (chainId: number) => void;
    getSdkForChainId: (chainId: number) => EtherspotSdk | null;
    isConnecting: boolean;
    sdk: EtherspotSdk | null;
    getSupportedAssetsForChainId: (chainId: number) => Promise<TokenListToken[]>;
    getAssetsBalancesForChainId: (assets: TokenListToken[], chainId: number) => Promise<AccountBalance[]>;
  }
}

const EtherspotContext = createContext<EtherspotContextData>({
  initialized: false,
  data: {
    account: null,
    providerWalletAddress: null,
    connect: () => new Promise(() => undefined),
    chainId: 0,
    setChainId: () => null,
    getSdkForChainId: () => null,
    isConnecting: false,
    sdk: null,
    getSupportedAssetsForChainId: () => new Promise(() => []),
    getAssetsBalancesForChainId: () => new Promise(() => []),
  }
});

export default EtherspotContext;
