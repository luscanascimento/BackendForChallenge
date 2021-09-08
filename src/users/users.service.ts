import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CriptografiaService } from 'src/criptografia/criptografia.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  saltOrRounds = 10;
  password = 'random_password';

  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private hash: CriptografiaService,
  ) {}

  async criar(createUserDto: CreateUserDto) {
    createUserDto.senha = await this.hash.criptografar(createUserDto.senha);
    return this.repository.save(createUserDto);
  }

  encontrarTodos() {
    return this.repository.find();
  }

  encontrarUm(id: number) {
    return this.repository.findOne(id);
  }

  atualizar(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  remover(id: number) {
    return this.repository.delete(id);
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
