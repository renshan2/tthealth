import { action, observable } from 'mobx';

const INITIAL = {
    //list: [{blockNumber:0, date:'2019-01-04T05:36:27.000Z', sign: '+', status: 'completed',timestamp: 0, transHash: '123', value: '100.00'}],
    list: [],
    loading: false
};

export class TransHistoryStore {

    @observable list = INITIAL.list;
    @observable loading = INITIAL.loading;

    @action isLoading(state) {
        this.loading = Boolean(state);
    }
    //add transaction for from address
    //transaction: {txHash:'', block:0, age: 0, from: '', to: '', value: '', txFee: 0}
    @action addTransaction(transaction) {
        const index = this.list.findIndex(a => a.transHash === transaction.transHash);
        if (index > -1) return;
        this.list.push(transaction);
    }

    @action addTransactions(transactions) {
        this.list = [];
        transactions.forEach(transaction => this.addTransaction(transaction));
    }

    @action reset() {
        this.list = INITIAL.list;
        this.loading = INITIAL.loading;
    }
}

export default new TransHistoryStore();