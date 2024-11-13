import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = 'https://ecom-lwfl.onrender.com:3000'


/* signup user */
export const signupuser = createAsyncThunk('signup/user',async(values)=>{
        const response = await axios.post(`${url}/users/signup/user`,values);
        return response.data
});

/* login user */
export const loginuser = createAsyncThunk('login/user',async(values)=>{
        const response = await axios.post(`${url}/users/login/user`,values);
        return response.data
});

/* current user data */
export const getuserdata = createAsyncThunk('get/user/data', async(token)=>{
        const response = await axios.get(`${url}/users/user/data`,{
                headers:{
                        Authorization: `Bearer ${token}`
                }
        })
        return response.data
});

/* change user password */
export const changepassword = createAsyncThunk('change/password', async(values)=>{
        const response = await axios.post(`${url}/users/update/password`, values)
        return response.data
});

/* update user data */
export const updateuser = createAsyncThunk('update/user', async({values, token})=>{
        const response = await axios.post(`${url}/users/update/user`, values,{
                headers:{
                        Authorization: `Bearer ${token}`
                }      
        })
        return response.data
});


/* get all userdata */
export const getallusers = createAsyncThunk('get/users', async(token)=>{
        const response = await axios.get(`${url}/users/get/users`,{
                headers:{
                        Authorization: `Bearer ${token}`
                }  
        })
        return response.data
})

/* get userdata by id */
export const getuserdatabyid = createAsyncThunk('get/user/data/id', async({token, id})=>{
        const response = await axios.get(`${url}/users/get/user/data/${id}`,{
                headers:{
                        Authorization: `Bearer ${token}`
                }   
        })
        return response.data
});


/* update user by id */
export const updateuserdatabyid = createAsyncThunk('update/user/data/id', async({token, id, values})=>{
        const response = await axios.post(`${url}/users/update/userbyid/${id}`,values,{
                headers:{
                        Authorization: `Bearer ${token}`
                }   
        })
        return response.data
});

/* delete user by id */
export const deleteuserdatabyid = createAsyncThunk('delete/user/data/id', async({token, id})=>{
        const response = await axios.delete(`${url}/users/delete/user/${id}`,{
                headers:{
                        Authorization: `Bearer ${token}`
                }   
        })
        return response.data
});

/* get all sellers */
export const getsellers = createAsyncThunk('get/sellers/data/', async(token)=>{
        const response = await axios.get(`${url}/users/seller/management`,{
                headers:{
                        Authorization: `Bearer ${token}`
                }   
        })
        return response.data
});

/* get seller data by id */
export const getsellerdatabyid = createAsyncThunk('get/seller/data/id', async({token, id})=>{
        const response = await axios.get(`${url}/users/get/seller/data/${id}`,{
                headers:{
                        Authorization: `Bearer ${token}`
                }   
        })
        return response.data;
});

/* update user by id */
export const updatesellerdatabyid = createAsyncThunk('update/seller/data/id', async({token, id, values})=>{
        const response = await axios.post(`${url}/users/update/seller/management/${id}`,values,{
                headers:{
                        Authorization: `Bearer ${token}`
                }   
        })
        return response.data
});

/* delete user by id */
export const deletesellerdatabyid = createAsyncThunk('delete/seller/data/id', async({token, id})=>{
        const response = await axios.delete(`${url}/users/delete/seller/management/${id}`,{
                headers:{
                        Authorization: `Bearer ${token}`
                }   
        })
        return response.data
});

/* add products */

export const addproducts = createAsyncThunk('add/products/', async({token, formData })=>{
        const response = await axios.post(`${url}/products/add/products`,formData ,{
                headers:{
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                }   
        })
        return response.data
});

/* get products data for home page */
export const getproducts = createAsyncThunk('get/products/', async(token)=>{
        const response = await axios.get(`${url}/products/get/products`,{
                headers:{
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                }   
        })
        return response.data
});

/* get products data by category */
export const getproductsbycategory = createAsyncThunk('get/products/bycategory', async({ token, category })=>{
        const response = await axios.get(`${url}/products/getproducts/bycategory/${category}`,{
                headers:{
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                }   
        })
        return response.data
});

