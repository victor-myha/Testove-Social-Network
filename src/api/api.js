import * as axios from "axios";

export const API = {
    getUsers() {
        return axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(response => {
                return response.data;
            });
    },
    getPosts(userId) {
        return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => {
                return response.data;
            });
    },
    getPostDetails(postId) {
        return axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => {
                return response.data;
            });
    },
    postNewPost(newPostData) {
        return axios.post(`https://jsonplaceholder.typicode.com/posts`, newPostData)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error)
            })
    },
    editPost(editPostData) {
        return axios.put(`https://jsonplaceholder.typicode.com/posts/${editPostData.id}`, editPostData)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error)
            })
    },
    delPost(delPostData) {
        return axios.delete(`https://jsonplaceholder.typicode.com/posts/${delPostData.id}`)
        .then(res => {  
            console.log('api.js',res);  
            console.log('api.js',res.data, res.status);  
        
          }) 
            .catch(error => {
                console.log(error)
            })
    },
    
}

