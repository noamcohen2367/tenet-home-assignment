import type { AlertDetails } from '../data/DataContract';
import { alertDetailsMock } from '../data/alertDetailsMock';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getAlertDetails(id: string): Promise<AlertDetails> {
  await delay(250);

  const data = alertDetailsMock[id];
  if (!data) throw new Error('NOT_FOUND');
  return data;
}

export async function acknowledgeAlert(id: string): Promise<AlertDetails> {
  await delay(250);

  const existing = alertDetailsMock[id];
  if (!existing) throw new Error('NOT_FOUND');

  const updated: AlertDetails = { ...existing, status: 'acknowledged' };
  alertDetailsMock[id] = updated; // simulate persistence in-memory

  return updated;
}
