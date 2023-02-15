"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let nodemailer = require('nodemailer');
class mailService {
    constructor() {
        this.user = 'beryl.blanda@ethereal.email';
        this.pass = 'JA9Ut5RxkphMgwzECv';
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
            subject: 'Art Workshop - Primljen zahtev za registraciju',
            text: 'Poštovani ' + name + ',\n' +
                'Hvala Vam što ste se registrovali na naš sajt za umetničke radionice!\n\n' +
                'Vaš zahtev za registraciju je primljen i biće obrađen od strane administratora u najkraćem mogućem roku.\n\n' +
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
    sendVerifiedAccountEmail(email, name, username) {
        let mailOptions = {
            from: this.user,
            to: email,
            subject: 'Art Workshop - Uspešna registracija',
            text: 'Poštovani ' + name + ',\n' +
                'Želimo da Vam čestitamo na uspešnoj registraciji na naš sajt za umetničke radionice!\n\n' +
                'Koristeći Vaše korisničko ime ' + username + ', sada imate pristup našoj širokoj ponudi radionica i aktivnosti koje su dostupne online. Ukoliko imate bilo kakva pitanja ili želite da se upoznate sa našim uslugama, naš tim za podršku je uvek tu za Vas.\n' +
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
        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    sendRejectedAccountEmail(email, name, username) {
        let mailOptions = {
            from: this.user,
            to: email,
            subject: 'Art Workshop - Odbijena registracija',
            text: 'Poštovani ' + name + ',\n' +
                'Želimo Vam se zahvaliti na interesu za registraciju na naš sajt. Nažalost, naš tim za podršku korisnicima je odbio Vašu registraciju.\n\n' +
                'Razlog za odbijanje registracije nije naveden, ali ukoliko želite da saznate više o tome, molimo Vas da nam se obratite putem emaila ili telefona.\n' +
                'Hvala Vam na razumijevanju i nadamo se da ćemo uskoro imati priliku da Vam pružimo naše usluge.\n\n' +
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
    sendFreeSeatsEmail(email, name, workshop) {
        let mailOptions = {
            from: this.user,
            to: email,
            subject: 'Art Workshop - Slobodna mesta',
            text: 'Poštovani ' + name + ',\n' +
                'Želimo da Vas obavestimo da su se slobodila mesta na radionici ' + workshop.name + '.\n\n' +
                'Ukoliko želite da se prijavite na radionicu, molimo Vas da to uradite putem našeg sajta.\n\n' +
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
}
exports.default = mailService;
//# sourceMappingURL=mailService.js.map