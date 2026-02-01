export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type AlertStatus = 'open' | 'acknowledged';

export type AlertRow = {
  key: string;
  severity: Severity;
  title: string;
  status: AlertStatus;
  agent: string;
  environment: 'dev' | 'staging' | 'prod';
  createdTime: string;
};

export const alertsMock: AlertRow[] = [
  {
    key: '1',
    severity: 'critical',
    title: 'Agent attempted to access production secrets',
    status: 'open',
    agent: 'deploy-agent-02',
    environment: 'prod',
    createdTime: '2026-01-18 09:12',
  },
  {
    key: '2',
    severity: 'high',
    title: 'Suspicious outbound request to unknown domain',
    status: 'open',
    agent: 'support-agent-01',
    environment: 'staging',
    createdTime: '2026-01-17 14:05',
  },
  {
    key: '3',
    severity: 'medium',
    title: 'Repeated tool-call failures detected',
    status: 'acknowledged',
    agent: 'sales-agent-01',
    environment: 'dev',
    createdTime: '2026-01-15 20:41',
  },
  {
    key: '4',
    severity: 'low',
    title: 'Unusual login time for agent',
    status: 'open',
    agent: 'marketing-agent-03',
    environment: 'prod',
    createdTime: '2026-01-14 08:22',
  },
  {
    key: '5',
    severity: 'high',
    title: 'Multiple failed authentication attempts',
    status: 'open',
    agent: 'auth-agent-01',
    environment: 'prod',
    createdTime: '2026-01-13 23:11',
  },
  {
    key: '6',
    severity: 'medium',
    title: 'Unexpected file read in staging environment',
    status: 'acknowledged',
    agent: 'ci-agent-04',
    environment: 'staging',
    createdTime: '2026-01-12 11:47',
  },
  {
    key: '7',
    severity: 'low',
    title: 'Deprecated API endpoint used',
    status: 'acknowledged',
    agent: 'frontend-agent-02',
    environment: 'dev',
    createdTime: '2026-01-11 16:03',
  },
  {
    key: '8',
    severity: 'critical',
    title: 'Privilege escalation attempt detected',
    status: 'open',
    agent: 'security-agent-01',
    environment: 'prod',
    createdTime: '2026-01-10 02:19',
  },
];
