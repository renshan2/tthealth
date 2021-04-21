import axios from 'axios';
import { Url } from '@common/constants';
import { TokenponAppId, mobileAppKey } from '../constants/Data';
import { tokenpons as TokenponsStore } from '@common/stores';


//CRYPTO_COMPARE = 'https://min-api.cryptocompare.com';

export async function getAddressInfoByWallet(walletAddress) {
    ////console.log('API getAddressInfoByWallet walletAddress: ', walletAddress);
    ////console.log('API getAddressInfoByWallet URL: ', `${Url.ETHPLORER_ADDRESS_INFO}${walletAddress}${Url.ETHPLORER_APIKEY}`);

     try {
       return await axios.get(`${Url.ETHPLORER_ADDRESS_INFO}${walletAddress}${Url.ETHPLORER_APIKEY}`);
     } catch(err) {
       //console.log('API getAddressInfoByWallet err: ', err);
     }
     /*
    .then(response => {
       //console.log('getAddressInfoByWallet response.data: ', response.data);
      return response.data
    })*/

}
export async function getPriceByToken(tokenAddress, tokenName='') {
  ////console.log('API getPriceByToken tokenAddress, tokenName: ', tokenAddress, tokenName);
    if (tokenName === 'ETH'){
      //from
      try {
        return await axios.get(`${Url.CRYPTO_COMPARE}/data/price?fsym=ETH&tsyms=USD,EUR,BRL`);
      } catch(err) {
        //console.log('API getPriceByToken ETH err: ', err);
      }
    }
    else if(tokenAddress){
      const URL = `${Url.ETHPLORER_TOKEN_INFO}${tokenAddress}${Url.ETHPLORER_APIKEY}`;
      ////console.log('API getPriceByToken tokenName, URL: ', tokenName, URL);
      try {
        const response = await axios.get(URL);
        ////console.log('API getPriceByToken response: ', response);
        return response;
      } catch(err) {
        //console.log('API getPriceByToken err: ', err);
      }
    } else {
      return {};
    }
} 

export const editUserProfile =
    (sessionId,firstName,lastName,image,countryCode,phone) =>
new Promise((resolve,reject) => {

    var data = new FormData();
    data.append('session_id',sessionId);
    data.append('firstname',firstName);
    data.append('lastname',lastName);
    data.append('image',
      {uri:image,name:'userProfile.jpg',type:'image/jpg'});
    data.append('country_code',countryCode);
    data.append('phone',phone);
    data.append('locale','en');

        return axios.post(base_url+'edit-profile',data).then(response =>
            {resolve(response)})
        .catch(error =>
            {reject(error)});
    });

    export const PostFileData = (formData) => {
      try {

          return axios.post(
            `https://api.cloudinary.com/v1_1/XXX`,
            formData
          )
      } catch(err) {
        //console.log(`${err}`)
      }
    }
    //account: walletAddress
    export async function registerMobile(phone, password, dname, profession){
      try {
        if(__DEV__){
          console.log("API registerMobile phone, password, dname, profession: ", phone, password,dname, profession);
        }
          let url = `${Url.LINKGEAR_DEV_URL}/auth/local/m.register`;
          if(__DEV__){
          console.log("registerMobile url: ", url);
          }
          /*
          const res = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  phone,
                  password,
                  account,
              }),
              credentials: 'include',
          })*/
          let data = JSON.stringify({
              phone,
              password,
              dname,
              profession
          })
          const res = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
          )
          if(__DEV__){
             console.log("registerMobile res: ", res)
          }
          return res;
          
      } catch(err) {
        console.log("registerMobile error: ", `${err}`)
        return {
          error: err
        }
      }
    }
    export async function registerEmail(email, password, account){
      try {
          //console.log("API registerEmail email, password, waddress: ", email, password,account);
          let url = `${Url.LINKGEAR_DEV_URL}/auth/local/register`;
          //console.log("register url: ", url);
          /*
          const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                account,
            }),
            credentials: 'include',
        })*/
        let data = JSON.stringify({
            email,
            password,
            account,
        })
        const res = await axios.post(url, data, {
              headers: {
                  'Content-Type': 'application/json',
              }
          }
        )
        return res;
          
      } catch(err) {
        //console.log("registerEmail error: ", `${err}`)
        return {
          error: err
        }
      }
    }
    

    export async function loginWithPhonePassword2(phone, password) {
    //console.log("loginWithPhonePassword phone, password: ", phone, password);
      let url = `${Url.LINKGEAR_DEV_URL}/auth/local/m.login`;
    //console.log("loginWithPhonePassword url: ", url);
      try {
          return await axios.post(
            url,
            {
              mobile: phone,
              password: password,
              credentials: 'include',
              withCredentials: true,
            }
          ).then(response => { 
          //console.log("loginWithPhonePassword response: ", response)
            return response;
          })
          .catch(error => {
            //console.log("then loginWithPhonePassword error: ", error);
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
              //console.log(error.response.data);
              //console.log(error.response.status);
              //console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
              //console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
              //console.log('Error', error.message);
              }
            //console.log(error.config);
          });
      } catch(err) {
      //console.log("loginWithPhonePassword err: ", `${err}`);
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
       //console.log(err.response.data);
       //console.log(err.response.status);
       //console.log(err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
       //console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
       //console.log('Err', err.message);
        }
     //console.log(err.config);
      }
      
  }

  export async function loginWithPhonePassword(phone, password) {
    //if(__DEV__){
  console.log("loginWithPhonePassword phone, password: ", phone, password);
    //}
    let url = `${Url.LINKGEAR_DEV_URL}/auth/local/m.login`;
    //if(__DEV__){
  console.log("loginWithPhonePassword url: ", url);
    //}
    try{
      
      let data = JSON.stringify({
        mobile: phone,
        password: password,
      })
      //if(__DEV__){
      //console.log("loginWithPhonePassword data: ", data);
      //}
      const res = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
      )
      //if(__DEV__){
     console.log("loginWithPhonePassword res: ", res)
      //}
      return res;
    }catch(err) {
      console.log("loginWithPhonePassword error: ", `${err}`)
      return {
        error: err
      }
    }
    
}

