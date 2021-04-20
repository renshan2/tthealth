import { action, observable } from 'mobx';

const INITIAL = {
    list: [],
    loading: false,
    errorMsg: '',
};

export class GoodsStore {

    @observable list = INITIAL.list;
    @observable loading = INITIAL.loading;
    @observable errorMsg = INITIAL.errorMsg;

    @action isLoading(state) {
        this.loading = Boolean(state);
    }
    @action setError(errorMsg) {
        this.errorMsg = errorMsg;
    }  
    @action addCartItem(cartItem) {
       
        console.log("addCartItem cartItem: ", cartItem);
        this.list = this.list.concat(cartItem);
        console.log("addCartItem this.list: ", this.list);
    }
}

export default new GoodsStore();