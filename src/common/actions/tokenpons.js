import { tokenpons as TokenponsStore } from '@common/stores';
import { Api as ApiService } from 'common-services';


export async function getTokenpons(offset, limit, published, cat, subcat, searchtext) {
    console.log('getTokenpons offset, limit, published, cat, subcat, searchtext: ', offset, limit, published, cat, subcat, searchtext);
    TokenponsStore.isLoading(true);
    try{
        resultdata = await ApiService.GetTokenpons(offset, limit, published, cat, subcat, searchtext);//
        
          console.log("IXinTokenpon  getTokenpons resultdata: ", resultdata);
        if(resultdata && resultdata.status==200){
           
            body = resultdata.data;
            console.log("getTokenpons body: ", body);
              var data = body.data;
              console.log("getTokenpons data: ", data);
              TokenponsStore.addTokenpons(data);
        }else{
            //error
            TokenponsStore.setError(resultdata.error.message);
        }
    }catch(e) {
        console.log('getTokenpons exception e: ', e);
    }
    TokenponsStore.isLoading(false);
}