export async function loginWithEmailPassword(email, password) {
      let url = `${Url.LINKGEAR_DEV_URL}/auth/local/login`;
          //console.log("loginWithEmailPassword url: ", url);
      try{
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            }),
            credentials: 'include',
        })
        //console.log("loginWithEmailPassword res: ", res)
        return res;
      }catch(err) {
        //console.log("loginWithEmailPassword error: ", `${err}`)
      }
     
  }

  export async function logout() {
    let url = `${Url.LINKGEAR_DEV_URL}/auth/logout`;
    try{
        //console.log("logout url: ", url);
        /*
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'include',
        })
        */
        const res = await axios.post(url, {}, {
              headers: {
                  'Content-Type': 'application/json',
              }
          }
        )
        return res;
    }catch(err) {
      console.log("logout error: ", `${err}`)
    } 
  }

  export async function addReferral(userId, referredPhone) {
    try {
      //console.log("API addReferral userId, referredPhone: ", userId, referredPhone);
      let url = `${Url.LINKGEAR_DEV_URL}/auth/local/referral-add`;
      if(__DEV__){
      console.log("addReferral url: ", url);
      }
      /*
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          referredPhone
        }),
        credentials: 'include',
      })
      */

      let data = JSON.stringify({
          userId,
          referredPhone
      })
      const res = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
      )
      if(__DEV__){
      console.log("addReferral res: ", res)
      }
      return res;
    }catch(err) {
      //console.log("addReferral error: ", `${err}`)
      return {
        error: err
      }
    }
  }
  export async function getReferrals(userId) {
    try {
      //console.log("API getReferrals userId: ", userId);
      let url = `${Url.LINKGEAR_DEV_URL}/auth/local/referral-get`;
      if(__DEV__)
      console.log("getReferrals url: ", url);
      /*
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
        }),
        credentials: 'include',
      })
      */
      let data = JSON.stringify({
        userId,
      })
      const res = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
          }
        }
      )
      if(__DEV__)
      console.log("getReferrals res: ", res)
      return res;
    }catch(err) {
      //console.log("getReferrals error: ", `${err}`)
      return {
        error: err
      }
    }
  }
  export async function getSysInfo() {
    try {
      const dummy = "";
      //console.log("API getSysInfo... ");
      let url = `${Url.LINKGEAR_DEV_URL}/auth/local/t-getSysInfo`;
      if(__DEV__)
      console.log("getSysInfo url: ", url);
      /*
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            dummy
          }),
          credentials: 'include',
      })*/

      let data = JSON.stringify({
          dummy
      })
      const res = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
      )
      if(__DEV__)
      console.log("getSysInfo res: ", res)
      return res;
    }catch(err) {
      //console.log("getSysInfo error: ", `${err}`)
      return {
        error: err
      }
    }
  }
  ///api/incrementViewCount
  //return this.http.post(this.API + 'incrementViewCount/', {'id': id, 'appId': appId});
/**
 * IxinAPI: 'https://login.ixinhub.com/auth/',
   OothAPI: 'https://login.ixinhub.com/auth/',
   MongoAPI: 'https://api.ixinhub.com/api/',
   SwarmProvider: 'https://ixinhub.com/swarm/',
   private readonly API = environment.MongoAPI;
 */

export async function incrementViewCount(tokenponId) {
  try {
    //console.log("API incrementViewCount... ");
    let url = `${Url.LINKGEAR_DEV_URL}/api/incrementViewCount`;
    if(__DEV__)
    console.log("incrementViewCount url: ", url);
    /*
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: tokenponId,
          appId: TokenponAppId
        }),
        credentials: 'include',
    })*/
    let data = JSON.stringify({
          id: tokenponId,
          appId: TokenponAppId
    })
    const res = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
        }
      }
    )

    //console.log("incrementViewCount res: ", res)
    return res;
  }catch(err) {
    //console.log("incrementViewCount error: ", `${err}`)
    return {
      error: err
    }
  }
}

