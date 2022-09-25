import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column()
  prioridade: string;

  @Column()
  status: string;

  @Column()
  dataDeCriacao: string;
}
