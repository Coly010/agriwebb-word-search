import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-letter-grid',
  templateUrl: './letter-grid.component.html',
  styleUrls: ['./letter-grid.component.scss']
})
export class LetterGridComponent implements OnInit {
  @Output() readonly updateGrid = new EventEmitter<string[][]>();

  grid: FormControl;
  letterGrid: string[][] = [[]];

  errors = () => JSON.stringify(this.grid.errors);

  constructor() {}

  ngOnInit() {
    this.grid = new FormControl('', {
      updateOn: 'change'
    });

    this.grid.valueChanges
      .pipe(
        tap(() => {
          this.grid.setErrors(null);
        }),
        map(value => {
          return this.mapStringToArray(value);
        }),
        tap((grid: string[][]) => this.checkIsIncompleteRow(grid)),
        tap((grid: string[][]) => this.checkIsNotSquare(grid))
      )
      .subscribe({
        next: grid => this.updateGrid.emit(grid)
      });
  }

  handleGridChange(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
    }
  }

  private mapStringToArray(value: string) {
    const rows: string[] = value.split('\n');
    const grid: string[][] = rows.map(row => {
      const cols = [];
      for (const letter of row) {
        cols.push(letter);
      }

      return cols;
    });
    return grid;
  }

  private checkIsIncompleteRow(grid: string[][]) {
    let prevRowLength = 0;
    for (const row of grid) {
      if (prevRowLength !== 0 && row.length !== prevRowLength) {
        this.grid.setErrors({
          ...this.grid.errors,
          incomplete: true
        });
      }
      prevRowLength = row.length;
    }
  }

  private checkIsNotSquare(grid: string[][]) {
    if (grid.length !== grid[0].length) {
      this.grid.setErrors({
        ...this.grid.errors,
        notSquare: true
      });
    }
  }
}
