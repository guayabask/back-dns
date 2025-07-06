// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Contact } from './contact/entities/contact.entity';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',  // o el que uses realmente
      port: 465,               // normalmente 465 para SSL, o 587 para TLS
      secure: true,            // true para puerto 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendNewContactNotification(contact: Contact) {
    const mailOptions = {
      from: `"DNS System" <${process.env.SMTP_USER}>`,
      to: 'wua.carlos.14@gmail.com', // correo destino
      subject: 'Nuevo contacto registrado',
      html: `
        <h3>Nuevo contacto registrado</h3>
        <p><strong>Nombre:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error enviando correo:', error);
    }
  }
}
