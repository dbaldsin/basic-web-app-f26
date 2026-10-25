function isPrime(n: number): boolean {
  if (!Number.isSafeInteger(n) || n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let d = 3; d <= n / d; d += 2) {
    if (n % d === 0) return false;
  }
  return true;
}

// Parse only numbers and arithmetic operators; never execute query text.
function arithmetic(expression: string): number | undefined {
  const input = expression
    .replace(/to the power of|raised to the power of/g, '^')
    .replace(/multiplied by|times/g, '*')
    .replace(/divided by/g, '/')
    .replace(/plus/g, '+').replace(/minus/g, '-')
    .replace(/modulo|modulus/g, '%').replace(/\s+/g, '');
  if (!/^[\d.()+*/%^\-]+$/.test(input) || input.length > 500) return;
  const tokens = input.match(/\d+(?:\.\d+)?|[()+*/%^\-]/g) || [];
  if (tokens.join('') !== input) return;
  let i = 0;
  function atom(): number {
    if (tokens[i] === '+') { i++; return atom(); }
    if (tokens[i] === '-') { i++; return -atom(); }
    if (tokens[i] === '(') {
      i++;
      const result = sum();
      if (tokens[i++] !== ')') throw new Error('Unclosed parenthesis');
      return result;
    }
    const token = tokens[i++];
    if (!token || !/^\d/.test(token)) throw new Error('Expected number');
    return Number(token);
  }
  function power(): number {
    const left = atom();
    if (tokens[i] === '^') { i++; return Math.pow(left, power()); }
    return left;
  }
  function product(): number {
    let result = power();
    while (['*', '/', '%'].includes(tokens[i])) {
      const op = tokens[i++];
      const right = power();
      result = op === '*' ? result * right : op === '/' ? result / right : result % right;
    }
    return result;
  }
  function sum(): number {
    let result = product();
    while (['+', '-'].includes(tokens[i])) {
      const op = tokens[i++];
      const right = product();
      result = op === '+' ? result + right : result - right;
    }
    return result;
  }
  try {
    const result = sum();
    if (i === tokens.length && Number.isFinite(result)) return result;
  } catch { return; }
}

export default function GameQueries(query: string): string | undefined {
  const q = query.toLowerCase().trim().replace(/\?$/, '').trim();
  const integerPower = q.match(/(?:what is|calculate) (-?\d+) (?:to the power of|raised to the power of) (\d+)$/);
  if (integerPower) {
    let exponent = Number(integerPower[2]);
    if (exponent > 10000 || integerPower[1].length > 1000) return '';
    let base = BigInt(integerPower[1]);
    let result = BigInt(1);
    while (exponent > 0) {
      if (exponent % 2 === 1) result *= base;
      exponent = Math.floor(exponent / 2);
      if (exponent > 0) base *= base;
    }
    return result.toString();
  }
  const list = q.match(/which of the following (?:numbers )?(.*?):\s*(.*)/);
  if (list) {
    const kind = list[1];
    const numbers = list[2].match(/-?\d+(?:\.\d+)?/g)?.map(Number) || [];
    if (!numbers.length) return '';
    if (/largest|greatest|maximum/.test(kind)) return String(Math.max(...numbers));
    if (/smallest|least|minimum/.test(kind)) return String(Math.min(...numbers));
    let predicate: ((n: number) => boolean) | undefined;
    if (/prime/.test(kind)) predicate = isPrime;
    else if (/square.*cube|cube.*square/.test(kind)) {
      predicate = n => n >= 0 && Number.isInteger(Math.sqrt(n)) && Math.pow(Math.round(Math.cbrt(n)), 3) === n;
    } else if (/square/.test(kind)) predicate = n => n >= 0 && Number.isInteger(Math.sqrt(n));
    else if (/cube/.test(kind)) predicate = n => Math.pow(Math.round(Math.cbrt(n)), 3) === n;
    else if (/even/.test(kind)) predicate = n => n % 2 === 0;
    else if (/odd/.test(kind)) predicate = n => Math.abs(n % 2) === 1;
    if (predicate) return numbers.filter(predicate).join(', ');
  }
  const fibonacci = q.match(/what is the (\d+)(?:st|nd|rd|th) (?:number in the fibonacci sequence|fibonacci number)/);
  if (fibonacci) {
    const n = Number(fibonacci[1]);
    if (n > 10000) return '';
    let a = BigInt(0), b = BigInt(1);
    for (let i = 0; i < n; i++) [a, b] = [b, a + b];
    return a.toString();
  }
  const expression = q.match(/(?:what is|calculate) (.+)$/);
  if (expression) {
    const result = arithmetic(expression[1]);
    if (result !== undefined) return String(result);
  }
  return undefined;
}
