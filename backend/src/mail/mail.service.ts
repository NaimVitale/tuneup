import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: 'Verificá tu cuenta en TuneUp',
        html: `
        <!DOCTYPE html>
        <html>
            <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
                <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #D946EF 0%, #A21CAF 50%, #7C3AED 100%); border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(193, 34, 237, 0.3);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 30px; text-align: center;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            TuneUp
                        </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 50px 40px;">
                        <h2 style="margin: 0 0 20px; font-size: 28px; font-weight: bold; color: #1a1a1a; text-align: center;">
                            ¡Bienvenido a TuneUp!
                        </h2>
                        
                        <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #4a4a4a; text-align: center;">
                            Estás a un paso de descubrir los mejores conciertos y eventos musicales.
                        </p>
                        
                        <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #4a4a4a; text-align: center;">
                            Para activar tu cuenta, hacé click en el botón de abajo:
                        </p>
                        
                        <!-- Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                            <td align="center" style="padding: 10px 0 30px;">
                                <a href="${url}" style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #C122ED 0%, #D946EF 100%); color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; border-radius: 12px; box-shadow: 0 4px 15px rgba(193, 34, 237, 0.4); transition: transform 0.2s;">
                                Activar mi cuenta
                                </a>
                            </td>
                            </tr>
                        </table>
                        
                        <!-- Warning -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; margin-top: 20px;">
                            <tr>
                            <td style="padding: 16px 20px;">
                                <p style="margin: 0; font-size: 14px; color: #92400e; line-height: 1.5;">
                                ⏰ <strong>Importante:</strong> Este enlace expira en 24 horas por seguridad.
                                </p>
                            </td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; text-align: center; background-color: #1a1a1a;">
                        <p style="margin: 0 0 10px; font-size: 14px; color: #ffffff; opacity: 0.9;">
                            Gracias por unirte a TuneUp 🎸
                        </p>
                        <p style="margin: 0; font-size: 12px; color: #ffffff; opacity: 0.6;">
                            Si no solicitaste esta cuenta, podés ignorar este email.
                        </p>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            </body>
        </html>
        `,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'No se pudo enviar el email de verificación',
      );
    }
  }
}