import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { ILike, In, Like, Repository } from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const { title, genre, year, authorIds } = createBookDto;

    const authors = await this.authorRepository.findBy({
      id: In(authorIds),
    });

    const book = this.booksRepository.create({
      title,
      genre,
      year,
      authors,
    });

    return this.booksRepository.save(book);
  }

  findAll() {
    const books = this.booksRepository.find({
      relations: ['authors'],
    });
    return books;
  }

  searchByTitle(title: string) {
    return this.booksRepository.findBy({
      title: ILike(`%${title}%`),
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} book`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} book`;
  // }
}
