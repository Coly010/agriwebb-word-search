import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { WordSearchService } from './word-search.service';
import { FoundWord } from './models/word-search.model';

describe('WordSearchService', () => {
  let spectator: SpectatorService<WordSearchService>;
  const createService = createServiceFactory({
    service: WordSearchService
  });

  beforeEach(() => (spectator = createService()));

  it('should exist', () => {
    // Arrange
    // Act
    // Assert
    expect(spectator.service).toBeTruthy();
  });

  it('should upsert a word correctly', () => {
    // Arrange
    const words = [
      {
        word: 'sample',
        startPoint: '-',
        endPoint: '-',
        direction: undefined
      }
    ];
    const word: FoundWord = {
      word: 'test',
      startPoint: '-',
      endPoint: '-',
      direction: undefined
    };
    // Act
    spectator.service['upsertFoundWord'](words, word);
    spectator.service['upsertFoundWord'](words, {
      word: 'sample',
      startPoint: '(1,1)',
      endPoint: '(1,6)',
      direction: undefined
    });

    // Asset
    expect(words.length).toBe(2);
    expect(words[0].startPoint).toEqual('(1,1)');
    expect(words[1]).toEqual(word);
  });

  it('should transform words into terms correctly', () => {
    // Arrange
    const words = ['dog', 'cat', 'mouse'];
    const expectedArray = [
      ['d', 'o', 'g'],
      ['c', 'a', 't'],
      ['m', 'o', 'u', 's', 'e']
    ];

    // Act
    const transformed = spectator.service['transformWordsToTerms'](words);

    // Assert
    expect(transformed.length).toBe(3);
    expect(transformed).toEqual(expectedArray);
  });

  it('should find word to the left correctly', () => {
    // Arrange
    const row = ['a', 't', 'a', 'c'];
    // Act
    const foundWord = spectator.service['isFoundLeft'](row, 3, 'cat');
    const missingWord = spectator.service['isFoundLeft'](row, 3, 'can');

    // Assert
    expect(foundWord).toBeTrue();
    expect(missingWord).not.toBeTrue();
  });

  it('should find word to the right correctly', () => {
    // Arrange
    const row = ['a', 'c', 'a', 't'];
    // Act
    const foundWord = spectator.service['isFoundRight'](row, 1, 'cat');
    const missingWord = spectator.service['isFoundRight'](row, 1, 'can');

    // Assert
    expect(foundWord).toBeTrue();
    expect(missingWord).not.toBeTrue();
  });

  it('should find word going up correctly', () => {
    // Arrange
    const grid = [['a'], ['t'], ['a'], ['c']];
    // Act
    const foundWord = spectator.service['isFoundUp'](grid, 3, 0, 'cat');
    const missingWord = spectator.service['isFoundUp'](grid, 3, 0, 'can');

    // Assert
    expect(foundWord).toBeTrue();
    expect(missingWord).not.toBeTrue();
  });

  it('should find word going down correctly', () => {
    // Arrange
    const grid = [['a'], ['c'], ['a'], ['t']];
    // Act
    const foundWord = spectator.service['isFoundDown'](grid, 1, 0, 'cat');
    const missingWord = spectator.service['isFoundDown'](grid, 1, 0, 'can');

    // Assert
    expect(foundWord).toBeTrue();
    expect(missingWord).not.toBeTrue();
  });

  it('should find all words in grid correctly', () => {
    // Arrange
    const grid = [
      ['c', 'a', 't', 'z'],
      ['a', 'g', 'o', 'd'],
      ['n', 'b', 'l', 't'],
      ['t', 'n', 'z', 'z']
    ];

    const wordsToSearch = ['cat', 'dog', 'lot', 'can', 'some'];

    const expectedResult: FoundWord[] = [
      {
        word: 'cat',
        startPoint: '(1, 1)',
        endPoint: '(3, 1)',
        direction: 'right'
      },
      {
        word: 'dog',
        startPoint: '(4, 2)',
        endPoint: '(2, 2)',
        direction: 'left'
      },
      {
        word: 'lot',
        startPoint: '(3, 3)',
        endPoint: '(3, 1)',
        direction: 'up'
      },
      {
        word: 'can',
        startPoint: '(1, 1)',
        endPoint: '(1, 3)',
        direction: 'down'
      },
      {
        word: 'some',
        startPoint: '-',
        endPoint: '-',
        direction: undefined
      }
    ];

    // Act
    const foundWords = spectator.service.findWords(grid, wordsToSearch);

    // Assert
    expect(foundWords).toEqual(expectedResult);
  });
});