//https://api.ixinhub.com/api/getTokenpons?offset=2&limit=5
export function  GetTokenpons(offset, limit, published, cat, subcat, searchtext) {
  try {
    //console.log("GetTokenpons offset, limit, published,cat, subcat, searchtext: ", offset, limit, published, cat, subcat, searchtext);
    //let dt1 = new Date().getTime();
    //console.log("getListing seconds dt1: ", dt1);
    let url = `${Url.LINKGEAR_TEST_URL6060}/api/getTokenpons?published=`+published+'&offset='+offset+'&limit='+limit;
    if(cat !== undefined && cat !== null){
      if(cat.trim().length>0) {
        cat = encodeURIComponent(cat);
        url = url + "&cat="+cat;
      }
    }
    if(subcat !== undefined && subcat !== null){
        if(subcat.trim().length>0) {
          subcat = encodeURIComponent(subcat);
          url = url + "&subcat="+subcat;
        }
    }
    if(searchtext !== undefined && searchtext !== null){
      if(searchtext.trim().length>0) {
        searchtext = encodeURIComponent(searchtext);
        url = url + "&searchText="+searchtext;
      }
    }
    TokenponsStore.setQueryUrl(url);
    if(__DEV__)
    console.log("GetTokenpons url: ", url);
    //url = "https://api.ixinhub.com/api/getTokenpons?published=1&offset=0&limit=5";

    /*
    return fetch(url, {
      method: 'GET'
    }).then(response => {
      console.log('response: ', response);
      let json = response.json();
      console.log('json: ', JSON.stringify(json));
      return json;
    })
    .then(data => {
      console.log("GetTokenpons data: ", data);
      return data
    })
    .catch(function(err) {
        console.log(err);
        return {
          error: err
        }
    })*/

     return axios.get(url)
    .then((response) => {
        console.log("response: ", response);
        console.log("response.data: ", response.data);
        return response;

     });
    

    /*
    axios({
      url: 'https://dog.ceo/api/breeds/list/all',
      method: 'get',
      data: {
        foo: 'bar'
      }
    })

    let dt2 = new Date().getTime();
    console.log("getListing seconds dt2: ", dt2);
    let milisec_diff = dt2-dt1;
    let sec_diff = milisec_diff/1000;
    console.log("getListing seconds diff: ", sec_diff);
    */
   //console.log("GetTokenpons res: ", res);
   // return res;

  }catch(err) {
    console.log("GetTokenpons error: ", `${err}`)
    return {
      error: err
    }
  }
}

//https://api.ixinhub.com/api/getTokenpons?offset=2&limit=5
export async function  GetTokenpons2(offset, limit, published) {
  try {
    //console.log("GetTokenpons offset, limit: ", offset, limit);
    //let dt1 = new Date().getTime();
    //console.log("getListing seconds dt1: ", dt1);
    let url = `${Url.LINKGEAR_TEST_URL6060}/api/getTokenpons?published=`+published+'&offset='+offset+'&limit='+limit;
    //console.log("GetTokenpons url: ", url);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    return res;
  }catch(err) {
    //console.log("GetListings error: ", `${err}`)
    return {
      error: err
    }
  }
}
  export async function  GetListings(appId) {
    try {

      //console.log("getListings appId: ", appId);
      //let dt1 = new Date().getTime();
      //console.log("getListing seconds dt1: ", dt1);
      let url = `${Url.LINKGEAR_TEST_URL6060}/api/getListings/`+ appId;
      //console.log("GetListings url: ", url);
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
          },
          credentials: 'include',
      })
      //console.log("GetListings res: ", res)
      //let dt2 = new Date().getTime();
      //console.log("getListing seconds dt2: ", dt2);
      //let milisec_diff = dt2-dt1;
      //let sec_diff = milisec_diff/1000;
      //console.log("getListing seconds diff: ", sec_diff);
      return res;
    }catch(err) {
      //console.log("GetListings error: ", `${err}`)
      return {
        error: err
      }
    }
  }

  export async function GetListingsByCat(cat, appId) {
    try {
      let url = `${Url.LINKGEAR_TEST_URL6060}/api/getListingsByCat/`+ cat + "/" + appId;
      //console.log("GetListingsByCat url: ", url);
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
          },
          credentials: 'include',
      })
      //console.log("GetListingsByCat res: ", res)
      TokenponsStore.setQueryUrl(url);
      return res;
    }catch(err) {
      //console.log("GetListings error: ", `${err}`)
      return {
        error: err
      }
    }
 }
 export async function GetListingsBySubcat(subcat, appId) {
    // let params = new HttpParams().set('cat', cat);
    
    try {
      let url = `${Url.LINKGEAR_TEST_URL6060}/api/GetListingsBySubcat/`+ subcat + "/" + appId;
      //console.log("GetListingsBySubcat url: ", url);
      TokenponsStore.setQueryUrl(url);
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
          },
          credentials: 'include',
      })
      //console.log("GetListingsBySubcat res: ", res)
      return res;
    }catch(err) {
      //console.log("GetListingsBySubcat error: ", `${err}`)
      return {
        error: err
      }
    }    
 }
 
 export async function  searchListings(searchtext, appId) {
  try {
    let url = `${Url.LINKGEAR_TEST_URL6060}/api/searchListings/`+ searchtext + "/" + appId;
    //console.log("searchListings url: ", url);
    TokenponsStore.setQueryUrl(url);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    //console.log("searchListings res: ", res)
    return res;
  }catch(err) {
    return {
      error: err
    }
  }    
}

