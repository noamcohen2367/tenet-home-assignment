type Severity = 'low' | 'medium' | 'high' | 'critical';

type AlertStatus = 'open' | 'acknowledged';

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
