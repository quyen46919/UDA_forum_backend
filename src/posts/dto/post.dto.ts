import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  content: string;
  description: string;
}

export class UpdatePostDto {
  @IsNotEmpty()
  id: number;
  content: string;
  title: string;
}
