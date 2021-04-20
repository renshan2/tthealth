import { referrals as ReferralStore } from '@common/stores';
import { Api as ApiService } from 'common-services';

export async function addReferral(userid, mobile) { 
    //console.log("actions addReferral userid, mobile: ", userid, mobile);
    ReferralStore.isLoading(true);
    try{
        if(mobile.startsWith("+")){
            mobile = mobile.substring(1);
        }
        //console.log("actions addReferral mobile: ", mobile);
        
        let resultdata =  await ApiService.addReferral(userid, mobile);
        console.log("actions addReferral resultdata: ", resultdata);
  
        if(resultdata && resultdata.status==200){
            const body =  resultdata.data;
            console.log("actions addReferral body: ", body);
            if (body.status === 'error') {
                ReferralStore.setStatus("error");
                ReferralStore.setMessage(body.message);
                
            }else{
                //console.log("addReferral body.message: ", body.message);
                
                ReferralStore.setStatus("success");
                ReferralStore.setMessage(body.message);
                
            }
        }else{
            ReferralStore.setMessage(resultdata.error.message);
            ReferralStore.setStatus("error");
        }
        
      }
      catch (error) {
          //console.log('Referral sendClicked error.message: ', error.message);
          
      }
      ReferralStore.isLoading(false);
      //console.log('sendClicked ReferralStore: ', ReferralStore);
  }

  export async function getReferrals(userid) {
    //console.log('getReferrals userid: ', userid);
    ReferralStore.isLoading(true);
    try{
      const resultdata = await ApiService.getReferrals(userid);
      console.log("getReferrals resultdata: ", resultdata);
  
        if(resultdata && resultdata.status==200){
            //const body = resultdata;
            const body = resultdata.data;
            console.log("getReferrals body: ", body);
            
            if (body.status === 'error') {
              //console.log("getReferrals body.statusText: ", body.statusText);
              ReferralStore.setMessage(body.statusText);
            }else{
              //console.log("getReferrals body.message: ", body.message);
               var referrals = body.message;
               ReferralStore.addReferrals(referrals);
            }
        }else {
          //console.log("getReferrals error: ", resultdata.error);
          ReferralStore.setMessage(resultdata.error);
          ReferralStore.setStatus("error");
        }
      
      
    }catch(e) {
      //console.log('getReferrals exception e: ', e);
    }
    ReferralStore.isLoading(false);
  }