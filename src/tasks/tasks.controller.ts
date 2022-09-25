import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
} from '@nestjs/common';

import { TasksDto } from './dto/tasks.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  criar(@Body() tasksDto: TasksDto) {
    return this.tasksService.criar(tasksDto);
  }

  @Get()
  encontrarTodos() {
    return this.tasksService.encontrarTodos();
  }

  @Get('contaPorColuna/:col')
  contarPorColuna(@Param('col') col: string) {
    return this.tasksService.contaPorColuna(col);
  }

  @Get(':id')
  encontrarUm(@Param('id') id: string) {
    return this.tasksService.encontrarUm(+id);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.atualizar(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remover(+id);
  }
}
