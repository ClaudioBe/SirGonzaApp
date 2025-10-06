import{createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:3001/",
    }),
    endpoints:(builder)=>({
        //query es como unn get en axios o fetch
            getUsers: builder.query({
                query:(token)=>`users/admin/${token}`
            }),
            getUserById: builder.query({
                query:(id,token)=>`users/${id}/${token}`
            }),
            signUp: builder.mutation({
                query:(newUser)=>({
                    url:"/users/signUp",
                    method:"POST",
                    body: newUser
                })
            }),
            logIn: builder.mutation({
                query:(user)=>({
                    url:"/users/logIn",
                    method:"POST",
                    body: user
                })
            }),
            deleteUser: builder.mutation({
                query:(id,token)=>({
                    url:`/users/${id}/${token}`,
                    method:"DELETE",
                })
            }),
            deleteUserForAdmin: builder.mutation({
                query:(id,token)=>({
                    url:`/users/admin/${id}/${token}`,
                    method:"DELETE",
                })
            }),
    })
})

export const {
    useGetUsers,useGetUserById,useLogInMutation,useSignUpMutation,
    useDeleteUserForAdminMutation,useDeleteUserMutation}=userApi;



// export const logOut=()=>async(dispatch)=>{
//     return dispatch({type:LOG_OUT})
// }