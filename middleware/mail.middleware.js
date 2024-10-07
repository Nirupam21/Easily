import nodemailer from "nodemailer"



async function sendMail(){
        const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'nirupam2112@gmail.com',
                    pass: 'Incorrectniru@2167',
                }
        })

        const mailOptions = {
            from: 'nirupam2112@gmail.com',
            to: 'nirupam2112@gmail.com',
            subject: 'Application Received',
            text: 'You have succesfully applied to the Job'
        }

        try{
            const result = await transporter.sendMail(mailOptions)
            console.log('Email sent successfully')
        }catch(err){
            console.log("Email send failed with error "+err)
        }


}

sendMail()