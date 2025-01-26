import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) {}

  //Создание автора в БД
  create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorsRepository.create(createAuthorDto);
    return this.authorsRepository.save(author);
  }

  //Получение автора
  findAll() {
    const authors = this.authorsRepository.find();
    return authors;
  }

  //Получение книг конкретного автора
  async findBookByAuthor(authorId: number) {
    const books = await this.authorsRepository.find({
      where: { id: authorId },
      relations: ['books'],
    });

    return books.length > 0 ? books : 'Автор не найден';
  }
}
