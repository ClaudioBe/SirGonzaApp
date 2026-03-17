import{createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:3001/",
        //para que funcionen las cookies(token)
        credentials:"include"
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
            //post porque se tiene que eliminar la cookie
            logOut: builder.mutation({
                query:()=>({
                    url:"users/admin/logOut",
                    method:"POST"
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
    useGetUsers,useGetUserById,useLogInMutation,useLogOutMutation,useSignUpMutation,
    useDeleteUserForAdminMutation,useDeleteUserMutation}=userApi;



// export const logOut=()=>async(dispatch)=>{
//     return dispatch({type:LOG_OUT})
// }