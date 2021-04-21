import { action, observable } from 'mobx';

const INITIAL = {
    
    list: [],
    loading: false
};

export class ReferralStore {

    @observable list = INITIAL.list;
    @observable loading = INITIAL.loading;
    @observable message = '';
    @observable status = '';

    @action isLoading(state) {
        this.loading = Boolean(state);
    }
    @action setMessage(msg) {
        this.message = msg;
    }
    @action setStatus(status) {
        this.status = status;
    }
    @action addReferral(referral) {  
        this.list.push(referral);
    }
    @action addReferrals(referrals) {
        this.list = INITIAL.list;
        this.list.push(referrals);
    }

    @action reset() {
        this.list = INITIAL.list;
        this.loading = INITIAL.loading;
        this.message = '';
    }
}

export default new ReferralStore();