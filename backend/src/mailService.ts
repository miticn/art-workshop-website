let nodemailer = require('nodemailer');

export default class mailService {
    private user = 'alexis.marquardt@ethereal.email'
    private pass = 'Mc741KwBumYkRRj2PF'
    private url = 'http://localhost:4200/'
    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: this.user,
            pass: this.pass
        }
    });

    sendRegisterEmail(email, name){
        let mailOptions = { 
            from: this.user,
            to: email,
            subject: 'Art Workshop - Primljen zahtev za registraciju',
            text:'Poštovani ' + name +',\n'+
            'Hvala Vam što ste se registrovali na naš sajt za umetničke radionice!\n\n'+
            'Vaš zahtev za registraciju je primljen i biće obrađen od strane administratora u najkraćem mogućem roku.\n\n'+
            
            'S poštovanjem,\n'+
            'Art Workshop Tim'
        };
        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }


    sendVerifiedAccountEmail(email, name, username){
        let mailOptions = {
            from: this.user,
            to: email,
            subject: 'Art Workshop - Uspešna registracija',
            text:'Poštovani ' + name +',\n'+
            'Želimo da Vam čestitamo na uspešnoj registraciji na naš sajt za umetničke radionice!\n\n'+

            'Koristeći Vaše korisničko ime '+username+', sada imate pristup našoj širokoj ponudi radionica i aktivnosti koje su dostupne online. Ukoliko imate bilo kakva pitanja ili želite da se upoznate sa našim uslugama, naš tim za podršku je uvek tu za Vas.\n'+
            'Uživajte u iskustvu kreativnog učenja i rada sa nama!\n\n'+
            
            'S poštovanjem,\n'+
            'Art Workshop Tim'
        };
        this.transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });}

    sendResetPasswordEmail(email, name, token){
        let mailOptions = {
            from: this.user,
            to: email,
            subject: 'Art Workshop - Zahtev za resetovanje lozinke',
            html:'Poštovani ' + name +',<br\>'+
            'Primili smo zahtev za resetovanje lozinke za vaš nalog.!<br\><br\>'+

            `Molimo Vas da koristite sledeći token da resetujete lozinku u roku od narednih 30 minuta: <br\>
            <a href="${this.url}resetPassword/`+token+'">Link<\a><br\><br\>'+
            
            'S poštovanjem,<br\>'+
            'Art Workshop Tim'
        };
        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}