const { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType } = require ('@uniswap/sdk');
const ethers = require('ethers');  
require("dotenv").config();

const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);

const chainId = ChainId.MAINNET;
const tokenAddress = '0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5'

const init = async () => {
	const dai = await Fetcher.fetchTokenData(chainId, tokenAddress, customHttpProvider);
	const weth = WETH[chainId];
	const pair = await Fetcher.fetchPairData(dai, weth, customHttpProvider);
	const route = new Route([pair], weth);
	console.log("Mid Price WETH --> DAI:", route.midPrice.toSignificant(6));
	console.log("Mid Price DAI --> WETH:", route.midPrice.invert().toSignificant(6));
}

init();
