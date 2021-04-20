import { Api as ApiService } from 'common-services';
import { prices as PricesStore, wallets as WalletsStore } from '@common/stores';
import { Alert } from 'react-native';


export async function getPrice(tokenAddress, token='ETH') {
    PricesStore.isLoading(true);
  //console.log('getPrice tokenAddress, token: ', tokenAddress, token);
    try {
      const resultdata = await ApiService.getPriceByToken(tokenAddress, token);
      console.log('getPrice token, resultdata: ', token, resultdata);
      if(resultdata && !resultdata.error){
        let data = resultdata.data;
        if(token === 'ETH') {
          PricesStore.setUSDRate(token, data.USD);
          PricesStore.setEURRate(data.EUR);
          PricesStore.setBRLRate(data.BRL);
        }else {
            //DRH
            if(data.price)
              PricesStore.setUSDRate(token, data.price.rate);
            else
              PricesStore.setUSDRate(token, 1);
        }
      }else{
        console.log('getPrice resultdata: ', resultdata);
        if(resultdata.error && resultdata.error.message){
            Alert.alert(
              'error',
              resultdata.error.message,
              [
                {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
              ],
              { cancelable: false }
            )
        }else{
          
        }
      }
  } catch(err) {
    console.log('getPrice err: ', err);
  }
    PricesStore.isLoading(false);
}

export async function addTokenPrice(tokenName, contractAddress) {
    //console.log('addTokenPrice tokenName, contractAddress: ', tokenName, contractAddress);
    PricesStore.isLoading(true);
    if(contractAddress && tokenName) {
      //let wallet = WalletsStore.getFirstWallet();
      //const walletAddress = wallet.address;
      try {
        const { data } = await ApiService.getPriceByToken(contractAddress, tokenName);
        //console.log('addTokenPrice data: ', data);

        if(data.price) {
          PricesStore.setUSDRate(tokenName, data.price.rate);
         }
        else
          PricesStore.setUSDRate(tokenName, 1);
      } catch(error) {
         //console.log('addTokenPrice error: ', error);
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
    PricesStore.isLoading(false);
}

export async function removeToken(token) {
      PricesStore.removeToken(token);
}
