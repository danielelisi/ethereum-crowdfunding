import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined')  {
    //  We are in the browser and metamask is running.
    web3 = new Web3(window.web3.currentProvider);

    web3.warningMessage = `Open MetaMask and select the Rinkeby test network to interact
        with the platform.`
} else {
    //  we are on the server *OR* the user is not running metamask.
    const provider = new Web3.providers.HttpProvider(
        `https://rinkeby.infura.io/${process.env.INFURA_API}`
    );

    web3 = new Web3(provider);

    web3.warningMessage = `Install the MetaMask browser extension and select the Rinkeby
        test network to interact with the platform.`;
}

export default web3;