import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { GuessWordComponent } from './guess-word.component';

describe('GuessWordComponent', () => {
  let spectator: Spectator<GuessWordComponent>;
  const createComponent = createComponentFactory({
    component: GuessWordComponent,
    shallow: true
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should add word to search', () => {
    // Arrange
    const spy = spyOn(spectator.component.addWord, 'emit');
    const spyCheckEmptyWord = spyOn(
      spectator.component,
      'checkEmptyWord' as any
    );

    spectator.component.wordInput.setValue('test');

    // Act
    spectator.component.addWordToSearch();

    // Assert
    expect(spyCheckEmptyWord).toHaveBeenCalled();
    expect(spyCheckEmptyWord).toHaveBeenCalledWith('test');
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('should not add word to search for invalid value', () => {
    // Arrange
    const spy = spyOn(spectator.component.addWord, 'emit');
    const spyCheckEmptyWord = spyOn(
      spectator.component,
      'checkEmptyWord' as any
    );

    spectator.component.wordInput.setValue('');

    // Act
    spectator.component.addWordToSearch();

    // Assert
    expect(spyCheckEmptyWord).toHaveBeenCalled();
    expect(spyCheckEmptyWord).toHaveBeenCalledWith('');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should remove word to search', () => {
    // Arrange
    const spy = spyOn(spectator.component.removeWord, 'emit');

    // Act
    spectator.component.removeWordToSearch('test');

    // Assert
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('should check if value is empty and set empty error to true if so', () => {
    // Arrange
    spectator.component.wordInput.markAsDirty();

    // Act
    spectator.component['checkEmptyWord']('');

    // Assert
    expect(spectator.component.wordInput.hasError('empty')).toBeTruthy();
  });

  it('should check if value is empty and do nothing if not', () => {
    // Arrange
    spectator.component.wordInput.markAsDirty();

    // Act
    spectator.component['checkEmptyWord']('test');

    // Assert
    expect(spectator.component.wordInput.hasError('empty')).not.toBeTruthy();
  });

  it('should check if the guessed word is empty when form value changes', () => {
    // Arrange
    const spyCheckEmptyWord = spyOn(
      spectator.component,
      'checkEmptyWord' as any
    );
    // Act
    spectator.component.ngOnInit();
    spectator.component.wordInput.setValue('test');

    // Assert
    expect(spyCheckEmptyWord).toHaveBeenCalled();
  });
});
