export type Severity = 'low' | 'medium' | 'high' | 'critical';

export type AlertStatus = 'open' | 'acknowledged';

type Alert = {
  id: string;
  title: string;
  severity: Severity;
  status: AlertStatus;
  createdAt: string; // ISO string
  actor: {
    agentName: string;
    environment: 'dev' | 'staging' | 'prod';
  };
  summary: string; // 1–3 sentences
  evidenceCount: number; // integer >= 0
};

type EvidenceKind = 'tool_call' | 'http' | 'file';

type AlertDetails = Alert & {
  evidence: {
    id: string;
    kind: EvidenceKind;
    snippet: string;
    timestamp: string; // ISO string
  }[];
};

export const alertsMock: Alert[] = [
  {
    id: '1',
    title: 'Agent attempted to access production secrets',
    severity: 'critical',
    status: 'open',
    createdAt: '2026-01-18T09:12:34Z',
    actor: {
      agentName: 'deploy-agent-02',
      environment: 'prod',
    },
    summary:
      'The agent attempted to read environment variables matching known secret patterns. Access was denied by policy enforcement.',
    evidenceCount: 3,
  },
  {
    id: '2',
    title: 'Suspicious outbound request to unknown domain',
    severity: 'high',
    status: 'open',
    createdAt: '2026-01-17T14:05:10Z',
    actor: {
      agentName: 'support-agent-01',
      environment: 'staging',
    },
    summary:
      'The agent issued an HTTP request to a previously unseen external domain. This behavior deviates from normal traffic patterns.',
    evidenceCount: 2,
  },
  {
    id: '3',
    title: 'Repeated tool-call failures detected',
    severity: 'medium',
    status: 'acknowledged',
    createdAt: '2026-01-15T20:41:00Z',
    actor: {
      agentName: 'sales-agent-01',
      environment: 'dev',
    },
    summary:
      'The agent retried the same tool call multiple times with near-identical parameters, indicating a possible execution loop.',
    evidenceCount: 4,
  },
  {
    id: '4',
    title: 'Unusual login time observed for agent',
    severity: 'low',
    status: 'open',
    createdAt: '2026-01-14T08:22:45Z',
    actor: {
      agentName: 'marketing-agent-03',
      environment: 'prod',
    },
    summary:
      'The agent authenticated successfully outside its typical operating hours. No additional suspicious activity was detected.',
    evidenceCount: 1,
  },
  {
    id: '5',
    title: 'Multiple failed authentication attempts',
    severity: 'high',
    status: 'open',
    createdAt: '2026-01-13T23:11:09Z',
    actor: {
      agentName: 'auth-agent-01',
      environment: 'prod',
    },
    summary:
      'Several consecutive authentication failures were recorded from the same agent. The attempts exceeded the normal threshold.',
    evidenceCount: 5,
  },
  {
    id: '6',
    title: 'Unexpected file access in staging environment',
    severity: 'medium',
    status: 'acknowledged',
    createdAt: '2026-01-12T11:47:30Z',
    actor: {
      agentName: 'ci-agent-04',
      environment: 'staging',
    },
    summary:
      'The agent attempted to read configuration files not typically accessed during CI workflows.',
    evidenceCount: 2,
  },
  {
    id: '7',
    title: 'Deprecated API endpoint invoked',
    severity: 'low',
    status: 'acknowledged',
    createdAt: '2026-01-11T16:03:55Z',
    actor: {
      agentName: 'frontend-agent-02',
      environment: 'dev',
    },
    summary:
      'The agent invoked an API endpoint marked as deprecated. No functional impact was observed.',
    evidenceCount: 0,
  },
  {
    id: '8',
    title: 'Potential privilege escalation attempt detected',
    severity: 'critical',
    status: 'open',
    createdAt: '2026-01-10T02:19:18Z',
    actor: {
      agentName: 'security-agent-01',
      environment: 'prod',
    },
    summary:
      'The agent attempted to perform actions requiring elevated privileges beyond its assigned role.',
    evidenceCount: 6,
  },
];
