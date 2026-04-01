import{createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const appointmentApi = createApi({
    reducerPath: 'appointmentAPI',
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:3001/appointments/",
        //para que funcionen las cookies(token)
        credentials:"include"
    }),
    endpoints:(builder)=>({
        //query es como unn get en axios o fetch
            getAppointments: builder.query({
                query:()=>""
            }),
            postAppointments: builder.mutation({
                query:(newAppointment)=>({
                    url:"",
                    method:"POST",
                    body: newAppointment
                })
                
            }),
            putAppointment: builder.mutation({
                //spread operator para que el appointment se separe en un objeto
                query:({id,...updateAppoinment})=>( console.log("appointment: "+updateAppoinment + "id: "+ id),{
                    url:`${id}`,
                    method:"PUT",
                    body:updateAppoinment
                })
            }),
            deleteAppointment: builder.mutation({
                query:(id)=>({
                    url:`${id}`,
                    method:"DELETE",
                })
            }),
            deleteOldAppointments:builder.mutation({
                query:()=>({
                    url:'',
                    method:"DELETE"
                })
            })
    })
})

export const {useGetAppointmentsQuery,usePostAppointmentsMutation,
    useDeleteAppointmentMutation,usePutAppointmentMutation,useDeleteOldAppointmentsMutation}=appointmentApi
