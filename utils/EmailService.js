const nodemailer = require("nodemailer")
class EmailService{
    transporter;

	static init(){
		this.transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			//phut 1:02:01 secure ở port 465
			//port: 587,
			port: 465,
			auth:{
				user: process.env.EMAIL,
				pass: process.env.PASSWORD
			},
			//secure: true

		})
	}
	static async sendMail(to, subject, text, html){
		return await this.transporter.sendMail({to, subject, text, html})
	}
}

module.exports = EmailService