import WeightedQuickUnionUF from "./wquuf";
import * as readline from 'readline-sync';

export default class Percolation {
  private grid: boolean[][];
  private gridLength: number;
  private top: number = 0;
  private bottom: number;
  private openSites: number = 0;
  private uf: WeightedQuickUnionUF;

  constructor(N: number) {
    if (N <= 0) {
      throw new Error("grid cannot be 0 or negative")
    }
    this.gridLength = N;
    this.grid = new Array<boolean[]>(N).fill([]).map(() => new Array<boolean>(N).fill(false));
    this.bottom = N * N + 1
    this.uf = new WeightedQuickUnionUF(N * N + 2)
  }
  // gets the index of the site in the UF array
  private getSiteIndex(row: number, column: number) {
    return this.gridLength * (row - 1) + column
  }
  // opens the site and connects it to any open neighbors
  public open(row: number, column: number) {
    this.grid[row - 1][column - 1] = true;

    if (row === 1) {
      this.uf.union(this.getSiteIndex(row, column), this.top)
    }

    if (row === this.gridLength) {
      this.uf.union(this.getSiteIndex(row, column), this.bottom)
    }

    //union possible neighbor(s)
    if (row > 1 && this.isOpen(row - 1, column)) {
      this.uf.union(this.getSiteIndex(row, column), this.getSiteIndex(row - 1, column))
    }
    if (row < this.gridLength && this.isOpen(row + 1, column)) {
      this.uf.union(this.getSiteIndex(row, column), this.getSiteIndex(row + 1, column))
    }
    if (column > 1 && this.isOpen(row, column - 1)) {
      this.uf.union(this.getSiteIndex(row, column), this.getSiteIndex(row, column - 1))
    }
    if (column < this.gridLength && this.isOpen(row, column + 1)) {
      this.uf.union(this.getSiteIndex(row, column), this.getSiteIndex(row, column + 1))
    }
    this.openSites++;
  }
  // checks if the site is open
  public isOpen(row: number, column: number) {
    return this.grid[row - 1][column - 1]
  }
  // checks if the site is full
  public percolates(): boolean {
    return this.uf.connected(this.top, this.bottom)
  }
  // displays the grid
  public displayGrid(): void {
    for (let i = 0; i < this.gridLength; i++) {
      let rowString = "";
      for (const cell of this.grid[i]) {
        rowString += cell ? "1 " : "0 ";
      }
      console.log(rowString);
    }
  }

  // returns the number of open sites
  public openSiteCount() {
    return this.openSites;
  }

  // opens a random number of cells
  public percolateChance(percentage: number) {
    if (percentage < 0 || percentage > 100) {
      throw new Error("percentage must be between 0 and 100")
    }

    const totalCells = this.gridLength * this.gridLength;
    const openCells = Math.floor(totalCells * (percentage / 100));
    let count = 0;

    while (count < openCells) {
      const randomRow = Math.floor(Math.random() * this.gridLength) + 1;
      const randomColumn = Math.floor(Math.random() * this.gridLength) + 1;
      if (!this.isOpen(randomRow, randomColumn)) {
        this.open(randomRow, randomColumn);
        count++;
      }
    }
  }
}

let n = readline.questionInt('Please enter the value for n: ');
const percolate = new Percolation(Number(n));
// percolate.open(1, 1);
// percolate.open(2, 1);
// percolate.open(3, 1);
// percolate.open(3, 2);
// percolate.open(3, 3);
// percolate.open(4, 3);
// percolate.open(5, 3);
// percolate.open(5, 4);
// percolate.open(5, 5);
percolate.percolateChance(60);
console.log(percolate.openSiteCount());
percolate.displayGrid();

console.log(percolate.percolates());