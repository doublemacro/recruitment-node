import { Test, TestingModule } from '@nestjs/testing';
import { CarbonController } from './carbon.controller';
import { CarbonService } from './carbon.service';

describe('CarbonController', () => {
  let controller: CarbonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarbonController],
      providers: [CarbonService],
    }).compile();

    controller = module.get<CarbonController>(CarbonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
