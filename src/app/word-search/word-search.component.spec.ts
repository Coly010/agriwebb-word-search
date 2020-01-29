import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { WordSearchComponent } from './word-search.component';
import { WordSearchService } from './word-search.service';
import { FoundWord } from './models/word-search.model';

describe('WordSearchComponent', () => {
  let wordSearchService: WordSearchService;

  let spectator: Spectator<WordSearchComponent>;
  const createComponent = createComponentFactory({
    component: WordSearchComponent,
    shallow: true,
    mocks: [WordSearchService]
  });

  beforeEach(() => {
    spectator = createComponent();
    wordSearchService = spectator.get(WordSearchService);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should set the grid correctly', () => {
    // Arrange
    const grid = [
      ['c', 'a', 't', 'z'],
      ['a', 'g', 'o', 'd'],
      ['n', 'b', 'l', 't'],
      ['t', 'n', 'z', 'z']
    ];

    // Act
    spectator.component.setGrid(grid);

    // Assert
    expect(spectator.component.letterGrid).toEqual(grid);
  });

  it('should add a word to find', () => {
    // Arrange
    // Act
    spectator.component.addWord('test');
    // Assert
    expect(spectator.component.wordsToSearch.length).toBe(1);
    expect(spectator.component.wordsToSearch).toEqual(['test']);
  });

  it('should remove a word to find', () => {
    // Arrange
    spectator.component.wordsToSearch = ['test', 'cat'];
    // Act
    spectator.component.removeWord('cat');

    // Assert
    expect(spectator.component.wordsToSearch).toEqual(['test']);
  });

  it('should solve the puzzle', () => {
    // Arrange
    spectator.component.letterGrid = [
      ['c', 'a', 't', 'z'],
      ['a', 'g', 'o', 'd'],
      ['n', 'b', 'l', 't'],
      ['t', 'n', 'z', 'z']
    ];
    spectator.component.wordsToSearch = ['cat', 'dog', 'lot', 'can', 'some'];

    // Act
    spectator.component.solve();

    // Assert
    expect(wordSearchService.findWords).toHaveBeenCalled();
    expect(wordSearchService.findWords).toHaveBeenCalledWith(
      [
        ['c', 'a', 't', 'z'],
        ['a', 'g', 'o', 'd'],
        ['n', 'b', 'l', 't'],
        ['t', 'n', 'z', 'z']
      ],
      ['cat', 'dog', 'lot', 'can', 'some']
    );
  });
});
