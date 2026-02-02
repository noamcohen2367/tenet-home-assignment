import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { alertDetailsMock } from '../data/alertDetailsMock';
import type { Severity, AlertStatus } from '../data/DataContract';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import '../css/pages/AlertsList.css';
const columns = [
  {
    title: 'Severity',
    dataIndex: 'severity',
    key: 'severity',
    filters: [
      { text: 'critical', value: 'critical' },
      { text: 'high', value: 'high' },
      { text: 'medium', value: 'medium' },
      { text: 'low', value: 'low' },
    ],
    onFilter: (
      value: Severity,
      record: {
        id: string;
        severity: Severity;
      },
    ) => record.severity === value,
    sorter: (a: { severity: string }, b: { severity: string }) =>
      a.severity.localeCompare(b.severity),
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: [
      { text: 'open', value: 'open' },
      { text: 'acknowledged', value: 'acknowledged' },
      { text: 'all', value: 'all' },
    ],
    onFilter: (value: AlertStatus | 'all', record: { status: AlertStatus }) =>
      value === 'all' ? true : record.status === value,
  },
  {
    title: 'Agent',
    dataIndex: ['actor', 'agentName'],
    key: 'agentName',
  },
  {
    title: 'Environment',
    dataIndex: ['actor', 'environment'],
    key: 'environment',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a: { createdAt: string }, b: { createdAt: string }) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  },
];

function AlertsList() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();
  return (
    <div className="alerts-list">
      <div className="alerts-list__header">
        <button onClick={() => navigate('/')}>
          <IoIosArrowBack />
          {'back'}
        </button>
        <h1>Alerts</h1>
      </div>
      <Table
        columns={columns}
        dataSource={Object.values(alertDetailsMock)}
        pagination={false}
        loading={loading}
        locale={{
          emptyText: 'No alerts match your filters',
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/alerts/${record.id}`);
            },
          };
        }}
      />
    </div>
  );
}

export default AlertsList;
