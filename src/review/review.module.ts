import { TelegramModule } from './../telegram/telegram.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ReviewModel } from './review.model';
import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    TelegramModule,
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModel,
        schemaOptions: {
          collection: 'Review',
        },
      },
    ]),
  ],
})
export class ReviewModule {}
