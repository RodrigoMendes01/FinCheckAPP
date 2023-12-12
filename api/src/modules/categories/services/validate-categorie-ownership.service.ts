import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategorieOwnershipService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async validate(userId: string, categorietId: string) {
    const isOwner = await this.categoriesRepo.findFirst({
      where: { userId, id: categorietId },
    });

    if (!isOwner) {
      throw new NotFoundException('Número da categoria não encontrada!');
    }
  }
}
