import { setProvider, setNetwork, setAccount } from '../reducers/provider'
import { ethers } from 'ethers'

// loadProvider(dispatch) -> returns provider and stores it
export const loadProvider = async (dispatch) => {
  if (!window.ethereum) {
    dispatch(setProvider(null))
    return null
  }

  // ethers v6 or v5 support
  const provider = ethers?.BrowserProvider
    ? new ethers.BrowserProvider(window.ethereum)                          // v6
    : new ethers.providers.Web3Provider(window.ethereum)                    // v5

  dispatch(setProvider(provider))
  return provider
}

// loadNetwork(provider, dispatch) -> stores chainId
export const loadNetwork = async (provider, dispatch) => {
  if (!provider) return null
  const net = await provider.getNetwork?.()
  const chainId = Number(net?.chainId ?? 0) || null
  dispatch(setNetwork(chainId))
  return chainId
}

// loadAccount(dispatch) -> requests accounts via window.ethereum
export const loadAccount = async (dispatch) => {
  if (!window?.ethereum) {
    dispatch(setAccount(null))
    return null
  }

  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  const account = accounts?.[0] ?? null
  dispatch(setAccount(account))
  return account
}