/* get all products */
export const getallproducts = createAsyncThunk('get/products/all', async( token )=>{
        const response = await axios.get(`${url}/products/get/products/byadmin`,{
                headers:{
                        'Authorization': `Bearer ${token}`
                }   
        })
        return response.data
});

/* get products by id */
export const getProductsDataById = createAsyncThunk(
        'get/products/byid', 
        async ({ token, id }) => {
          const response = await axios.get(`${url}/products/get/products/data/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          return response.data;
        }
      );


/* delete product */
export const deleteproductbyid = createAsyncThunk('/delete/product/byid', async({token,id})=>{
        const response = await axios.delete(`${url}/products/delete/products/${id}`,{
                headers: {
                        'Authorization': `Bearer ${token}`,
                      },
        })
        return response.data
});

/* update product */
export const updateproductbyid = createAsyncThunk('/update/product/byid', async({formData, token, id})=>{

        const response = await axios.post(`${url}/products/update/products/${id}`,formData,{
                headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                      },
        })
        return response.data
});

/* product info */
export const getproductsinfo = createAsyncThunk('/get/product/info', async({token, id})=>{
        const response = await axios.get(`${url}/products/get/product/info/${id}`,{
                headers: {
                        'Authorization': `Bearer ${token}`,
                      },
        })
        return response.data
});

/* add prodcuts to cart */
export const addproductstocart = createAsyncThunk('/add/products/tocart', async({items, token})=>{
        const response = await axios.post(`${url}/cart/add/cart/items`,items,{
                headers: {
                        'Authorization': `Bearer ${token}`,
                      },
        })
        return response.data
});

/* get cart products */
export const getcartdata = createAsyncThunk('/get/cart/products', async(token)=>{
        const response = await axios.get(`${url}/cart/get/cart/items`,{
                headers: {
                        'Authorization': `Bearer ${token}`,
                      },
        })
        return response.data
});

/* remove cart products */
export const removecartdata = createAsyncThunk('/remove/cart/products', async({token, id, quantity, size, price})=>{
        const response = await axios.delete(`${url}/cart/delete/product/cart/${id}/${quantity}/${size}/${price}`,{
                headers: {
                        'Authorization': `Bearer ${token}`,
                      },
        })
        return response.data
});

/* place order */
export const placeorder = createAsyncThunk('place/order', async(token)=>{
        const response = await axios.post(`${url}/orders/checkout`,{},{
                headers: {
                        'Authorization': `Bearer ${token}`,
                      },
        })
        return response.data
});

/* get orders data */
export const getordersdata = createAsyncThunk('get/order', async(token)=>{
        const response = await axios.get(`${url}/orders/get/orders`,{
                headers: {
                        'Authorization': `Bearer ${token}`,
                      },
        })
        return response.data
});

/* post notifications */
export const postnotifications = createAsyncThunk('post/notification', async({token, values})=>{
        const response = await axios.post(`${url}/notifications/post/notifications`,values,{
                headers: {
                        'Authorization': `Bearer ${token}`,
                      },
        })
        return response.data
});

/* get notifications */
export const getnotificationsdata = createAsyncThunk('get/notification', async(token)=>{
        const response = await axios.get(`${url}/notifications/get/notifications`,{
                headers: {
                        'Authorization': `Bearer ${token}`,
                      },
        })
        return response.data
});

/* get notifications by id */
export const getnotificationsdatabyid = createAsyncThunk('get/notificationdata', async({token, id})=>{
        const response = await axios.patch(`${url}/notifications/get/notification/${id}`,{},{
                headers: {
                        'Authorization': `Bearer ${token}`,
                      },
        })
        return response.data
});

/* post ratings */
export const postreview = createAsyncThunk('post/review', async({token,id, values})=>{
        
        const response = await axios.post(`${url}/ratings/post/ratings/${id}`, values,{
                headers: {
                        'Authorization': `Bearer ${token}`,
                      },
        });
        return response.data
});

/* get product ratings */
export const getproductratings = createAsyncThunk('get/review', async({token,id})=>{
        
        const response = await axios.get(`${url}/ratings/get/ratings/${id}`,{
                headers: {
                        'Authorization': `Bearer ${token}`,
                      },
        });
        return response.data
});