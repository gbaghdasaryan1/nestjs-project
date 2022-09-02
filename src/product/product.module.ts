import { ProductModel } from './product.model';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductModel,
        schemaOptions: {
          collection: 'Product',
        },
      },
    ]),
  ],
})
export class ProductModule {}
