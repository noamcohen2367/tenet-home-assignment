import type { AlertDetails } from './DataContract';

export const alertDetailsMock: Record<string, AlertDetails> = {
  alrt_001: {
    id: 'alrt_001',
    title: 'Agent attempted to access production secrets',
    severity: 'critical',
    status: 'open',
    createdAt: '2026-01-18T09:12:34Z',
    actor: { agentName: 'deploy-agent-02', environment: 'prod' },
    summary:
      'The agent attempted to read environment variables matching secret patterns during execution. Access was denied by policy enforcement.',
    evidenceCount: 3,
    evidence: [
      {
        id: 'ev_001',
        kind: 'tool_call',
        snippet: "tool=read_env keys=['AWS_SECRET_ACCESS_KEY','DB_PASSWORD']",
        timestamp: '2026-01-18T09:12:10Z',
      },
      {
        id: 'ev_002',
        kind: 'file',
        snippet: 'Attempted read: /etc/secrets/prod.env (permission denied)',
        timestamp: '2026-01-18T09:12:22Z',
      },
      {
        id: 'ev_003',
        kind: 'tool_call',
        snippet:
          "tool=grep pattern='SECRET|TOKEN|PASSWORD' scope='process_env'",
        timestamp: '2026-01-18T09:12:34Z',
      },
    ],
  },

  alrt_002: {
    id: 'alrt_002',
    title: 'Suspicious outbound request to unknown domain',
    severity: 'high',
    status: 'open',
    createdAt: '2026-01-17T14:05:10Z',
    actor: { agentName: 'support-agent-01', environment: 'staging' },
    summary:
      'The agent issued an HTTP request to a domain not seen before in this environment.',
    evidenceCount: 2,
    evidence: [
      {
        id: 'ev_004',
        kind: 'http',
        snippet: 'GET https://unknown-example.biz/api/v1/ping (200)',
        timestamp: '2026-01-17T14:03:01Z',
      },
      {
        id: 'ev_005',
        kind: 'http',
        snippet: 'POST https://unknown-example.biz/api/v1/upload (403)',
        timestamp: '2026-01-17T14:04:40Z',
      },
    ],
  },

  alrt_003: {
    id: 'alrt_003',
    title: 'Repeated tool-call failures (possible prompt loop)',
    severity: 'medium',
    status: 'acknowledged',
    createdAt: '2026-01-15T20:41:00Z',
    actor: { agentName: 'sales-agent-01', environment: 'dev' },
    summary:
      'The agent retried the same tool call multiple times with near-identical parameters.',
    evidenceCount: 4,
    evidence: [
      {
        id: 'ev_006',
        kind: 'tool_call',
        snippet: "tool=search_customer query='refund status' retries=5",
        timestamp: '2026-01-15T20:39:10Z',
      },
      {
        id: 'ev_007',
        kind: 'tool_call',
        snippet: "tool=search_customer query='refund status' retries=5",
        timestamp: '2026-01-15T20:39:40Z',
      },
      {
        id: 'ev_008',
        kind: 'tool_call',
        snippet: "tool=search_customer query='refund status' retries=5",
        timestamp: '2026-01-15T20:40:15Z',
      },
      {
        id: 'ev_009',
        kind: 'http',
        snippet: 'GET /internal/customer/refunds (500) retry=3',
        timestamp: '2026-01-15T20:41:00Z',
      },
    ],
  },
};
