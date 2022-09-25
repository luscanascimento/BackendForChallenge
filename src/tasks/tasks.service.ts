import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { AbstractService } from '../abstract.service';
import { contaPorColunaQuery } from './queries';

@Injectable()
export class TasksService extends AbstractService<Task> {
  colunasPermitidas = ['status', 'prioridade'];

  constructor(
    @InjectRepository(Task)
    protected repository: Repository<Task>,
  ) {
    super(repository);
  }

  contaPorColuna(col: string) {
    if (this.colunasPermitidas.indexOf(col) == -1) {
      throw new HttpException('Erro', 1);
    }
    return this.repository.query(contaPorColunaQuery(col));
  }
}
