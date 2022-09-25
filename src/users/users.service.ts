import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CriptografiaService } from 'src/criptografia/criptografia.service';
import { LoginDto } from './dto/login.dto';
import { AbstractService } from '../abstract.service';

@Injectable()
export class UsersService extends AbstractService<User> {
  saltOrRounds = 10;
  password = 'random_password';

  constructor(
    @InjectRepository(User)
    protected repository: Repository<User>,
    private hash: CriptografiaService,
  ) {
    super(repository);
  }

  async criarSenha(createUserDto: CreateUserDto) {
    createUserDto.senha = await this.hash.criptografar(createUserDto.senha);
    return this.criar(createUserDto);
  }

  async pesquisarPorUsuarioESenha(data: LoginDto) {
    const user = await this.repository.findOne({
      where: {
        usuario: data.usuario,
      },
    });
    if (!!user && (await this.hash.comparar(data.senha, user.senha))) {
      return user;
    }
    throw new HttpException(
      'Usuario ou senha invalidos',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
