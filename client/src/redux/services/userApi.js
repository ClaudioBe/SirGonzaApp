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
                query:()=>""
            }),
            getUserById: builder.query({
                query:(id)=>`${id}`
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
                query:(id)=>({
                    url:`${id}`,
                    method:"DELETE",
                })
            }),
            deleteUserForAdmin: builder.mutation({
                query:(id)=>({
                    url:`admin/${id}`,
                    method:"DELETE",
                })
            }),
            deleteAllUsers: builder.mutation({
                query:()=>({
                    url:`all`,
                    method:"DELETE"
                })
            }),
            editProfile: builder.mutation({
                query:({id,...userUpdate})=>({
                    url:`edit/${id}`,
                    method: "PUT",
                    body:userUpdate
                })
            }),
            changePassword: builder.mutation({
                query:({id,...passwords})=>(console.log("passwords redux: " + passwords),
                {
                    url:`changePassword/${id}`,
                    method:"PUT",
                    body:passwords
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
    useGetUsersQuery,useGetUserByIdQuery,useLogInMutation,useLogOutMutation,useSignUpMutation,
    useDeleteUserForAdminMutation,useDeleteUserMutation,useDeleteAllUsersMutation,useEditProfileMutation,useChangePasswordMutation, useSubscriptionMutation}=userApi;