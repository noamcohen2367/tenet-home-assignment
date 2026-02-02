import { describe, it, expect } from 'vitest';
import { SEVERITY_WEIGHT } from '../utils/severity';
import type { Severity } from '../data/DataContract';

describe('SEVERITY_WEIGHT', () => {
  it('has correct ordering: critical > high > medium > low', () => {
    expect(SEVERITY_WEIGHT.critical).toBeGreaterThan(SEVERITY_WEIGHT.high);
    expect(SEVERITY_WEIGHT.high).toBeGreaterThan(SEVERITY_WEIGHT.medium);
    expect(SEVERITY_WEIGHT.medium).toBeGreaterThan(SEVERITY_WEIGHT.low);
  });

  it('sorts an array of severities correctly', () => {
    const severities: Severity[] = ['low', 'critical', 'medium', 'high'];
    const sorted = [...severities].sort(
      (a, b) => SEVERITY_WEIGHT[a] - SEVERITY_WEIGHT[b],
    );
    expect(sorted).toEqual(['low', 'medium', 'high', 'critical']);
  });
});
