import{createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const notificationsApi = createApi({
    reducerPath: 'notificationsApi',
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:3001/notifications/",
        //para que funcionen las cookies(token)
        credentials:"include"
    }),
    endpoints:(builder)=>({
        //query es como unn get en axios o fetch
            getNotifications: builder.query({
                query:(userId)=>`${userId}`
            }),
            deleteNotification: builder.mutation({
                query:(id)=>({
                    url:`${id}`,
                    method:"DELETE",
                })
            }),
            deleteAllNotifications: builder.mutation({
                query:(userId)=>({
                    url:`all/${userId}`,
                    method:"DELETE"
                })
            })
    })
})

export const {
    useGetNotificationsQuery,
    useDeleteNotificationMutation,
    useDeleteAllNotificationsMutation}=notificationsApi
