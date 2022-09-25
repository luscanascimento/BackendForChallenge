import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  criar(@Body() createUserDto: CreateUserDto) {
    return this.usersService.criarSenha(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.usersService.pesquisarPorUsuarioESenha(loginDto);
  }

  @Get()
  encontrarTodos() {
    return this.usersService.encontrarTodos();
  }

  @Get(':id')
  encontrarUm(@Param('id') id: string) {
    return this.usersService.encontrarUm(+id);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.atualizar(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remover(+id);
  }
}
