import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProgress, visitLesson, completeLesson, completionPercent } from './progress';
test('progress survives serialization, preserves completion time, and resumes the last lesson', () => {
  let progress = completeLesson({}, 'advaita-kshama', 'begin', '2026-11-05T10:00:00Z');
  progress = completeLesson(progress, 'advaita-kshama', 'begin', '2026-11-05T11:00:00Z');
  progress = visitLesson(progress, 'advaita-kshama', 'letting-go');
  const restored = parseProgress(JSON.stringify(progress));
  assert.equal(restored['advaita-kshama'].lastLesson, 'letting-go');
  assert.equal(restored['advaita-kshama'].completed.begin, '2026-11-05T10:00:00Z');
  assert.equal(completionPercent(restored, 'advaita-kshama'), 33);
});
test('corrupt storage and removed lesson IDs do not break or inflate progress', () => {
  assert.deepEqual(parseProgress('{oops'), {});
  assert.deepEqual(parseProgress('null'), {});
  assert.deepEqual(parseProgress('[]'), {});
  const restored = parseProgress(JSON.stringify({'advaita-kshama': {lastLesson:'begin', completed:{removed:'2026-11-05', begin:42}}}));
  assert.equal(completionPercent(restored, 'advaita-kshama'), 0);
  assert.deepEqual(completeLesson({}, 'unknown', 'unknown'), {});
});
