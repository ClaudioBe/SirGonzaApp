import{createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const appointmentApi = createApi({
    reducerPath: 'appointmentAPI',
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:3001",
        //para que funcionen las cookies(token)
        credentials:"include"
    }),
    endpoints:(builder)=>({
        //query es como unn get en axios o fetch
            getAppointments: builder.query({
                query:()=>"/appointments"
            }),
            postAppointments: builder.mutation({
                query:(newAppointment)=>({
                    url:"/appointments",
                    method:"POST",
                    body: newAppointment
                })
                
            }),
            putAppointment: builder.mutation({
                query:({updateAppoinment,id})=>( console.log("id redux: "+id),{
                    url:`/appointments/${id}`,
                    method:"PUT",
                    body:updateAppoinment
                })
            }),
            deleteAppointment: builder.mutation({
                query:(id)=>({
                    url:`/appointments/${id}`,
                    method:"DELETE",
                })
            }),
    })
})

export const {useGetAppointmentsQuery,usePostAppointmentsMutation,
    useDeleteAppointmentMutation,usePutAppointmentMutation}=appointmentApi
