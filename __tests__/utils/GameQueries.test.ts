import GameQueries from '../../utils/GameQueries';

describe('game questions', () => {
  test.each([
    ['Which of the following is an anagram of listen: silent, google, enlists, banana?', 'silent'],
    ['Which of the following is an anagram of evil: veils, vile, livee?', 'vile'],
    ['What is 12 plus 8?', '20'],
    ['a1b2: what is 3 plus 4 multiplied by 5', '23'],
    ['what is (3 plus 4) multiplied by 5', '35'],
    ['what is -3 minus -8', '5'],
    ['what is 2 to the power of 10', '1024'],
    ['What is 78 to the power of 18?', '11420966257169880253255495209713664'],
    ['What is 95 to the power of 21?', '340561626288115122639539918422698974609375'],
    ['What is -2 to the power of 3?', '-8'],
    ['What is 9 to the power of 0?', '1'],
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
