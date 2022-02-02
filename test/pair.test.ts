
import { keccak256, pack } from '@ethersproject/solidity'

// @ts-ignore
import { INIT_CODE_HASH } from "../src/constants"
// @ts-ignore
import { Token } from '../src/entities'
import { getCreate2Address } from '@ethersproject/address'
import {ChainId} from "../src/enums";

describe('Pair', () => {
    it('should get address correct', async () => {
        const tokenA = new Token(ChainId.BKC_TESTNET,"0x26A84eF5EBe0d35B4E5d2782fa00482897fe01dD", 18)
        const tokenB = new Token(ChainId.BKC_TESTNET,"0xc02817C954211DB40b3190dbc64A35772746d5cd", 18)
        const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
        let factoryAddress = "0xdfD7cDb6c6a24e9a3881bA92D28aA412D3cF25eb"
        let result = getCreate2Address(
            factoryAddress,
            keccak256(['bytes'], [pack(['address', 'address'], [token0.address, token1.address])]),
            INIT_CODE_HASH[token0.chainId]
        )
        console.log(result)
    })
})
