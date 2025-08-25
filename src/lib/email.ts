import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD,
    },
});

export async function sendConfirmationEmail(email: string, name: string,recommendation:string) {
// console.log(process.env.NODE_MAILER_EMAIL,process.env.NODE_MAILER_PASSWORD)
    const mailOptions = {
        from: process.env.NODE_MAILER_EMAIL,
        to: email,
        subject: "Quiz Wise Plan",
        html: `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;
        border: 1px solid #dddddd; border-radius: 10px;">
                <h2 style="color: #333;">${ name }</h2>
                <p style="color: #555;">
                    ${recommendation}
                </p>
            </div>
    `,
    }
  return  transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error)
            return { error: error };
        } else {
            console.log(info)
            return { success: true, message: info.response };
        }
    });
}
