import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.scss']
})
export class WordSearchComponent implements OnInit {
  letterGrid: string[][] = [[]];
  wordsToSearch: string[] = [];

  constructor() {}

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

  solve() {}
}
