import Percolation from './Percolation'

class PercolationStats {
  private mean: number;
  private sd: number;
  private highConfidence: number;
  private lowConfidence: number;

  constructor(n: number, trials: number) {
    if (n <= 0 || trials <= 0) {
      throw new Error('n and trials must be greater than 0')
    }

    let results: number[] = [];
    let randomRow: number;
    let randomColumn: number;
    let sdNumerator = 0;

    for (let i = 0; i < trials; i++) {
      let percolation = new Percolation(n);

      while (!percolation.percolates()) {
        randomRow = Math.floor(Math.random() * n) + 1;
        randomColumn = Math.floor(Math.random() * n) + 1;

        if (!percolation.isOpen(randomRow, randomColumn)) {
          percolation.open(randomRow, randomColumn);
        }
      }
      results[i] = percolation.openSiteCount() / (n * n);
    }

    this.mean = results.reduce((a, b) => a + b) / results.length;

    for (let i = 0; i < results.length; i++) {
      sdNumerator += (results[i] - this.mean) ** 2;
    }
    this.sd = sdNumerator / (results.length - 1);

    this.lowConfidence = this.mean - (1.96 * this.sd) / Math.sqrt(trials);
    this.highConfidence = this.mean + (1.96 * this.sd) / Math.sqrt(trials);
  }

  public getMean() {
    return this.mean;
  }

  public getSD() {
    return this.sd;
  }

  public getHighConfidence() {
    return this.highConfidence;
  }

  public getLowConfidence() {
    return this.lowConfidence;
  }
}

const percolationStats = new PercolationStats(200, 100);
console.log('Mean: ', + percolationStats.getMean())
console.log('Standard Deviation: ', percolationStats.getSD())
console.log('High Confidence: ', + percolationStats.getHighConfidence())
console.log('Low Confidence: ', + percolationStats.getLowConfidence())