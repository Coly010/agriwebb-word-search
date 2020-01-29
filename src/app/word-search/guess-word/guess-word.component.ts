import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-guess-word',
  templateUrl: './guess-word.component.html',
  styleUrls: ['./guess-word.component.scss']
})
export class GuessWordComponent implements OnInit {
  @Input() words: string[];
  @Output() readonly addWord = new EventEmitter<string>();
  @Output() readonly removeWord = new EventEmitter<string>();

  wordInput: FormControl;

  constructor() {}

  ngOnInit() {
    this.wordInput = new FormControl('');
    this.wordInput.valueChanges
      .pipe(
        untilDestroyed(this),
        tap(value => this.wordInput.setErrors(null)),
        tap(value => this.checkEmptyWord(value))
      )
      .subscribe();
  }

  preventSpace(event: KeyboardEvent) {
    event.preventDefault();
  }

  addWordToSearch() {
    this.checkEmptyWord(this.wordInput.value);

    if (
      this.wordInput.invalid ||
      this.wordInput.value === '' ||
      this.wordInput.value === null
    ) {
      return;
    }

    this.addWord.emit(this.wordInput.value);
    this.wordInput.reset();
  }

  removeWordToSearch(word: string) {
    this.removeWord.emit(word);
  }

  wordTrackFn(index: number, item: string) {
    return index;
  }

  private checkEmptyWord(value: string) {
    if (
      this.wordInput.dirty &&
      (value === null || value.replace(/\s/g, '') === '')
    ) {
      this.wordInput.setErrors({
        ...this.wordInput.errors,
        empty: true
      });
    }
  }
}
