import { configureStore } from "@reduxjs/toolkit";
import { userslice, currentuserdataslice, loginuserslice, updateuserslice, alluserslice, userdatabyidslice, updateuserdatabyidslice, deleteuserdatabyidslice, addproductslice, getproductslice, getproductslicebycategory, allsellerslice, getsellerdataslicebyid, updatesellerdataslicebyid, deletesellerdataslicebyid, allproductslice, getproductsdataslicebyid, deleteproductsdataslicebyid, updateproductsdataslicebyid, getproductsinfoslice, addproducttocartslice, getcartdataslice, deletecartitemslice, placeorderslice, getorderslice, postnotificationslice, getnotificationslice, getnotificationbyidslice, postratingslice, getratingslice } from "./slices"

export const store = configureStore({
    reducer:{
      userslice:userslice.reducer,
      loginuserslice:loginuserslice.reducer,
      userdata:currentuserdataslice.reducer,
      updateuserdata:updateuserslice.reducer,
      alluserslice:alluserslice.reducer,
      allsellerslice:allsellerslice.reducer,
      userdatabyidslice:userdatabyidslice.reducer,
      updateuserdatabyidslice:updateuserdatabyidslice.reducer,
      deleteuserdatabyidslice:deleteuserdatabyidslice.reducer,
      addproductslice:addproductslice.reducer,
      getproductslice:getproductslice.reducer,
      getproductslicebycategory:getproductslicebycategory.reducer,
      getsellerdataslicebyid:getsellerdataslicebyid.reducer,
      updatesellerdataslicebyid:updatesellerdataslicebyid.reducer,
      deletesellerdataslicebyid:deletesellerdataslicebyid.reducer,
      allproductslice:allproductslice.reducer,
      getproductsdataslicebyid:getproductsdataslicebyid.reducer,
      deleteproductsdataslicebyid:deleteproductsdataslicebyid.reducer,
      updateproductsdataslicebyid:updateproductsdataslicebyid.reducer,
      getproductsinfoslice:getproductsinfoslice.reducer,
      addproducttocartslice:addproducttocartslice.reducer,
      getcartdataslice:getcartdataslice.reducer,
      deletecartitemslice:deletecartitemslice.reducer,
      placeorderslice:placeorderslice.reducer,
      getorderslice:getorderslice.reducer,
      postnotificationslice:postnotificationslice.reducer,
      getnotificationslice:getnotificationslice.reducer,
      getnotificationbyidslice:getnotificationbyidslice.reducer,
      postratingslice:postratingslice.reducer,
      getratingslice:getratingslice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})