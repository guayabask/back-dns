import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class RecaptchaService {
  private readonly secretKey: string;

  constructor(private configService: ConfigService) {
    const secret = this.configService.get<string>('RECAPTCHA_SECRET_KEY');
    if (!secret) {
      throw new Error('RECAPTCHA_SECRET_KEY no está definida en las variables de entorno');
    }
    this.secretKey = secret;
  }

  async verifyToken(token: string): Promise<boolean> {
    const url = `https://www.google.com/recaptcha/api/siteverify`;

    try {
      const response = await axios.post(
        url,
        null,
        {
          params: {
            secret: this.secretKey,
            response: token,
          },
        }
      );

      return response.data.success;
    } catch (error) {
      console.error('Error verificando reCAPTCHA:', error);
      return false;
    }
  }
}
