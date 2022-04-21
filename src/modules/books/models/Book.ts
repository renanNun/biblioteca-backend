import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  photo: string;

  //ToDo: Transformar em uma classe e ter relação com o livro
  @Column()
  publisher: string;

  //ToDo: Transformar em uma classe e ter relação com o livro
  @Column()
  authors: string;

  // ToDo: Adicionar classe de data de publicação

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
