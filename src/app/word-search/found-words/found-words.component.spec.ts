import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { FoundWordsComponent } from './found-words.component';

describe('FoundWordsComponent', () => {
  let spectator: Spectator<FoundWordsComponent>;
  const createComponent = createComponentFactory({
    component: FoundWordsComponent,
    shallow: true
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
