import { CalculetteModule } from './calculette.module';

describe('CalculetteModule', () => {
  let calculetteModule: CalculetteModule;

  beforeEach(() => {
    calculetteModule = new CalculetteModule();
  });

  it('should create an instance', () => {
    expect(calculetteModule).toBeTruthy();
  });
});
