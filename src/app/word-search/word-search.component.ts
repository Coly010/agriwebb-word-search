import { Component, OnInit } from '@angular/core';
import { WordSearchService } from './word-search.service';
import { FoundWord } from './models/word-search.model';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.scss']
})
export class WordSearchComponent implements OnInit {
  letterGrid: string[][] = [[]];
  wordsToSearch: string[] = [];

  wordsFound: FoundWord[];

  constructor(private readonly wordSearchService: WordSearchService) {}

  ngOnInit() {}

  setGrid(grid: string[][]) {
    this.letterGrid = grid;
  }

  addWord(word: string) {
    this.wordsToSearch.push(word);
  }

  removeWord(word: string) {
    this.wordsToSearch = this.wordsToSearch.filter(w => w !== word);
  }

  solve() {
    this.wordsFound = this.wordSearchService.findWords(
      this.letterGrid,
      this.wordsToSearch
    );
  }
}
