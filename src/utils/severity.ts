import type { Severity } from '../data/DataContract';

export const SEVERITY_WEIGHT: Record<Severity, number> = {
  low: 0,
  medium: 1,
  high: 2,
  critical: 3,
};
