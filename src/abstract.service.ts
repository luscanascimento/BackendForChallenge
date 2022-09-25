import { Repository } from 'typeorm';

export abstract class AbstractService<T> {
  constructor(protected repository: Repository<T>) { }

  criar(criarDados: any) {
    return this.repository.save(criarDados);
  }

  encontrarTodos() {
    return this.repository.find();
  }

  encontrarUm(id: number) {
    return this.repository.findOne(id);
  }

  atualizar(id: number, atualizarDados: any) {
    this.repository.update(id, atualizarDados);
    return this.encontrarUm(id);
  }

  remover(id: number) {
    return this.repository.delete(id);
  }
}