//id: tokenponId, appId: 1
 export async function  GetListing(id, appId) {
  //let dt1 = new Date().getTime();
  //console.log("getListing dt1: ", dt1);
    try {
      let url = `${Url.LINKGEAR_TEST_URL6060}/api/getListing/`+ id + "/" + appId;
      console.log("getListing url: ", url);
      TokenponsStore.setQueryUrl(url);
      /*
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
          },
          credentials: 'include',
      })
      */
      return axios.get(url)
        .then((response) => {
            console.log("response: ", response);
            console.log("response.data: ", response.data);
            return response;

     });

      //console.log("getListing res: ", res)
      //let dt2 = new Date().getTime();
      //let milisec_diff = dt2-dt1;
      //let sec_diff = milisec_diff/1000;
      //console.log("getListing seconds diff: ", sec_diff);
      //return res;
    }catch(err) {
      //console.log("GetListingsBySubcat error: ", `${err}`)
      return {
        error: err
      }
    }    
}


  export async function GetTransLogs(account) {
    try {
      //console.log("API GetTransLogs account: ", account);
      let url = `${Url.LINKGEAR_DEV_URL}/auth/local/m.getTransLogs`;
      //console.log("GetTransLogs url: ", url);
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            account,
        }),
        credentials: 'include',
      })
      //console.log("GetTransLogs res: ", res)
      return res;
    }catch(err) {
      //console.log("GetTransLogs error: ", `${err}`)
      return {
        error: err
      }
    }
}

  export async function loginWithEmailPassword2(email, pwd){
      try {
        //console.log("loginWithEmailPassword email, pwd: ", email, pwd);
          
          let url = `${Url.LINKGEAR_DEV_URL}/auth/local/login`;
          //console.log("loginWithEmailPassword url: ", url);
          return await axios.post(
            url,
            {
              email: email,
              password: pwd,
              credentials: 'include',
              withCredentials: true
            }
          ).then(response => { 
            //console.log("loginWithEmailPassword response: ", response)
            return response;
          })
          .catch(error => {
              //console.log("then loginWithEmailPassword error: ", error)
          });
      } catch(err) {
        //console.log("loginWithEmailPassword error: ", `${err}`)
      }
    }
    export async function balanceOf(account) {
      let url = `${Url.LINKGEAR_DEV_URL}/auth/local/t-balanceOf`;
      if(__DEV__){
      console.log("balanceOf url: ", url);
      console.log("balanceOf account: ", account);
    }
      try{
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              account,
            }),
            credentials: 'include',
        })
        if(__DEV__)
        console.log("balanceOf res: ", res);
        return res;
      } catch(err) {
        console.log("balanceOf error: ", `${err}`)
        return {
          error: err
        }
      } 
    }
    export async function sendSMS(phone) {
      
      try {
        //console.log("sendSMS phone: ", phone);
        //let url = `${Url.LINKGEAR_DEV_URL}auth/local/t-sendSMS`;
        let url = `${Url.LINKGEAR_DEV_URL}/auth/local/m.sendCode`;
        
        let data = JSON.stringify({
          phone,
        })
        const res = await axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json',
            }
          }
        )
        return res;
      } catch(err) {
        //console.log("sendSMS error: ", `${err}`)
        return {
          error: err
        }
      }

  }
  export async function getSMSCode(mobile) {
      
    try {
      //console.log("sendSMS mobile: ", mobile);
      //let url = `${Url.LINKGEAR_DEV_URL}auth/local/t-sendSMS`;
      let url = `${Url.LINKGEAR_DEV_URL}/auth/local/m.getCode`;
        return await axios.post(
          url,
          {
            phone: mobile,
            credentials: 'include',
            withCredentials: true
          }
        )
    } catch(err) {
      //console.log("sendSMS error: ", `${err}`)
    }

}
export async function verifySMSCode(phone, code) {
      
  try {
    //console.log("verifySMSCode phone, code: ", phone, code);
    //let url = `${Url.LINKGEAR_DEV_URL}auth/local/t-sendSMS`;
    let url = `${Url.LINKGEAR_DEV_URL}/auth/local/m.verifyCode`;
    if(__DEV__)
    console.log("verifySMSCode url: ", url);
    
    let data = JSON.stringify({
      phone,
      code,
    })
    const res = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
        }
      }
    )
    return res;
  } catch(err) {
    //console.log("verifySMSCode error: ", `${err}`)
    return {
      error: err
    }
  }

}
// Forgot Password
export async function forgotPassword(username) {
  if(__DEV__)
  console.log("forgotPassword username: ", username);
  let url = `${Url.LINKGEAR_DEV_URL}/auth/local/forgot-password`;
  if(__DEV__)
  console.log("forgotPassword url: ", url);
  try{
      //const res = await fetch('/auth/local/forgot-password', {
      
      let data = JSON.stringify({
        username
      })
      const res = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
          }
        }
      )
      return res;
    } catch(err) {
      //console.log("forgotPassword error: ", `${err}`)
      return {
        error: err
      }
    } 
    
}
// Reset Password
export async function changePassword(userId, password, newPassword) {
  //console.log("changePassword userId, password, newPassword: ", userId, password, newPassword);
   
  let url = `${Url.LINKGEAR_DEV_URL}/auth/local/change-password`;
  //console.log("changePassword url: ", url);
  try{
        const res = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                userId,
                password,
                newPassword,
          }),
          credentials: 'include',
      })
      return res;
    } catch(err) {
      //console.log("changePassword error: ", `${err}`)
      return {
        error: err
      }
    } 
    
}
// Reset Password
export async function resetPassword(userId, token, newPassword) {
  //console.log("resetPassword userId, token, newPassword: ", userId, token, newPassword);
   
  let url = `${Url.LINKGEAR_DEV_URL}/auth/local/reset-password`;
  //console.log("resetPassword url: ", url);
  try{
      let data = JSON.stringify({
          userId,
          token,
          newPassword,
      })
      const res = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
          }
        }
      )
      return res;
    } catch(err) {
      //console.log("resetPassword error: ", `${err}`)
      return {
        error: err
      }
    } 
    
}

