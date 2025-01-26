import { Author } from 'src/authors/entities/author.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column()
  genre: string;

  @Column('int')
  year: number;

  @ManyToMany(() => Author, (author) => author.books, { cascade: true })
  @JoinTable()
  authors: Author[];
}
