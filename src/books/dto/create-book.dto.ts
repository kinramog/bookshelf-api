export class CreateBookDto {
  readonly title: string;
  readonly genre: string;
  readonly year: number;
  readonly authorIds: number[];
}
