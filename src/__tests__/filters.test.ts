import { describe, it, expect } from 'vitest';
import type { Alert, Severity, AlertStatus } from '../data/DataContract';

// Pure filter function — extract this from AlertsList or keep here for testing
function filterAlerts(
  alerts: Alert[],
  severityFilter: Severity[],
  statusFilter: AlertStatus | 'all',
  searchText: string,
): Alert[] {
  return alerts.filter((alert) => {
    if (severityFilter.length > 0 && !severityFilter.includes(alert.severity)) {
      return false;
    }
    if (statusFilter !== 'all' && alert.status !== statusFilter) {
      return false;
    }
    if (searchText) {
      const query = searchText.toLowerCase();
      const matchesTitle = alert.title.toLowerCase().includes(query);
      const matchesAgent = alert.actor.agentName.toLowerCase().includes(query);
      if (!matchesTitle && !matchesAgent) return false;
    }
    return true;
  });
}

const mockAlerts: Alert[] = [
  {
    id: 'alrt_001',
    title: 'Agent attempted to access production secrets',
    severity: 'critical',
    status: 'open',
    createdAt: '2026-01-18T09:12:34Z',
    actor: { agentName: 'deploy-agent-02', environment: 'prod' },
    summary: 'Summary 1',
    evidenceCount: 3,
  },
  {
    id: 'alrt_002',
    title: 'Suspicious outbound request to unknown domain',
    severity: 'high',
    status: 'open',
    createdAt: '2026-01-17T14:05:10Z',
    actor: { agentName: 'support-agent-01', environment: 'staging' },
    summary: 'Summary 2',
    evidenceCount: 2,
  },
  {
    id: 'alrt_003',
    title: 'Repeated tool-call failures (possible prompt loop)',
    severity: 'medium',
    status: 'acknowledged',
    createdAt: '2026-01-15T20:41:00Z',
    actor: { agentName: 'sales-agent-01', environment: 'dev' },
    summary: 'Summary 3',
    evidenceCount: 4,
  },
];

describe('filterAlerts', () => {
  it('returns all alerts when no filters are active', () => {
    const result = filterAlerts(mockAlerts, [], 'all', '');
    expect(result).toHaveLength(3);
  });

  it('filters by severity (multi-select)', () => {
    const result = filterAlerts(mockAlerts, ['critical', 'high'], 'all', '');
    expect(result).toHaveLength(2);
    expect(result.map((a) => a.id)).toEqual(['alrt_001', 'alrt_002']);
  });

  it('filters by status (single-select)', () => {
    const result = filterAlerts(mockAlerts, [], 'acknowledged', '');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('alrt_003');
  });

  it('filters by search text (case-insensitive, matches title)', () => {
    const result = filterAlerts(mockAlerts, [], 'all', 'SECRETS');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('alrt_001');
  });

  it('filters by search text (matches agentName)', () => {
    const result = filterAlerts(mockAlerts, [], 'all', 'support-agent');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('alrt_002');
  });

  it('combines filters with AND logic', () => {
    // severity=high + status=open + search="support"
    const result = filterAlerts(mockAlerts, ['high'], 'open', 'support');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('alrt_002');
  });

  it('returns empty array when no alerts match', () => {
    const result = filterAlerts(mockAlerts, ['low'], 'all', '');
    expect(result).toHaveLength(0);
  });
});
