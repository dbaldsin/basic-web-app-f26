import GameQueries from '../../utils/GameQueries';

describe('game questions', () => {
  test.each([
    ['What is 12 plus 8?', '20'],
    ['a1b2: what is 3 plus 4 multiplied by 5', '23'],
    ['what is (3 plus 4) multiplied by 5', '35'],
    ['what is -3 minus -8', '5'],
    ['what is 2 to the power of 10', '1024'],
    ['which of the following numbers is the largest: 12, 9, 300', '300'],
    ['which of the following numbers is the smallest: -12, 9, 300', '-12'],
    ['which of the following numbers are primes: 1, 2, 3, 4, 9, 17', '2, 3, 17'],
    ['which of the following numbers is both a square and a cube: 0, 1, 16, 64, 729', '0, 1, 64, 729'],
    ['what is the 10th number in the Fibonacci sequence', '55'],
    ['what is 4 divided by 0', undefined],
    ['what is process.exit()', undefined],
    ['What is your name?', undefined],
  ])('%s', (query, expected) => expect(GameQueries(query)).toBe(expected));
});
