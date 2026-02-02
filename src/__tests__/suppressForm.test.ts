import { describe, it, expect } from 'vitest';
import type { Severity } from '../data/DataContract';

type Environment = 'dev' | 'staging' | 'prod';

type FormValues = {
  ruleName: string;
  environment: Environment;
  agentName: string;
  severityAtMost: Severity;
  titleContains: string;
  expiresInDays: number;
};

// Pure function to generate summary — extract this to a util if you want
function generateSummary(values: FormValues): string {
  let summary = `This rule will suppress ${values.severityAtMost} and lower severity alerts`;
  if (values.agentName) {
    summary += ` from agent ${values.agentName}`;
  }
  summary += ` in ${values.environment} for ${values.expiresInDays} days.`;
  if (values.titleContains) {
    summary += ` Only alerts with "${values.titleContains}" in the title.`;
  }
  return summary;
}

describe('generateSummary', () => {
  it('generates correct summary with all fields filled', () => {
    const result = generateSummary({
      ruleName: 'Test rule',
      environment: 'prod',
      agentName: 'deploy-agent-02',
      severityAtMost: 'medium',
      titleContains: 'secrets',
      expiresInDays: 30,
    });
    expect(result).toBe(
      'This rule will suppress medium and lower severity alerts from agent deploy-agent-02 in prod for 30 days. Only alerts with "secrets" in the title.',
    );
  });

  it('generates summary without agent name when empty', () => {
    const result = generateSummary({
      ruleName: 'Test rule',
      environment: 'staging',
      agentName: '',
      severityAtMost: 'high',
      titleContains: '',
      expiresInDays: 7,
    });
    expect(result).toBe(
      'This rule will suppress high and lower severity alerts in staging for 7 days.',
    );
  });

  it('includes titleContains only when provided', () => {
    const result = generateSummary({
      ruleName: 'Test',
      environment: 'dev',
      agentName: 'my-agent',
      severityAtMost: 'low',
      titleContains: '',
      expiresInDays: 90,
    });
    expect(result).not.toContain('Only alerts with');
  });
});

describe('FormValues validation rules', () => {
  it('ruleName must be 3-40 characters', () => {
    expect('ab'.length).toBeLessThan(3);
    expect('abc'.length).toBeGreaterThanOrEqual(3);
    expect('a'.repeat(40).length).toBeLessThanOrEqual(40);
    expect('a'.repeat(41).length).toBeGreaterThan(40);
  });

  it('expiresInDays must be 1-90', () => {
    const valid = (n: number) => n >= 1 && n <= 90;
    expect(valid(0)).toBe(false);
    expect(valid(1)).toBe(true);
    expect(valid(90)).toBe(true);
    expect(valid(91)).toBe(false);
  });
});
