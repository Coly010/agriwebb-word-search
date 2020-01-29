import { Injectable } from '@angular/core';
import { Direction, FoundWord } from './models/word-search.model';

@Injectable({
  providedIn: 'root'
})
export class WordSearchService {
  constructor() {}

  findWords(letterGrid: string[][], wordsToSearch: string[]) {
    // Need to transform words to search for into letters
    const terms = this.transformWordsToTerms(wordsToSearch);
    const foundWords: FoundWord[] = [];

    termSearchLoop: for (let t = 0; t < terms.length; t++) {
      const term = terms[t];
      let foundWord: FoundWord = {
        word: wordsToSearch[t],
        startPoint: '-',
        endPoint: '-',
        direction: undefined
      };

      for (let j = 0; j < letterGrid.length; j++) {
        for (let i = 0; i < letterGrid[j].length; i++) {
          if (letterGrid[j][i] === term[0]) {
            if (
              letterGrid[i].length - i >= term.length &&
              this.isFoundRight(letterGrid[j], i, wordsToSearch[t])
            ) {
              foundWord = {
                ...foundWord,
                startPoint: `(${i + 1}, ${j + 1})`,
                endPoint: `(${i + term.length}, ${j + 1})`,
                direction: 'right'
              };

              this.upsertFoundWord(foundWords, foundWord);

              continue termSearchLoop;
            }

            if (
              i + 1 >= term.length &&
              this.isFoundLeft(letterGrid[j], i, wordsToSearch[t])
            ) {
              foundWord = {
                ...foundWord,
                startPoint: `(${i + 1}, ${j + 1})`,
                endPoint: `(${i + 1 - (term.length - 1)}, ${j + 1})`,
                direction: 'left'
              };
              this.upsertFoundWord(foundWords, foundWord);

              continue termSearchLoop;
            }

            if (
              j + 1 >= term.length &&
              this.isFoundUp(letterGrid, j, i, wordsToSearch[t])
            ) {
              foundWord = {
                ...foundWord,
                startPoint: `(${i + 1}, ${j + 1})`,
                endPoint: `(${i + 1}, ${j + 1 - (term.length - 1)})`,
                direction: 'up'
              };
              this.upsertFoundWord(foundWords, foundWord);

              continue termSearchLoop;
            }

            if (
              letterGrid.length - j >= term.length &&
              this.isFoundDown(letterGrid, j, i, wordsToSearch[t])
            ) {
              foundWord = {
                ...foundWord,
                startPoint: `(${i + 1}, ${j + 1})`,
                endPoint: `(${i + 1}, ${j + term.length})`,
                direction: 'down'
              };
              this.upsertFoundWord(foundWords, foundWord);

              continue termSearchLoop;
            }
          }
        }
        this.upsertFoundWord(foundWords, foundWord);
      }
    }

    return foundWords;
  }

  private upsertFoundWord(foundWords: FoundWord[], foundWord: FoundWord) {
    const index = foundWords.findIndex(word => word.word === foundWord.word);
    if (index === -1) {
      foundWords.push(foundWord);
    } else {
      foundWords[index] = foundWord;
    }
  }

  private transformWordsToTerms(words: string[]) {
    return words.map(word => {
      const letters = [];
      for (const letter of word) {
        letters.push(letter);
      }
      return letters;
    });
  }

  private isFoundLeft(row: string[], startingPoint: number, word: string) {
    const rowString = [...row]
      .reverse()
      .toString()
      .replace(/,/g, '');
    startingPoint = row.length - startingPoint - 1;
    return rowString.slice(startingPoint, startingPoint + word.length) === word;
  }

  private isFoundRight(row: string[], startingPoint: number, word: string) {
    const rowString = [...row].toString().replace(/,/g, '');
    return rowString.slice(startingPoint, startingPoint + word.length) === word;
  }

  private isFoundDown(
    grid: string[][],
    rowStart: number,
    column: number,
    word: string
  ) {
    let term = '';
    for (let i = rowStart; i < rowStart + word.length; i++) {
      term += grid[i][column];
    }
    return term === word;
  }

  private isFoundUp(
    grid: string[][],
    rowStart: number,
    column: number,
    word: string
  ) {
    let term = '';
    for (let i = rowStart; i > rowStart - word.length; i--) {
      term += grid[i][column];
    }
    return term === word;
  }
}
