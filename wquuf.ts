export default class WeightedQuickUnionUF {
  private id: number[];
  private sz: number[];

  constructor(n: number) {
    this.id = new Array(n);
    this.sz = new Array(n);

    for (let i = 0; i < n; i++) {
      this.id[i] = i;
      this.sz[i] = 1;
    }
  }

  root(i: number) {
    while (i !== this.id[i]) {
      this.id[i] = this.id[this.id[i]]; // Path compression
      i = this.id[i];
    }
    return i;
  }

  find(p: number): number {
    return this.root(p);
  }

  connected(p: number, q: number): boolean {
    return this.root(p) === this.root(q);
  }

  union(p: number, q: number) {
    const i = this.root(p);
    const j = this.root(q);

    if (i === j) return;

    if (this.sz[i] < this.sz[j]) {
      this.id[i] = j;
      this.sz[j] += this.sz[i];
    } else {
      this.id[j] = i;
      this.sz[i] += this.sz[j];
    }
  }
}
