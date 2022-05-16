const nodemailer = require('nodemailer')
class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure:true,
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD 
            }
        }) //с помощью его и будем отправлять на mail
    }

    async sendActivationMail(to, link){ //to - mail, link - куда будет отправляться //отправка письма
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,//почта от которой будут отправляться
            to, //кому
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text:'',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                ` //будем отправлять html
        })
    }
}
module.exports = new MailService();