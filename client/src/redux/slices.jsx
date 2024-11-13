import { createSlice } from "@reduxjs/toolkit";
import {
  signupuser,
  loginuser,
  getuserdata,
  changepassword,
  updateuser,
  getallusers,
  getuserdatabyid,
  updateuserdatabyid,
  deleteuserdatabyid,
  addproducts,
  getproducts,
  getproductsbycategory,
  getsellers,
  getsellerdatabyid,
  updatesellerdatabyid,
  deletesellerdatabyid,
  getallproducts,
  getProductsDataById,
  deleteproductbyid,
  updateproductbyid,
  getproductsinfo,
  addproductstocart,
  getcartdata,
  removecartdata,
  placeorder,
  getordersdata,
  postnotifications,
  getnotificationsdata,
  getnotificationsdatabyid,
  postreview,
  getproductratings
} from "./api";

export const userslice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    userreducer: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    /* signup users */
    builders.addCase(signupuser.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(signupuser.fulfilled, (state, action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(signupuser.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });

    /* change password */
    builders.addCase(changepassword.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(changepassword.fulfilled, (state, action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(changepassword.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});
export const { userreducer } = userslice.actions;

/* current user data */
export const currentuserdataslice = createSlice({
  name: "userdata",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    logoutreducer: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getuserdata.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getuserdata.fulfilled, (state, action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getuserdata.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});
export const { logoutreducer } = currentuserdataslice.actions;

/* login user */
export const loginuserslice = createSlice({
  name: "userlogin",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    loginreducer: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(loginuser.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(loginuser.fulfilled, (state, action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(loginuser.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});
export const { loginreducer } = loginuserslice.actions;

/* update userdata */
export const updateuserslice = createSlice({
  name: "updateuser",
  initialState: {
    loading: false,
    response: null,
  },
  reducers: {
    clearupdateuserdata: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(updateuser.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(updateuser.fulfilled, (state,action) => {
      (state.loading = false), (state.response = action.payload);
    });
    builders.addCase(updateuser.rejected, (state, action) => {
      (state.loading = false), (state.response = action.error);
    });
  },
});
export const { clearupdateuserdata } = updateuserslice.actions;

/* get all users */

export const alluserslice = createSlice({
  name: "updateuser",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    clearallusersdata: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getallusers.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getallusers.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getallusers.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});
export const { clearallusersdata } = alluserslice.actions;

/* get all sellers */

export const allsellerslice = createSlice({
  name: "allsellers",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    clearallsellersdata: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getsellers.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getsellers.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getsellers.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});
export const { clearallsellersdata } = allsellerslice.actions;


/* get userdata by id */
export const userdatabyidslice = createSlice({
  name: "getuserdatabyid",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    clearusersdatabyid: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getuserdatabyid.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getuserdatabyid.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getuserdatabyid.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});
export const { clearusersdatabyid } = userdatabyidslice.actions;

export const updateuserdatabyidslice = createSlice({
  name: "updateuserdatabyid",
  initialState: {
    loading: false,
    response: null,
  },
  reducers: {
    clearupdateusersdatabyid: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(updateuserdatabyid.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(updateuserdatabyid.fulfilled, (state,action) => {
      (state.loading = false), (state.response = action.payload);
    });
    builders.addCase(updateuserdatabyid.rejected, (state, action) => {
      (state.loading = false), (state.response = action.error);
    });
  },
});
export const { clearupdateusersdatabyid } = updateuserdatabyidslice.actions;

/* delete user by id */

export const deleteuserdatabyidslice = createSlice({
  name: "deleteuserdatabyid",
  initialState: {
    loading: false,
    response: null,
  },
  reducers: {
    deleteupdateusersdatabyid: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(deleteuserdatabyid.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(deleteuserdatabyid.fulfilled, (state,action) => {
      (state.loading = false), (state.response = action.payload);
    });
    builders.addCase(deleteuserdatabyid.rejected, (state, action) => {
      (state.loading = false), (state.response = action.error);
    });
  },
});
export const { deleteupdateusersdatabyid } = deleteuserdatabyidslice.actions;

/* add products */
export const addproductslice = createSlice({
  name: "addproducts",
  initialState: {
    loading: false,
    response: null,
  },
  reducers: {
    clearaddproductresponse: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(addproducts.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(addproducts.fulfilled, (state,action) => {
      (state.loading = false), (state.response = action.payload);
    });
    builders.addCase(addproducts.rejected, (state, action) => {
      (state.loading = false), (state.response = action.error);
    });
  },
});

export const { clearaddproductresponse } = addproductslice.actions;

/* get products for home page */
export const getproductslice = createSlice({
  name: "getproducts",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    cleargetproductresponse: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getproducts.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getproducts.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getproducts.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});

export const { cleargetproductresponse } = getproductslice.actions;

/* get products data by category */
export const getproductslicebycategory = createSlice({
  name: "getproductsbycategory",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    cleargetproductresponsebycategory: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getproductsbycategory.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getproductsbycategory.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getproductsbycategory.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});

export const { cleargetproductresponsebycategory } = getproductslicebycategory.actions;

/* get seller by id */
export const getsellerdataslicebyid = createSlice({
  name: "sellerdatabyid",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    clearsellerdataid: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getsellerdatabyid.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getsellerdatabyid.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getsellerdatabyid.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});

export const { clearsellerdataid } = getsellerdataslicebyid.actions;

/* update seller by id */
export const updatesellerdataslicebyid = createSlice({
  name: "updatesellerdatabyid",
  initialState: {
    loading: false,
    response: null,
  },
  reducers: {
    clearupdatesellerdata: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(updatesellerdatabyid.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(updatesellerdatabyid.fulfilled, (state,action) => {
      (state.loading = false), (state.response = action.payload);
    });
    builders.addCase(updatesellerdatabyid.rejected, (state, action) => {
      (state.loading = false), (state.response = action.error);
    });
  },
});

export const { clearupdatesellerdata } = updatesellerdataslicebyid.actions;

/* delete seller data */
export const deletesellerdataslicebyid = createSlice({
  name: "deletesellerdatabyid",
  initialState: {
    loading: false,
    response: null,
  },
  reducers: {
    cleardeletesellerdata: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(deletesellerdatabyid.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(deletesellerdatabyid.fulfilled, (state,action) => {
      (state.loading = false), (state.response = action.payload);
    });
    builders.addCase(deletesellerdatabyid.rejected, (state, action) => {
      (state.loading = false), (state.response = action.error);
    });
  },
});

export const { cleardeletesellerdata } = deletesellerdataslicebyid.actions;

/* get all products */
export const allproductslice = createSlice({
  name: "allproducts",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    clearallproducts: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getallproducts.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getallproducts.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getallproducts.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});

export const { clearallproducts } = allproductslice.actions;

export const getproductsdataslicebyid = createSlice({
  name: "productsbyid",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    cleargetproductsdatabyid: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getProductsDataById.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getProductsDataById.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getProductsDataById.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});

export const { cleargetproductsdatabyid } = getproductsdataslicebyid.actions;

/* delete product */
export const deleteproductsdataslicebyid = createSlice({
  name: "productsbyiddelete",
  initialState: {
    loading: false,
    response: null,
  },
  reducers: {
    cleardeleteproductsdatabyid: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(deleteproductbyid.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(deleteproductbyid.fulfilled, (state,action) => {
      (state.loading = false), (state.response = action.payload);
    });
    builders.addCase(deleteproductbyid.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});

export const { cleardeleteproductsdatabyid } = deleteproductsdataslicebyid.actions;

/* delete product */
export const updateproductsdataslicebyid = createSlice({
  name: "productsbyidupdate",
  initialState: {
    loading: false,
    response: null,
  },
  reducers: {
    clearupdateproductsdatabyid: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(updateproductbyid.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(updateproductbyid.fulfilled, (state,action) => {
      (state.loading = false), (state.response = action.payload);
    });
    builders.addCase(updateproductbyid.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});

export const { clearupdateproductsdatabyid } = updateproductsdataslicebyid.actions;

/* get products info */
export const getproductsinfoslice = createSlice({
  name: "productinfo",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    clearproductsinfoslice: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getproductsinfo.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getproductsinfo.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getproductsinfo.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});

export const { clearproductsinfoslice } = getproductsinfoslice.actions;

/* add products to cart */
export const addproducttocartslice = createSlice({
  name: "addtocart",
  initialState: {
    loading: false,
    response: null,
  },
  reducers: {
    clearaddproducttocartresponse: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(addproductstocart.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(addproductstocart.fulfilled, (state,action) => {
      (state.loading = false), (state.response = action.payload);
    });
    builders.addCase(addproductstocart.rejected, (state, action) => {
      (state.loading = false), (state.response = action.error);
    });
  },
});

export const { clearaddproducttocartresponse } = addproducttocartslice.actions;


/* get cart products */
export const getcartdataslice = createSlice({
  name: "getcartslice",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    cleargetcartdata: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getcartdata.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getcartdata.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getcartdata.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});

export const { cleargetcartdata } = getcartdataslice.actions;

/* get cart products */
export const deletecartitemslice = createSlice({
  name: "deletecartitem",
  initialState: {
    loading: false,
    response: null,
  },
  reducers: {
    cleardeletecartitem: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(removecartdata.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(removecartdata.fulfilled, (state,action) => {
      (state.loading = false), (state.response = action.payload);
    });
    builders.addCase(removecartdata.rejected, (state, action) => {
      (state.loading = false), (state.response = action.error);
    });
  },
});

export const { cleardeletecartitem } = deletecartitemslice.actions;

/* get cart products */
export const placeorderslice = createSlice({
  name: "placeorder",
  initialState: {
    loading: false,
    response: null,
  },
  reducers: {
    clearplaceorder: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(placeorder.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(placeorder.fulfilled, (state,action) => {
      (state.loading = false), (state.response = action.payload);
    });
    builders.addCase(placeorder.rejected, (state, action) => {
      (state.loading = false), (state.response = action.error);
    });
  },
});

export const { clearplaceorder } = placeorderslice.actions;

/* get orders data */
export const getorderslice = createSlice({
  name: "getorder",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    cleargetorders: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getordersdata.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getordersdata.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getordersdata.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});

export const { cleargetorders } = getorderslice.actions;

/* post notification */
export const postnotificationslice = createSlice({
  name: "postnotification",
  initialState: {
    loading: false,
    response: null,
  },
  reducers: {
    clearpostnotificationresponse: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(postnotifications.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(postnotifications.fulfilled, (state,action) => {
      (state.loading = false), (state.response = action.payload);
    });
    builders.addCase(postnotifications.rejected, (state, action) => {
      (state.loading = false), (state.response = action.error);
    });
  },
});

export const { clearpostnotificationresponse } = postnotificationslice.actions;

/* get notification */
export const getnotificationslice = createSlice({
  name: "getnotification",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    cleargetnotificationresponse: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getnotificationsdata.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getnotificationsdata.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getnotificationsdata.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});

export const { cleargetnotificationresponse } = getnotificationslice.actions;

/* get full notification */
export const getnotificationbyidslice = createSlice({
  name: "getnotificationbyid",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    cleargetnotificationbyidresponse: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getnotificationsdatabyid.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getnotificationsdatabyid.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getnotificationsdatabyid.rejected, (state, action) => {
      (state.loading = false), (state.data = action.error);
    });
  },
});

export const { cleargetnotificationbyidresponse } = getnotificationbyidslice.actions;

/* post rating */
export const postratingslice = createSlice({
  name: "postrating",
  initialState: {
    loading: false,
    response: null,
  },
  reducers: {
    clearpostrating: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(postreview.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(postreview.fulfilled, (state,action) => {
      (state.loading = false), (state.response = action.payload);
    });
    builders.addCase(postreview.rejected, (state, action) => {
      (state.loading = false), (state.response = action.error);
    });
  },
});

export const { clearpostrating } = postratingslice.actions;

/* get product rating */
export const getratingslice = createSlice({
  name: "getrating",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    cleargetrating: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getproductratings.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getproductratings.fulfilled, (state,action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(getproductratings.rejected, (state, action) => {
      (state.loading = false), (state.response = action.error);
    });
  },
});

export const { cleargetrating } = getratingslice.actions;