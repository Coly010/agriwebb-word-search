import { Component, OnInit, Input } from '@angular/core';
import { FoundWord } from './../models/word-search.model';

@Component({
  selector: 'app-found-words',
  templateUrl: './found-words.component.html',
  styleUrls: ['./found-words.component.scss']
})
export class FoundWordsComponent implements OnInit {
  @Input() wordsFound: FoundWord[];

  constructor() {}

  ngOnInit() {}

  wordTrackByFn(index: number, item: FoundWord) {
    return index;
  }
}
