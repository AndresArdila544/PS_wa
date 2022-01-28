const { rejects } = require('assert');
const http  = require('http');
const { resolve } = require('path');
const url = `http://localhost:8080/ApiRest/Luminary/`
const url2 = `http://localhost:8080/ApiRest/Lampost/`
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

//POSTES

async function getLampost(){
    let res = await axios.get(`${url2}`);
    let data = res.data
    //console.log(data)
    return data
}

async function getPostById(id){
    let res = await axios.get(`${url2}${id}`);
    let data = res.data
    return data
}

async function insertPost(post) {
    //console.log(JSON.stringify(user))
    let res = await axios.post(url2, post);    
    let data = res.data;
    //console.log(data)
    return data;    
}

async function updatePost(post){
    //console.log(JSON.stringify(data))
    let res = await axios.put(`${url2}`,post)
    return res.data
}

async function deletePost(id){
    let res = await axios.delete(`${url2}${id}`);
    return res.status;
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



exports.makeGetPost = () =>{
    return getLampost()
}

exports.makeGetPostById = (id) =>{
   return getPostById(id)
}

exports.makePostPost = (post) =>{
    return insertPost(post)
}

exports.makeUpdatePost =(post)=>{
    return updatePost(post)
}

exports.makeDeletePost = (id) =>{
    return deletePost(id)
}