export async function getTokenponByMerchant(address) {
  //GET
    //console.log("getTokenponByMerchant address: ", address);
    let url = `${Url.LINKGEAR_TEST_URL6060}/api/getTokenponByMerchant/`+address;
  //console.log("getTokenponByMerchant url: ", url);
    try{
          const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
      })
      //console.log("getTokenponByMerchant res: ", res);
      return res;
    } catch(err) {
      //console.log("getTokenponByMerchant error: ", `${err}`)
      return {
        error: err
      }
    } 
  
}
/**
 * 1. Publish tokenpon
      Pass the following parameters: merchant, tokenponId, tokenNumber, minCount, expireDate
        "merchantAddr" : "0x256d1d8d9ad7b85d4b50ed5a77f27271818db6f3",
        "tokenponAddr" : "0xdb2b48ca47136e4f467aaaa4c123d9c7739c32a7",
        "minCount" : 5,
        "tokenponId" : "5c50c6c27acad63327f9fe97",
        "discountId" : "5ccccccccccccccccccccccc",
        "token" : 10,
        "expiryDate" : 1552875963519,
        "timestamp" : 1550284060704

      Api: "/api/publishTokenpon"
      const {merchant, tokenponId, tokenNumber, minCount, expireDate} = req.body;
 */
export async function publishTokenpon(tokenponInfo){
  //console.log("publishTokenpon tokenponInfo: ", tokenponInfo);
  let url = `${Url.LINKGEAR_TEST_URL6060}/api/publishTokenpon`;
  //console.log(" publishTokenpon tokenponInfo ", JSON.stringify(tokenponInfo));
  //console.log("publishTokenpon url: ", url);
  try{
        const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tokenponInfo),
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("publishTokenpon error: ", `${err}`)
    return {
      error: err
    }
  } 
}
export async function deleteVote(vote) {
  try {
    //console.log("API deleteVote vote: ", vote);
    let url = `${Url.LINKGEAR_TEST_URL6060}/api/deleteVote`;
    //console.log("deleteVote url: ", url);
    const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(vote),
          credentials: 'include',
      })
      return res;
    } catch(err) {
    //console.log("deleteVote error: ", `${err}`)
    return {
      error: err
    }
  }
}
export async function addVote(vote) {
  try {
    //console.log("API addVote vote: ", vote);
    let url = `${Url.LINKGEAR_TEST_URL6060}/api/addVote`;
    //console.log("addVote url: ", url);
    const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(vote),
          credentials: 'include',
      })
      return res;
    } catch(err) {
    //console.log("addVote error: ", `${err}`)
    return {
      error: err
    }
  }
}
export async function addComment(comment) {
  try {
    //console.log("API addComment comment: ", comment);
    let url = `${Url.LINKGEAR_TEST_URL6060}/api/addComment`;
    //console.log("addComment url: ", url);
    const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(comment),
          credentials: 'include',
      })
      return res;
    } catch(err) {
    //console.log("GetTransLogs error: ", `${err}`)
    return {
      error: err
    }
  }
}
export async function purchaseTokenpon(tokenpon) {
  try {
    //console.log("API purchaseTokenpon tokenpon: ", tokenpon);
    let url = `${Url.LINKGEAR_TEST_URL6060}/api/purchaseTokenpon`;
    //console.log("purchaseTokenpon url: ", url);
    const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tokenpon),
          credentials: 'include',
      })
      return res;
    } catch(err) {
    //console.log("GetTransLogs error: ", `${err}`)
    return {
      error: err
    }
  }
}
export async function redeemTokenpon(tokenponInfo){
  //console.log("redeemTokenpon tokenponInfo: ", tokenponInfo);
  let url = `${Url.LINKGEAR_TEST_URL6060}/api/redeemTokenpon`;
  //console.log(" redeemTokenpon tokenponInfo ", JSON.stringify(tokenponInfo));
  //console.log("redeemTokenpon url: ", url);
  try{
        const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tokenponInfo),
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("redeemTokenpon error: ", `${err}`)
    return {
      error: err
    }
  } 
}

// get a list of coupon for the merchant user
export async function getCouponList(account){
  
  //console.log("getCouponList account: ", account);
   
  let url = `${Url.LINKGEAR_DEV_URL}/auth/local/coupon-list`;
  //console.log("getCouponList url: ", url);
  try{
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          account, 
        }),
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("getCouponList error: ", `${err}`)
    return {
      error: err
    }
  } 
}

export async function getUserTokenProfile(username){
  if(__DEV__)
  console.log("getUserTokenProfile username: ", username);
   
  let url = `${Url.LINKGEAR_DEV_URL}/auth/local/tokenponProfile-query`;
  //console.log("getUserTokenProfile url: ", url);
  try{
    let data = JSON.stringify({
      username,
    })
    const res = await axios.post(url, data, {
          headers: {
              'Content-Type': 'application/json',
          }
      }
    )
    /*
    const res = await axios(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
        }),
        credentials: 'include',
    })*/
    return res;
  } catch(err) {
    //console.log("getUserTokenProfile error: ", `${err}`)
    return {
      error: err
    }
  } 
}
/**
 * let userExt = {
                userId: this.state.userId,
                gender: this.state.gender,
                dob: this.state.dob,
                icon: "testing icon base64 string",//this.state.iconBase64,
                displayName: this.state.displayName,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country,
                aboutme: this.state.aboutme
            }
 * @param {*} userExt 
 */
