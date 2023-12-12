import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './categories.controller';
import { ValidateCategorieOwnershipService } from './services/validate-categorie-ownership.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ValidateCategorieOwnershipService],
  exports: [ValidateCategorieOwnershipService],
})
export class CategoriesModule {}
