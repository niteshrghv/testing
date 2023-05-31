const express=require('express');
const app=express();
const nodemailer=require('nodemailer');
app.get('/',(req,res)=>{
  res.send('I am server')
});

const start=async()=>{
  try
  {app.listen(5000,()=>{
    console.log("i am live on port 5000")
  })
}
catch(error){}
};
start();
// async function main(){
//   let testaccount=await nodemailer.createTestaccount();
//   let transporter=nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },});
// }