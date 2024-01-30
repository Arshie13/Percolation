import PercolationStats from './PercolationStats';
import readline from 'readline-sync';
import Percolation from './Percolation';

const n = readline.questionInt('Enter the size of the grid: ');
const trials = readline.questionInt('Enter the number of trials: ');

const grid = () => {
  let percent = 0;
  const percolation = new Percolation(n);
  const percolationStats = new PercolationStats(n, trials);

  while (!percolation.percolates()) {
    percolation.percolateChance(percent);
    percolation.displayGrid();
    console.log('\n')
    percent += 10;

    if (percent === 100) {
      break;
    }
  }

  console.log('percentage until percolated: ', + percent)
  console.log('Mean: ', + percolationStats.getMean())
  console.log('Standard Deviation: ', percolationStats.getSD())
  console.log('High Confidence: ', + percolationStats.getHighConfidence())
  console.log('Low Confidence: ', + percolationStats.getLowConfidence())
}

grid();