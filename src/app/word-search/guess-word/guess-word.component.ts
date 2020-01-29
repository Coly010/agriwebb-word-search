import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-guess-word',
  templateUrl: './guess-word.component.html',
  styleUrls: ['./guess-word.component.scss']
})
export class GuessWordComponent implements OnInit {
  @Input() words: string[];
  @Output() readonly addWord = new EventEmitter<string>();

  wordInput: FormControl;

  constructor() {}

  ngOnInit() {
    this.wordInput = new FormControl('');
  }

  preventSpace(event: KeyboardEvent) {
    event.preventDefault();
  }

  addWordToSearch() {
    this.addWord.emit(this.wordInput.value);
    this.wordInput.reset();
  }
  removeWordToSearch(wordIndex: number) {}

  wordTrackFn(index: number, item: string) {
    return index;
  }
}
