import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance =  new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xC72eBc96D2013cEB1db1Fa0b5bE212Ff3268bC20'
);

export default instance;