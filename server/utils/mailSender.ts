
import dotenv from 'dotenv'
let nodemailer = require('nodemailer')
dotenv.config()

export default function sendMail(email:string|undefined,password:string|undefined){
console.log(process.env.email,process.env.password);

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
        secure: true,
      })
      // @TODO
      const mailData = {
        from:  process.env.email,
        to: email,
        subject: `Message From `,
        text: `Hello`,
        html: `<div>Email: ${email} password: ${password}</div>`
      }
      transporter.sendMail(mailData, function (err:any, info:any) {
        if(err)
          console.log(err)
        else
          console.log(info)
      })
      
      
}