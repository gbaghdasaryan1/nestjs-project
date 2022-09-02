import { IsString, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5)
  @Min(1, { message: 'մեկից պակաս չի կարող լինել' })
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}
