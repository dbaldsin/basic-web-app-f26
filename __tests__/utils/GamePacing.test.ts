import shouldSkipForPacing from '../../utils/GamePacing';

test('temporary pacing skips some arithmetic but expires and preserves identity', () => {
  const active = Date.parse('2026-10-25T13:53:00Z');
  const expired = Date.parse('2026-10-25T13:56:30Z');
  const queries = Array.from({ length: 100 }, (_, n) => `What is ${n} plus 9?`);
  const skipped = queries.filter(q => shouldSkipForPacing(q, active));
  expect(skipped.length).toBeGreaterThan(15);
  expect(skipped.length).toBeLessThan(35);
  expect(queries.some(q => shouldSkipForPacing(q, expired))).toBe(false);
  expect(shouldSkipForPacing('What is your Andrew ID?', active)).toBe(false);
  expect(shouldSkipForPacing('What is your name?', active)).toBe(false);
});
