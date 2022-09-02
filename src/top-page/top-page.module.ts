import { TypegooseModule } from 'nestjs-typegoose';
import { TopPageModel } from './top-page.model';
import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  providers: [TopPageService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TopPageModel,
        schemaOptions: {
          collection: 'TopPage',
        },
      },
    ]),
  ],
  exports: [TopPageService],
})
export class TopPageModule {}
