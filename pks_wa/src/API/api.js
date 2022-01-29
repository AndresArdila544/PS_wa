const url = `http://localhost:8080/ApiRest/Luminary/`
const url2 = `http://localhost:8080/ApiRest/Lampost/`
const url3 = `http://localhost:8080/ApiRest/User/`
const axios = require('axios')


async function getLuminary() {
    let res = await axios.get(`${url}`);
    let data = res.data
    //console.log(data)
    return data
}

async function getLuminaryById(id) {
    let res = await axios.get(`${url}${id}`);
    let data = res.data
    return data
}

async function postLuminary(luminary) {
    //console.log(JSON.stringify(user))
    let res = await axios.post(`${url}`, luminary);
    let data = res.data;
    //console.log(data)
    return data;
}

async function updateLuminary(luminary) {
    //console.log(JSON.stringify(data))
    let res = await axios.put(`${url}`, luminary)
    return res.data
}

async function deleteLuminary(id) {
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

async function getLuminaryLoc() {
    return axios({
        url: 'http://localhost:8080/ApiRest/Luminary/locations',
        method: 'get',
        timeout: 8000,
        headers: { 'Content-Type': 'application/json', }
    }).then(res => res.data).catch(err => console.log(err))
}

//POSTES

async function getLampost() {
    let res = await axios.get(`${url2}`);
    let data = res.data
    //console.log(data)
    return data
}

async function getPostById(id) {
    let res = await axios.get(`${url2}${id}`);
    let data = res.data
    return data
}

async function insertPost(post) {
    //console.log(JSON.stringify(user))
    let res = await axios.post(`${url2}`, post);
    let data = res.data;
    //console.log(data)
    return data;
}

async function updatePost(post) {
    //console.log(JSON.stringify(data))
    let res = await axios.put(`${url2}`, post)
    return res.data
}

async function deletePost(id) {
    let res = await axios.delete(`${url2}${id}`);
    return res.status;
}

async function postUser(user) {

    let res = await axios.post(`${url3}`, user).catch(error => {
        console.log(error)
        alert("Error registrando usuario")
    });
    console.log(res);
    if (res !== undefined) {
        if (res.status === 200) {
            alert("Usuario registrado con exito")
        }
        let data = res.data;
        return data;
    }
}

async function getUserById(id) {
    let res = await axios.get(`${url3}${id}`);
    let data = res.data
    return data
}

async function loginUser(user) {
    console.log(user)
    let res = await axios.post(`${url3}login`, user);
    let data = res.data
    return data
}


export const makeGetLuminary = () => {
    return getLuminary()
}

export const makeGetLuminaryById = (id) => {
    return getLuminaryById(id)
}

export const makePostLuminary = (luminary) => {
    return postLuminary(luminary)
}

export const makeUpdateLuminary = (luminary) => {
    return updateLuminary(luminary)
}

export const makeDeleteLuminary = (id) => {
    return deleteLuminary(id)
}

export const makeGetLuminaryLoc = () => {
    return getLuminaryLoc()
}


export const makeGetPost = () => {
    return getLampost()
}

export const makeGetPostById = (id) => {
    return getPostById(id)
}

export const makePostPost = (post) => {
    return insertPost(post)
}

export const makeUpdatePost = (post) => {
    return updatePost(post)
}

export const makeDeletePost = (id) => {
    return deletePost(id)
}

export const makeGetUserById = (post) => {
    return getUserById(post)
}

export const makePostUser = (user) => {
    return postUser(user)
}

export const makeLoginUser = (user) => {
    return loginUser(user)
}
