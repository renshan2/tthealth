import { action, observable } from 'mobx';

const INITIAL = {
    list: [],
    loading: false,
    errorMsg: '',
    queryUrl: '',
};

export class TokenponsStore {

    @observable list = INITIAL.list;
    @observable loading = INITIAL.loading;
    @observable errorMsg = INITIAL.errorMsg;
    @observable queryUrl = INITIAL.queryUrl;

    @action isLoading(state) {
        this.loading = Boolean(state);
    }
    @action setError(errorMsg) {
        this.errorMsg = errorMsg;
    }
    @action setQueryUrl(queryUrl) {
        this.queryUrl = queryUrl;
    }

    @action addTokenpons(storeData) {
        var listings = [];
        console.log("addTokenpons storeData: ", storeData);
        for (var j = 0; j < storeData.length; j++) {
            //console.log("getTokenponCreditsByUser storeData[",j,"]: ", storeData[j]);
                   
                  var offers = storeData[j].discounts?storeData[j].discounts.slice(0, 2):[];
                  for(let offer of offers){
                      var exp = offer.expirationDate;
                    //console.log("getTokenponCreditsByUser exp: ", exp);
                      if(exp){
                          exp = new Date(exp);
                          exp = exp.toLocaleString();
                          offer.expirationDate = exp;
                      }
                  }
                  listings[j] = {
                      // imgUrl: isNullOrUndefined(this.claims[j].pictures[0]) || this.claims[j].pictures[0] == "" ?
                      //   "../../assets/linkGearGGold.png" : this.claims[j].pictures[0],
                      imgUrl: (storeData[j].pictures && storeData[j].pictures.length>0) ? storeData[j].pictures[0] :"",
                      //pictures: storeData[j].pictures,
                      id: storeData[j].tokenponId,//tokenponId
                      overallTitle: storeData[j].overallTitle,
                      //productDescription: storeData[j].productDescription,
                      //businessMainCategory: storeData[j].businessMainCategory,
                      businessName: storeData[j].businessName,
                      merchantAccount: storeData[j].merchantAccountAddress,
                      offers: offers, //only show the first 2 deals
                     
                  };
          } 
           
          console.log("addTokenpons listings: ", listings);
          this.list = this.list.concat(listings);
          console.log("addTokenpons this.list: ", this.list);
    }
}

export default new TokenponsStore();