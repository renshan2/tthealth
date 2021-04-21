import { action, observable } from 'mobx';

const INITIAL = {
    usd: 0,
    eur: 0,
    brl: 0,
    drh: 0,
    loading: false
};

export class PricesStore {
    @observable tokens = [{ token: '', usd: 0 }];

    @observable usd = INITIAL.usd;
    @observable eur = INITIAL.eur;
    @observable brl = INITIAL.brl;
    @observable loading = INITIAL.loading;


    validateInput(input) {
      //console.log('validateInput input: ', input);
        if (isNaN(input)) {
          throw new Error('The input is NaN');
        }
        //if (isNaN(input) || typeof input !== 'number') throw new Error('The input is NaN');
    }

    @action isLoading(state) {
        this.loading = Boolean(state);
    }

    //token: tokenName
    @action setUSDRate(token, rate) {
        //console.log('setUSDRate token, rate: ', token, rate)
        this.validateInput(rate);
        if(typeof rate == 'string'){
          rate = +rate;
        }
        var found = this.tokens.filter(function(item) { return item.token === token; });
        if(found.length > 0 ){
          found[0].usd = Number(rate);
        }else {
          this.tokens.push({token: token, usd: Number(rate)});
        }
        this.usd = Number(rate);
        //console.log('setUSDRate this.tokens: ', this.tokens)
    }
    @action removeToken(tokenIn){
      //console.log('prices removeToken tokenIn: ', tokenIn);
      //console.log('prices before removeToken this.tokens: ', this.tokens);
      if(this.tokens.length > 0){
         var index = 0;
         for (item of this.tokens) {
           if(item.token == tokenIn.tokenName){
               this.tokens.splice(index, 1);
           }
           index++;
         }
      }
      //console.log('prices after removeToken this.tokens: ', this.tokens);
    }
    @action setEURRate(rate) {
        this.validateInput(rate);
        this.eur = Number(rate);
    }

    @action setBRLRate(rate) {
        this.validateInput(rate);
        this.brl = Number(rate);
    }
    @action reset() {
        this.usd = INITIAL.usd;
        this.eur = INITIAL.eur;
        this.brl = INITIAL.brl;
        this.loading = INITIAL.loading;
    }
}

export default new PricesStore();
