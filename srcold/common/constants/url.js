export const CRYPTO_COMPARE = 'https://min-api.cryptocompare.com';

//export const ETHERSCAN = (process.env.NODE_ENV === 'production') ? 'https://api.etherscan.io/api' : 'https://rinkeby.etherscan.io/api';
export const ETHERSCAN = 'https://api.etherscan.io/api';

export const ETHPLORER_TOKEN_INFO = 'https://api.ethplorer.io/getTokenInfo/';

export const ETHPLORER_ADDRESS_INFO = 'https://api.ethplorer.io/getAddressInfo/';

export const ETHPLORER_APIKEY = '?apiKey=freekey';


//http://34.238.58.243:8091/
//https://ixinhub.com:8061/
//http://34.238.58.243:8061/

//export const LINKGEAR_TEST_URL = "https://login.ixinhub.com";//34.238.58.243 
//export const LINKGEAR_TEST_URL = "http://ixinbuy.com:7961";//"http://112.17.170.154:18080";//"http://ixinbuy.com";//34.238.58.243 
//https://ixinhub.com:8061/
//export const LINKGEAR_DEV_URL = "http://ixinbuy.com:7961";//ip   simon
export const LINKGEAR_DEV_URL = "http://ttdata.life:7961";//ip   simon   52.167.173.220   ttdata.life
export const LINKGEAR_CHAIN_URL = "http://ttdata.life:7061"; //  dennis
//export const LINKGEAR_DEV_URL = "http://ixinbuy.com:7961";//ip   simon   52.167.173.220   ttdata.life
//export const LINKGEAR_CHAIN_URL = "http://ixinbuy.com:7061"; //  dennis

//export const LINKGEAR_TEST_URL = "https://ixinhub.com:8061";
//export const LINKGEAR_TEST_URL6060 = "https://api.ixinhub.com";
export const LINKGEAR_TEST_URL6060 = "http://ixinbuy.com"; //https://ixinhub.com:6060
//ttdata.live:7061

//ixin logo
export const base64Logo = "data:image/png;base64,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";
//person image 
export const base64Person="data:image/png;base64,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";

export const googleMapSearch="https://www.google.com/maps/search/?api=1&query=";

