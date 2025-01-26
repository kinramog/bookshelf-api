import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  //Получение всех авторов
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  //Получение книг автора
  @Get(':id/books')
  findBooksByAuthor(@Param('id') id: string) {
    return this.authorsService.findBookByAuthor(+id);
  }

  //Создание автора
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }
}
