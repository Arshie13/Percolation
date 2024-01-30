import PercolationStats from './MonteCarloSim';
import readline from 'readline-sync';

const n = readline.questionInt('Enter the size of the grid: ');
const trials = readline.questionInt('Enter the number of trials: ');

const percolationStats = new PercolationStats(n, trials);
  console.log('Mean: ', + percolationStats.getMean())
  console.log('Standard Deviation: ', percolationStats.getSD())
  console.log('High Confidence: ', + percolationStats.getHighConfidence())
  console.log('Low Confidence: ', + percolationStats.getLowConfidence())