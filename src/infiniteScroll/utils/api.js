import { API } from "./constants";
import client from "../../client";
import { Navigate } from "react-router-dom";

class Api {
  constructor(httpClient) {
    this.client = httpClient;
  }

  async comments(requsetType, _page, _category, _peopleCount) { // type에 따라 http요청 수행
    let response;

    //console.log("requset Type : " + requsetType); 

    if(requsetType=="ROLE_ADMIN" || requsetType=="ROLE_USER"){
      await client.get("/poses", {
        params: { category : _category, peopleCount : _peopleCount, page : _page }
      }).then(function(res){
        response = res;
        //console.log(res);
      }).catch(function(err){
        console.log(err);
        alert("데이터가 없습니다!");
      });
    } else if(requsetType=="ALBUMS") {
      if(sessionStorage.getItem('token') != undefined){
        client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
      }
      await client.get("/albums", {
        params: { page : _page }
      }).then(function(res){
        // //console.log(res); 
        response = res;
      }).catch(function(err){
        //console.log(err);
        alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        window.location.replace("/loginpage2");
      });
    } else if(requsetType.includes("PHOTOS")){
      if(sessionStorage.getItem('token') != undefined){
        client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
      }
      await client.get("/albums/"+requsetType.substring(7), {
        params: { page : _page }
      }).then(function(res){
        //console.log(res);
        response = res;
      }).catch(function(err){
        //console.log(err);
        alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        window.location.replace("/loginpage2");
      });
    }
    return response;
  }
}

export default Api;