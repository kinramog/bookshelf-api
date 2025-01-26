import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  //Получение всех книг
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  //Поиск книги по названию
  @Get('search')
  searchByTitle(@Query('title') title: string) {
    return this.booksService.searchByTitle(title);
  }

  //Создание книги
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }
}
