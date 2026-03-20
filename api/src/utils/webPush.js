const webpush=require('web-push');
const {User}=require('../db')

webpush.setVapidDetails(
    'mailto:bernalclaudio044@gmail.com',
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
)

const sendPush=async(pushSubscription, title, message)=>{
    try {
        const payload = JSON.stringify({title,message})
        await webpush.sendNotification(pushSubscription,payload);
    } catch (error) {
        console.log(error.message);
    }
}

const subscription=async(pushSubscription,userId)=>{
    try {
        await User.update({pushSubscription},{where:{id:userId}})
    } catch (error) {
        console.log(error.message);   
    }
}

module.exports={subscription,sendPush};