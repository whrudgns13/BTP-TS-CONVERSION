import { Test, TestingModule } from '@nestjs/testing';
import { RoleCollectionController } from './role-collection.controller';

describe('RoleColleactionController', () => {
  let controller: RoleCollectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleCollectionController],
    }).compile();

    controller = module.get<RoleCollectionController>(RoleCollectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
