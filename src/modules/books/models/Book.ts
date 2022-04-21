import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Author } from '../../author/models/Author';

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

  @Column()
  author_id: string;

  //ToDo: Transformar em uma classe e ter relação com o livro
  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'author_id' })
  author: string;

  // ToDo: Adicionar classe de data de publicação

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
