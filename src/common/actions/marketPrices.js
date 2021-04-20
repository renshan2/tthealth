import { marketPrices as MarketPricesStore } from '@common/stores';
import { Wallets as WalletsService, Api as ApiService } from 'common-services';
import { CoinData } from '../constants/Data';
import { Alert } from 'react-native';


export async function appendMarketPrice(symbol, contractAddress, rate, diff, diff7d, diff30d) {
    //console.log('appendMarketPrice contractAddress, symbol: ', contractAddress, symbol);
    if(contractAddress) {
      MarketPricesStore.setMarketPrice(symbol, contractAddress, rate, diff, diff7d, diff30d);
    }
}

export async function getMarketPrice(contractAddress, symbol) {
    //console.log('getMarketPrice contractAddress, symbol: ', contractAddress, symbol);
    MarketPricesStore.isLoading(true);
    if(contractAddress) {
      //let wallet = WalletsStore.getFirstWallet();
      //const walletAddress = wallet.address;
      try {
        const resultdata = await ApiService.getPriceByToken(contractAddress, symbol);
        //console.log('getMarketPrice resultdata: ', resultdata);
        if(resultdata && !resultdata.error){
          let data = resultdata.data;
          if(data && Object.keys(data).length != 0){
            let token = { symbol: data.symbol, contractAddress: data.address };
            //console.log('getMarketPrice token: ', token);
            if(data.price)
              MarketPricesStore.setMarketPrice( token, data.price.rate, data.price.diff, data.price.diff7d, data.price.diff30d);
            else
              MarketPricesStore.setMarketPrice(token, 0, 0, 0, 0);
          }
        }else{
          Alert.alert(
            'error',
            resultdata.error.message,
            [
              {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
          )
        }
      } catch(error) {
         console.log('getMarketPrice error: ', error);
         /*
         Alert.alert(
             'Error: ',
              error,
             [
                 { text: 'Ok', onPress: () => {}, style: 'cancel' }
             ],
             { cancelable: false }
         );
         */
      }
    }
    MarketPricesStore.isLoading(false);
}

export async function getMarketPriceDetail(contractAddress) {
  //console.log('getMarketPriceDetail contractAddress: ', contractAddress);
  MarketPricesStore.isLoading(true);
  if(contractAddress) {
    //let wallet = WalletsStore.getFirstWallet();
    //const walletAddress = wallet.address;
    try {
        const { data } = await ApiService.getPriceByToken(contractAddress);
        //console.log('getMarketPriceDetail data: ', data);
        MarketPricesStore.setMarketPriceDetail(data);
        let symbol = data.symbol;
        let address = data.address;
        let rate = 0;
        if(data.price){
          rate = data.price.rate;
        };
        if (isNaN(rate))
           rate = 0;
        if(typeof rate == 'string'){
          rate = +rate;
        }
        let diff = data.price? data.price.diff : 0;
        let diff7d = data.price? data.price.diff7d : 0;
        let diff30d = data.price? data.price.diff30d : 0;
        MarketPricesStore.setMarketPrice({symbol, contractAddress: address}, rate, diff, diff7d, diff30d);
    } catch(error) {
       //console.log('getMarketPriceDetail error: ', error);
       Alert.alert(
           'Error: ',
            error,
           [
               { text: 'Ok', onPress: () => {}, style: 'cancel' }
           ],
           { cancelable: false }
       );
    }
  }
  MarketPricesStore.isLoading(false);
}

export async function removeToken(token) {
      MarketPricesStore.removeToken(token);
}

export async function loadMarketPrices() {
    MarketPricesStore.isLoading(true);
    try{
      const tokens = await WalletsService.loadMarketTokens();
      //console.log('loadMarketPrices tokens: ', tokens);
      //console.log('loadMarketPrices tokens.length: ', tokens.length);
      //
      //can be optimized by using PromiseAll
      tokens.map( async ({ symbol, address }) => {
          //console.log('loadMarketPrices tokens symbol, address: ', symbol, address );
          //need to call getAddressInfo for current wallet address to get all the tokens the current wallet has
          if(address) {
            await getMarketPrice(address, symbol);
          }
      });
      if(tokens.length < 5) {
        //console.log('loadMarketPrices  CoinData: ', CoinData);
        CoinData.map( async ({ symbol, address }) => {
            //console.log('loadMarketPrices CoinData symbol, address: ', symbol, address );
            //need to call getAddressInfo for current wallet address to get all the tokens the current wallet has
            await getMarketPrice(address, symbol);
        });
      }
    }catch (error) {
      //console.log('loadMarketPrices error: ', error);
    }
    MarketPricesStore.isLoading(false);
}
export async function saveMarketPrices() {
  //console.log('saveMarketPrices ... ');
    await WalletsService.saveMarketTokens(MarketPricesStore.tokens);
}
