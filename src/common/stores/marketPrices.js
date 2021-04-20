import { action, observable } from 'mobx';

const INITIAL = {
    tokens: [{ symbol: '', address: '', rate: 0, diff: 0, diff7d: 0, diff30d: 0 }],
    loading: false
};

export class MarketPricesStore {
    @observable tokens = [{ symbol: '', address: '', rate: 0, diff: 0, diff7d: 0, diff30d: 0 }];
    @observable loading = INITIAL.loading;
    @observable tokenDetail =
      {
        address: '',
        totalSupply: '',
        name: '',
        symbol: '',
        decimals: '',
        rate: 0,
        currency: '',
        diff: 0,
        diff7d: 0,
        diff30d: 0,
        marketCapUsd: '',
        availableSupply: '',
        volume24h:       '',
        ts:              0,
        owner:           '',
        countOps:            0,
        totalIn:             0,
        totalOut:            0,
        transfersCount:	     0,
        holdersCount:        0,
        issuancesCount:      0,
        lastUpdated:         0
      };

    validateInput(input) {
        if (isNaN(input)) {
          throw new Error('The input is NaN');
        }
        //if (isNaN(input) || typeof input !== 'number') throw new Error('The input is NaN');
    }

    @action isLoading(state) {
        this.loading = Boolean(state);
    }

    @action setMarketPriceDetail(data) {
        //console.log('setMarketPriceDetail data: ', data)
        let rate = 0;
        if(data.price){
          rate = data.price.rate;
        };
        this.validateInput(rate);
        if(typeof rate == 'string'){
          rate = +rate;
        }
        this.tokenDetail =
          {
            address:  data.address,
            totalSupply: data.totalSupply,
            name: data.name,
            symbol: data.symbol,
            decimals: data.decimals,
            rate: rate,
            currency: (data.price? data.price.currency : ''),
            diff: (data.price? data.price.diff : 0),
            diff7d: (data.price? data.price.diff7d : 0),
            diff30d: (data.price? data.price.diff30d : 0),
            marketCapUsd: (data.price? data.price.marketCapUsd : 0),
            availableSupply: (data.price? data.price.availableSupply : 0),
            volume24h:       (data.price? data.price.volume24h : 0),
            ts:              (data.price? data.price.ts : 0),
            owner:           data.owner,
            countOps:        data.countOps,
            totalIn:         data.totalIn,
            totalOut:        data.totalOut,
            transfersCount:	 data.transfersCount,
            holdersCount:    data.holdersCount,
            issuancesCount:  data.issuancesCount,
            lastUpdated:     data.lastUpdated
          };

        //  this.setMarketPrice({symbol: this.tokenDetail.symbol, address: this.tokenDetail.address}, this.tokenDetail.rate, this.tokenDetail.diff, this.tokenDetail.diff7d, this.tokenDetail.diff30d)
        //console.log('MarketPricesStore setMarketPriceDetail this.tokenDetail: ', this.tokenDetail);
    }

    //token: tokenName
    @action setMarketPrice(token, rate, diff, diff7d, diff30d) {
        //console.log('MarketPricesStore setMarketPrice token, rate, diff, diff7d, diff30d: ', token, rate, diff, diff7d, diff30d)
        this.validateInput(rate);
        if(typeof rate == 'string'){
          rate = +rate;
        }
        //console.log('MarketPricesStore setMarketPrice this.tokens: ', this.tokens);
        //console.log('MarketPricesStore setMarketPrice token: ', token);
        var found = this.tokens.filter(function(item) {
            //console.log('MarketPricesStore setMarketPrice item.address: ', item.address);
            //console.log('MarketPricesStore setMarketPrice token.contractAddress: ', token.contractAddress);
          return item.address === token.contractAddress;
        });
        //console.log('MarketPricesStore setMarketPrice found: ', found);
        //console.log('MarketPricesStore setMarketPrice found.length: ', found.length);
        if(found.length > 0 ){
          found[0].rate = Number(rate);
          found[0].diff = Number(diff);
          found[0].diff7d = Number(diff7d);
          found[0].diff30d = Number(diff30d);

        }else {
          //console.log('MarketPricesStore setMarketPrice pushing to tokens array... ')
          if(token.contractAddress && token.symbol)
            this.tokens.push({symbol: token.symbol, address: token.contractAddress, rate: Number(rate), diff: Number(diff), diff7d: Number(diff7d), diff30d: Number(diff30d)});
        }
        //console.log('MarketPricesStore setMarketPrice this.tokens: ', this.tokens)
    }


    @action removeToken(tokenIn){
      //console.log('MarketPricesStore removeToken tokenIn: ', tokenIn);
      //console.log('MarketPricesStore before removeToken this.tokens: ', this.tokens);
      if(this.tokens.length > 0){
         var index = 0;
         for (item of this.tokens) {
           if(item.address == tokenIn.address){
               this.tokens.splice(index, 1);
           }
           index++;
         }
      }
      //console.log('MarketPricesStore after removeToken this.tokens: ', this.tokens);
    }
    @action reset() {
        this.tokens = [{ symbol: '', address: '', rate: 0, diff: 0, diff7d: 0, diff30d: 0 }];
        this.loading = INITIAL.loading;
    }
}

export default new MarketPricesStore();