//https://ixinhub.com:6060/api/modifyUserExt
export async function modifyUserExt(userExt) {
  //console.log("modifyUserExt userExt: ", userExt);
  let url = `${Url.LINKGEAR_TEST_URL6060}/api/userExt`;
  //console.log(" modifyUserExt userExt ", JSON.stringify(userExt));
//console.log("modifyUserExt url: ", url);
  try{
        const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userExt),
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("modifyUserExt error: ", `${err}`)
    return {
      error: err
    }
  } 
}
export async function getUserExt(userId) {
  //console.log("getUserExt userId: ", userId);
  let url = `${Url.LINKGEAR_TEST_URL6060}/api/userExt/`+userId;
  //console.log("getUserExt url: ", url);
  try{
        const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("getUserExt error: ", `${err}`)
    return {
      error: err
    }
  } 
}
export async function getTokenponRedeemsByUser(accountAddress){
  //console.log("getTokenponRedeemsByUser accountAddress: ", accountAddress);
   
  let url = `${Url.LINKGEAR_TEST_URL6060}/api/getTokenponRedeemsByUser/`+accountAddress;
//console.log("getTokenponRedeemsByUser url: ", url);
  try{
        const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("getTokenponRedeemsByUser error: ", `${err}`)
    return {
      error: err
    }
  } 
}


export async function getOpenTokenponsByUser(accountAddress){
  
  //console.log("getOpenTokenponsByUser accountAddress: ", accountAddress);
   
  let url = `${Url.LINKGEAR_TEST_URL6060}/api/getOpenTokenponsByUser/`+accountAddress;
  //console.log("getOpenTokenponsByUser url: ", url);
  try{
        const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("getOpenTokenponsByUser error: ", `${err}`)
    return {
      error: err
    }
  } 
}
export async function getTokenponPurchasesByUser(accountAddress){
  
  //console.log("getTokenponPurchasesByUser accountAddress: ", accountAddress);
   
  let url = `${Url.LINKGEAR_TEST_URL6060}/api/getTokenponPurchasesByUser/`+accountAddress;
//console.log("getTokenponPurchasesByUser url: ", url);
  try{
        const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("getTokenponPurchasesByUser error: ", `${err}`)
    return {
      error: err
    }
  } 
}
/**
 *   name: req.body.name,
                    merchantAccountAddress: req.body.merchantAccountAddress,
                    businessName: req.body.businessName,
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    country: req.body.country,
                    email: req.body.email,
                    phone: req.body.phone,
                    webPage: req.body.webPage,
                    service: req.body.service,
                    servicingArea: req.body.servicingArea,
                    businessHour: req.body.businessHour,
                    businessMainCategory: req.body.businessMainCategory,
                    businessSubCategory: req.body.businessSubCategory,
                    postedBy: req.body.postedBy,
                    postedTime: req.body.postedTime,
                    pictures: req.body.pictures,
                    notification: req.body.notification,
                    discounts: req.body.discounts,
                    productDescription: req.body.productDescription,
                    overallTitle: req.body.overallTitle,
                    finePrint: req.body.finePrint
 * @param {*} listing 
 */
export async function updateTokenponListing(listing){
  //console.log("updateTokenponListing listing: ", listing);
   
  let url = `${Url.LINKGEAR_TEST_URL6060}/api/updateListing`;
  //console.log("updateTokenponListing url: ", url);
  try{
        const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing),
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("updateTokenponListing error: ", `${err}`)
    return {
      error: err
    }
  }
}

export async function userAction(userId, action){
  //console.log("userAction userId, action, TokenponAppId: ", userId, action, TokenponAppId);
  
  let url = `${Url.LINKGEAR_DEV_URL}/auth/local/t-userAction`;
  //console.log("userAction url: ", url);
  try{
        const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          app: TokenponAppId,
          action,
        }),
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("updateTokenponListing error: ", `${err}`)
    return {
      error: err
    }
  }
}
/**
 * 
 * @param {*} listing 
 accountAddress: "0xA60AaeCAA8cc119C9a5A6C34533dfda13ea1e7EC"
accountType: "merchant"
appId: 1
businessHour: "9am"
businessMainCategory: "Restaurants"
businessName: "Ixar"
city: "Fairfax"
country: "USA"
email: "dddu88@hotmail.com"
name: "du"
phone: "7878889897"
pictures: []
postedBy: "dddu88@hotmail.com"
postedTime: 1550033967142
service: "testing"
servicingArea: "NY"
state: "VA"
street: "123 old street"
zip: "22101"
 */
export async function updateBusinessTokenProfile(listing){
  
  //console.log("updateBusinessTokenProfile listing: ", listing);
   
  let url = `${Url.LINKGEAR_TEST_URL6060}/api/updateProfile/`;
  //console.log("updateBusinessTokenProfile url: ", url);
  try{
        const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing),
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("updateBusinessTokenProfile error: ", `${err}`)
    return {
      error: err
    }
  } 
}
export async function getBusinessTokenProfile(userId){
  
  //console.log("getBusinessTokenProfile userId: ", userId);
   
  let url = `${Url.LINKGEAR_TEST_URL6060}/api/getProfile/`+userId+"/1";
//console.log("getBusinessTokenProfile url: ", url);
  try{
        const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("getBusinessTokenProfile error: ", `${err}`)
    return {
      error: err
    }
  } 
}

