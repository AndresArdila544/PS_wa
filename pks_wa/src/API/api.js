const { rejects } = require('assert');
const http  = require('http');
const { resolve } = require('path');
const url = `http://localhost:8080/ApiRest/Luminary/`
const axios = require('axios')

async function getLuminary(){
    let res = await axios.get(`${url}`);
    let data = res.data
    //console.log(data)
    return data
}

async function getLuminaryById(id){
    let res = await axios.get(`${url}${id}`);
    let data = res.data
    return data
}

async function postLuminary(luminary) {
    //console.log(JSON.stringify(user))
    let res = await axios.post(url, luminary);    
    let data = res.data;
    //console.log(data)
    return data;    
}

async function updateLuminary(luminary){
    //console.log(JSON.stringify(data))
    let res = await axios.put(`${url}`,luminary)
    return res.data
}

async function deleteLuminary(id){
    let res = await axios.delete(`${url}${id}`);
    return res.status;
}

//  async function getLuminaryLoc(){
//     let res = await axios.get(`${url}locations`);
//     let data = res.data
//     console.log("hey")
//     console.log(data)
//     return data
// }

async function getLuminaryLoc(){
    return axios({
        url: 'http://localhost:8080/ApiRest/Luminary/locations',
        method: 'get',
        timeout: 8000,
        headers: {'Content-Type': 'application/json',}
    }).then(res=>res.data).catch(err=>console.log(err))
}

exports.makeGetLuminary = () =>{
    return getLuminary()
}

exports.makeGetLuminaryById = (id) =>{
   return getLuminaryById(id)
}

exports.makePostLuminary = (luminary) =>{
    return postLuminary(luminary)
}

exports.makeUpdateLuminary =(luminary)=>{
    return updateLuminary(luminary)
}

exports.makeDeleteLuminary = (id) =>{
    return deleteLuminary(id)
}

exports.makeGetLuminaryLoc = () =>{
    return getLuminaryLoc()
}