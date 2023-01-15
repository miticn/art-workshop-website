"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let nodemailer = require('nodemailer');
class mailService {
    constructor() {
        this.user = 'alexis.marquardt@ethereal.email';
        this.pass = 'Mc741KwBumYkRRj2PF';
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: this.user,
                pass: this.pass
            }
        });
    }
    send() {
        let mailOptions = {
            from: this.user,
            to: 'nmitic@pm.me',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
exports.default = mailService;
//# sourceMappingURL=mailService.js.map