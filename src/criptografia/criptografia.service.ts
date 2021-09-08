import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CriptografiaService {
  saltOrRounds = 10;

  async criptografar(texto: string) {
    return await bcrypt.hash(texto, this.saltOrRounds);
  }

  async comparar(senha, hash) {
    return await bcrypt.compare(senha, hash);
  }
}
