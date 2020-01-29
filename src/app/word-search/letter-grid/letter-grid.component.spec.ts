import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { LetterGridComponent } from './letter-grid.component';

describe('LetterGridComponent', () => {
  let spectator: Spectator<LetterGridComponent>;
  const createComponent = createComponentFactory({
    component: LetterGridComponent,
    shallow: true
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should check if the letter grid has error when value changes', () => {
    // Arrange
    const spyCheckIsIncompleteRow = spyOn(
      spectator.component,
      'checkIsIncompleteRow' as any
    );
    const spyCheckIsNotSquare = spyOn(
      spectator.component,
      'checkIsNotSquare' as any
    );
    // Act
    spectator.component.ngOnInit();
    spectator.component.grid.setValue('test');

    // Assert
    expect(spyCheckIsIncompleteRow).toHaveBeenCalled();
    expect(spyCheckIsNotSquare).toHaveBeenCalled();
  });

  it('should map string to matrix and emit output when value changes', () => {
    // Arrange
    const spyMapStringToArray = spyOn(
      spectator.component,
      'mapStringToArray' as any
    );
    const spyCheckIsIncompleteRow = spyOn(
      spectator.component,
      'checkIsIncompleteRow' as any
    );
    const spyCheckIsNotSquare = spyOn(
      spectator.component,
      'checkIsNotSquare' as any
    );
    const spyUpdateGrid = spyOn(spectator.component.updateGrid, 'emit');
    // Act
    spectator.component.ngOnInit();
    spectator.component.grid.setValue('test');

    // Assert
    expect(spyMapStringToArray).toHaveBeenCalled();
    expect(spyUpdateGrid).toHaveBeenCalled();
  });

  it('should check for incomplete row and set appropriate error', () => {
    // Arrange
    const grid = [['a', 'b'], ['c']];

    // Act
    spectator.component['checkIsIncompleteRow'](grid);

    // Assert
    expect(spectator.component.grid.hasError('incomplete')).toBeTruthy();
  });

  it('should check for incomplete row and not set error when correct', () => {
    // Arrange
    const grid = [
      ['a', 'b'],
      ['c', 'd']
    ];

    // Act
    spectator.component['checkIsIncompleteRow'](grid);

    // Assert
    expect(spectator.component.grid.hasError('incomplete')).not.toBeTruthy();
  });

  it('should check for square grid and set appropriate error', () => {
    // Arrange
    const grid = [['a', 'b', 'c'], ['d']];

    // Act
    spectator.component['checkIsNotSquare'](grid);

    // Assert
    expect(spectator.component.grid.hasError('notSquare')).toBeTruthy();
  });

  it('should check for square grid and not set error when correct', () => {
    // Arrange
    const grid = [
      ['a', 'b'],
      ['c', 'd']
    ];

    // Act
    spectator.component['checkIsNotSquare'](grid);

    // Assert
    expect(spectator.component.grid.hasError('notSquare')).not.toBeTruthy();
  });
});