export async function updateUserEmail(userId, email){
  //console.log("updateUserEmail userId, email: ", userId, email);
  let url = `${Url.LINKGEAR_DEV_URL}/auth/local/t-updateUser`;
  //console.log("updateUserEmail url: ", url);
  try{
      let data = JSON.stringify({
          userId,
          email,
      })
      const res = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
      )
      /*
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          email,
        }),
        credentials: 'include',
    })*/
    return res;
  } catch(err) {
    //console.log("updateUserEmail error: ", `${err}`)
    return {
      error: err
    }
  } 
}
export async function updateUserMobile(userId, mobile){
  //console.log("updateUserMobile userId, mobile: ", userId, mobile);
  let url = `${Url.LINKGEAR_DEV_URL}/auth/local/t-updateUser`;
  //console.log("updateUserMobile url: ", url);
  try{
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          mobile,
        }),
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("updateUserMobile error: ", `${err}`)
    return {
      error: err
    }
  } 
}

export async function updateUserType(userId, accountType){
  //console.log("updateUserType username, accountType: ", userId, accountType);
  let url = `${Url.LINKGEAR_DEV_URL}/auth/local/t-updateUser`;
  //console.log("updateUserType url: ", url);
  try{
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          accountType,
        }),
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("updateUserType error: ", `${err}`)
    return {
      error: err
    }
  } 
}
export async function updateUserDName(userId, dname){
  //console.log("updateUserDName userId, dname: ", userId, dname);
  let url = `${Url.LINKGEAR_DEV_URL}/auth/local/t-updateUser`;
  //console.log("updateUserDName url: ", url);
  try{
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          dname,
        }),
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("updateUserDName error: ", `${err}`)
    return {
      error: err
    }
  } 
}
/**
 * 
 * @param {*} profile json object: 
 * const profile = {
          username: "ixinpay", // This is the key for user name
          accountAddress: "This is the account address",
          accountType: "This is the account type",
          name: "This is the name",
          businessName: "This is the business name",
          street: "Street",
          city: "City",
          state: "State",
          zip: "zipcode",
          country: "Country",
          email: "thisOne@gmail.com",
          phone: "1.(123)456-7890"
    }
    profile.username = user.local.username;
    profile.createdAt = Date.now();
    profile.accountAddress = user.local.account;
 */
export async function updateUserTokenProfile(profile, userId){
  //console.log("updateUserTokenProfile profile, userId: ", profile, userId);
  let url = `${Url.LINKGEAR_DEV_URL}/auth/local/tokenponProfile-modify`;
  //console.log("updateUserTokenProfile url: ", url);
  try{
      profile.userId = userId;
      profile.changedAt = Date.now();
 
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile),
        credentials: 'include',
    })
    return res;
  } catch(err) {
    //console.log("updateUserTokenProfile error: ", `${err}`)
    return {
      error: err
    }
  } 
}

  export async function sendEmail(receiver, subject, message) {
    try {
      //console.log("sendEmail mobile, message: ", mobile, message);
      let url = Url.LINKGEAR_DEV_URL + '/auth/local/t-sendEmail';
        return await axios.post(
          url,
          {
            receiver: receiver,
            subject : subject,
            message : message,
            withCredentials: true
          }
        )
    } catch(err) {
      //console.log("sendSMS error: ", `${err}`)
    }
}

  export async function sendToken(userId, toAddress, token){
    //console.log("sendToken userId, toAddress, token: ", userId, toAddress, token);
    let url = `${Url.LINKGEAR_DEV_URL}/auth/local/t-userSendToken`;
    //https://ixinhub.com:8061/auth/local/t-userSendToken
    //
    try{
        //console.log("sendToken url: ", url);
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                  userId,
                  toAddress,
                  token
            }),
            credentials: 'include',
        })
        return res;
    } catch(err){
      //console.log("sendToken error: ", `${err}`)
    }
    
  }
/*
sample request payload
{
    "data_type": 1,
    "device_id": "12345",
    "device_data": {
        "issuer": "i1",
        "owner": "o2",
        "med_data": {
            "weight": 200,
            "height": 100,
            "gender": "female",
            "blood_pressure": {
                "high": 120,
                "low": 60
            },
            "glucose": 100
        }
    }
}
*/
  //http://ixinbuy.com/uploaddata
  export async function uploadData(data){
    //let url = "http://ixinbuy.com:7061/uploaddata";
    //ttdata.live:7061
    //let url = "http://ttdata.life:7061/uploaddata";
    let url = `${Url.LINKGEAR_CHAIN_URL}/uploaddata`;
    //let url = `${Url.LINKGEAR_DEV_URL}/uploaddata`;
    if(__DEV__){
    console.log("uploadData url: ", url);
    console.log("uploadData data: ", data);
    }
    try{
      /*
          const res = await fetch(url,{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
              credentials: 'include',
          })*/
          //{ 'headers': { 'appkey': mobileAppKey } }
          const res = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'appkey': mobileAppKey
                }
            }
          )

          //let resp = await res.json();
          if(__DEV__)
          console.log("uploadData res: ", res);
          return res;
    } catch(err) {
      console.log("uploadData error: ", `${err}`)
      return {
        error: err
      }
    } 
  }
  /*
{
	"data_type": 1,
	"device_id":"test-med-51503",
	"owner":"John Smith",
	"viewer": "viewer04",
	"fields": "heart_rate, glucose, blood_pressure"
}
  */
  export async function requestSharing(data){
    let url = `${Url.LINKGEAR_CHAIN_URL}/requestsharing`;
    if(__DEV__){
      console.log("requestSharing url: ", url);
      console.log("requestSharing data: ", data);
    }
    try{
       // let data = JSON.stringify(data); 
        const res = await axios.post(url, data, {
              headers: {
                  'Content-Type': 'application/json',
                  'appkey': mobileAppKey
              }
          }
        ) 
        if(__DEV__)
          console.log("requestSharing res: ", res);
        return res;
    } catch(err) {
      console.log("requestSharing error: ", `${err}`)
      return {
        error: err
      }
    } 
  }

