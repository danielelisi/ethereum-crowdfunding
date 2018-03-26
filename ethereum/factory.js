import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance =  new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x78402418B5af41f695DA36ba1C179559d08B54aA'
);

export default instance;