const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.local') });
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');

console.log(process.env.METAMASK_SEED);

const provider = new HDWalletProvider(
    process.env.METAMASK_SEED,
    `https://rinkeby.infura.io/${process.env.INFURA_API}`
);

const web3 = new Web3(provider);


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0] }
    );

    console.log(`Contract deployed to ${result.options.address}`);
};
deploy();