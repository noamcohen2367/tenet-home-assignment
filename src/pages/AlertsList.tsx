import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { alertDetailsMock } from '../data/alertDetailsMock';
import type { Severity, AlertStatus, AlertDetails } from '../data/DataContract';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import '../css/pages/AlertsList.css';

const columns: ColumnsType<AlertDetails> = [
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
    onFilter: (value, record) => record.severity === (value as Severity),
    sorter: (a, b) => a.severity.localeCompare(b.severity),
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
    onFilter: (value, record) =>
      value === 'all' ? true : record.status === (value as AlertStatus),
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
    sorter: (a, b) =>
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
          emptyText: 'No alerts found',
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
