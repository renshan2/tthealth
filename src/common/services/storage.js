import SensitiveInfoStorage from 'react-native-sensitive-info';
import { Storage } from 'common-constants';

export function getItem(key) {
 // console.log('storage getItem key: ', key);
    //deleteItem(key);
    return SensitiveInfoStorage.getItem(key, Storage.CONFIG).then(item => item || '');
}

export function setItem(key, value) {
   // console.log('storage setItem key, value: ', key, value)
    return SensitiveInfoStorage.setItem(key, value || '', Storage.CONFIG);
}

export function deleteItem(key) {
  //console.log('storage deleteItem key: ', key);
    return SensitiveInfoStorage.deleteItem(key, Storage.CONFIG);
}

export function getMarketItem(key) {
 // console.log('storage getMarketItem key: ', key);
    //deleteItem(key);
    return SensitiveInfoStorage.getItem(key, Storage.CONFIG).then(item => item || '');
}

export function setMarketItem(key, value) {
    //console.log('storage setItem key, value: ', key, value)
    return SensitiveInfoStorage.setItem(key, value || '', Storage.CONFIG);
}
