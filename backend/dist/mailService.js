"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let nodemailer = require('nodemailer');
class mailService {
    constructor() {
        this.user = 'alexis.marquardt@ethereal.email';
        this.pass = 'Mc741KwBumYkRRj2PF';
        this.url = 'http://localhost:4200/';
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: this.user,
                pass: this.pass
            }
        });
    }
    sendRegisterEmail(email, name) {
        let mailOptions = {
            from: this.user,
            to: email,
            subject: 'Art Workshop - Uspešna registracija',
            text: 'Poštovani ' + name + ',\n' +
                'Želimo da Vam čestitamo na uspešnoj registraciji na naš sajt za umetničke radionice!\n\n' +
                'Koristeći Vašu registrovanu e-mail adresu ' + email + ', sada imate pristup našoj širokoj ponudi radionica i aktivnosti koje su dostupne online. Ukoliko imate bilo kakva pitanja ili želite da se upoznate sa našim uslugama, naš tim za podršku je uvek tu za Vas.\n' +
                'Uživajte u iskustvu kreativnog učenja i rada sa nama!\n\n' +
                'S poštovanjem,\n' +
                'Art Workshop Tim'
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
    sendResetPasswordEmail(email, name, token) {
        console.log(this.url);
        let mailOptions = {
            from: this.user,
            to: email,
            subject: 'Art Workshop - Zahtev za resetovanje lozinke',
            html: 'Poštovani ' + name + ',<br\>' +
                'Primili smo zahtev za resetovanje lozinke za vaš nalog.!<br\><br\>' +
                `Molimo Vas da koristite sledeći token da resetujete lozinku u roku od narednih 30 minuta: <br\>
            <a href="${this.url}resetPassword/` + token + '">Link<\a><br\><br\>' +
                'S poštovanjem,<br\>' +
                'Art Workshop Tim'
        };
        console.log(JSON.stringify(mailOptions));
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