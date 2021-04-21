import { itemsInCart as GoodsStore } from '@common/stores';


export async function addCartItem(data) {
    console.log('addCartItem data: ', data);
    GoodsStore.isLoading(true);
    try{
        console.log("addCartItem data: ", data);
        GoodsStore.addCartItem(data);
    }catch(e) {
        console.log('addCartItem exception e: ', e);
    }
    GoodsStore.isLoading(false);
}