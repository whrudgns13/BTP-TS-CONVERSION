import { Test, TestingModule } from '@nestjs/testing';
import { RoleCollectionService } from './role-collection.service';

describe('RoleCollectionService', () => {
  let service: RoleCollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleCollectionService],
    }).compile();

    service = module.get<RoleCollectionService>(RoleCollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