export async function requestshare(data){
  let url = `${Url.LINKGEAR_CHAIN_URL}/requestshare`;
  if(__DEV__){
    console.log("requestshare url: ", url);
    console.log("requestshare data: ", data);
  }
  try{
     // let data = JSON.stringify(data);
      
      const res = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'appkey': mobileAppKey
            }
        }
      )
        /*
        const res = await axios.post(url, data, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include',
        })
        */
       if(__DEV__)
        console.log("requestshare res: ", res);
        return res;
  } catch(err) {
    console.log("requestshare error: ", `${err}`)
    return {
      error: err
    }
  } 
}
//http://ixinbuy.com:7961/api/getRegisteredApps
export async function getAppKeysByUser(mobile){
  if(__DEV__)
  console.log(" getAppKeysByUser mobile: ", mobile); 
  let url =`${Url.LINKGEAR_DEV_URL}/api/getRegisteredApps/${mobile}`;
  //let url =`${Url.LINKGEAR_DEV_URL}/api/getRegisteredApps`;
  if(__DEV__)
  console.log("getAppKeysByUser url: ", url);

  try{ 
       const response = await axios.get(url);
       if(__DEV__)
        console.log("getAppKeysByUser response: ", response);

        return response;
  } catch(err) {
      console.log("getAppKeysByUser error: ", `${err}`)
      return {
        error: err
      }
  } 
}
export async function getAppKey(category, appName, mobile)
{
  if(__DEV__)
  console.log("getAppKey category, appName, mobile: ", category, appName, mobile); 
  let url =`${Url.LINKGEAR_DEV_URL}/api/registerAppKey`;
  if(__DEV__)
  console.log("getAppKey url: ", url);

  try{
        let data = JSON.stringify({
          "device_id": appName,
          "category": category,
          "mobile": mobile
        }) 
        const res = await axios.post(url, data, {
              headers: {
                  'Content-Type': 'application/json',
              }
          }
        ) 
        if(__DEV__)
        console.log("getAppKey res: ", res);

        return res;
  }catch(err) {
      console.log("getAppKey error: ", `${err}`)
      return {
        error: err
      }
  } 
}
export async function addContacts(requesterMobile, contacts){
  if(__DEV__)
  console.log(" addContacts requesterMobile, contactList: ", requesterMobile, contacts);
   
  let url =`${Url.LINKGEAR_DEV_URL}/api/addContact`;//simon's 
  if(__DEV__)
  console.log("addContacts url: ", url);

        try{
          let data = JSON.stringify({
            "mobile":  requesterMobile,
            "contacts": contacts
        })
        if(__DEV__)
        console.log("addContacts data: ", data);

        const res = await axios.post(url, data, {
              headers: {
                  'Content-Type': 'application/json',
              }
          }
        )
        if(__DEV__)
        console.log("addContacts res: ", res);

        return res;
  } catch(err) {
      console.log("addContacts error: ", `${err}`)
      return {
        error: err
      }
  } 
}

//http://ixinbuy.com/getshareddata?data_type=1&device_id=12345&owner=o2&viewer=viewer1
//http://ixinbuy.com/getshareddata?data_type=1&device_id=12345&viewer=viewer1


export async function getShareData(type, deviceId, viewer){
  if(__DEV__)
  console.log(" getShareData type, deviceId, viewer: ", type, deviceId, viewer);
  //deviceId = mobileAppName;
  //let url = "http://ixinbuy.com/getshareddata";
  let url =`${Url.LINKGEAR_CHAIN_URL}/getshareddata?data_type=${type}&device_id=${deviceId}&viewer=${viewer}`;
  if(__DEV__)
  console.log("getShareData url: ", url);
  
  try{
    /*
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        */
       const response = await axios.get(url, { 'headers': { 'appkey': mobileAppKey } });
       if(__DEV__)
        console.log("getShareData response: ", response);

        return response;
  } catch(err) {
      console.log("getShareData error: ", `${err}`)
      return {
        error: err
      }
  } 
}


/*
export function getDRHInfo() {
    return axios.get(`${Url.ETHPLORER}`);
}
*/

/*
3. Request for shared data (GET)
http://ixinbuy.com/requestshare
sample request payload
{
"data_type": 1,
"device_id":"12345",
"owner":"o2",
"viewer": "viewer1",
"form":"medical-net",
"fields": "weight, height"
}

4. See what is being shared (GET)
http://ixinbuy.com/querydata
sample request payload
{"device_id":"12345"}sample response
{"Owner":"o2","ShareFields":"weight, height","Viewer":"viewer1, viewer2","form":"medical-net"}

5. Get shared data (GET)
http://ixinbuy.com/getshareddata
sample payload
{"data_type": 1,"device_id":"12345", "owner":"o2", "viewer":"viewer1"}

*/
