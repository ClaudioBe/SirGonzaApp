import{createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:3001/users/",
        //para que funcionen las cookies(token)
        credentials:"include"
    }),
    endpoints:(builder)=>({
        //query es como unn get en axios o fetch
            getUsers: builder.query({
                query:(token)=>`admin/${token}`
            }),
            getUserById: builder.query({
                query:(id,token)=>`${id}/${token}`
            }),
            signUp: builder.mutation({
                query:(newUser)=>({
                    url:"signUp",
                    method:"POST",
                    body: newUser
                })
            }),
            logIn: builder.mutation({
                query:(user)=>({
                    url:"logIn",
                    method:"POST",
                    body: user
                })
            }),
            //post porque se tiene que eliminar la cookie
            logOut: builder.mutation({
                query:()=>({
                    url:"admin/logOut",
                    method:"POST"
                })
            }),
            deleteUser: builder.mutation({
                query:(id,token)=>({
                    url:`${id}/${token}`,
                    method:"DELETE",
                })
            }),
            deleteUserForAdmin: builder.mutation({
                query:(id,token)=>({
                    url:`admin/${id}/${token}`,
                    method:"DELETE",
                })
            }),
            subscription: builder.mutation({
                query:({PS,id})=>( console.log("redux: "+ PS),{
                    url:'subscription',
                    method:"POST",
                    body:{PS,id}
                })
            })
    })
})

export const {
    useGetUsers,useGetUserById,useLogInMutation,useLogOutMutation,useSignUpMutation,
    useDeleteUserForAdminMutation,useDeleteUserMutation,useSubscriptionMutation}=userApi;