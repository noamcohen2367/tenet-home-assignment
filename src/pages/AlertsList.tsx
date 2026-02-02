import { Table, Input, Radio } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Severity, AlertStatus, Alert } from '../data/DataContract';
import { useEffect, useState, useMemo } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { getAlerts } from '../api/alertsApi';
import { SEVERITY_WEIGHT } from '../utils/severity';
import '../css/pages/AlertsList.css';

function AlertsList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [pageStatus, setPageStatus] = useState<'loading' | 'error' | 'ready'>(
    'loading',
  );

  // Read filters from URL
  const searchText = searchParams.get('search') || '';
  const statusFilter = (searchParams.get('status') || 'all') as
    | AlertStatus
    | 'all';
  const severityFilter: Severity[] = searchParams.get('severity')
    ? (searchParams.get('severity')!.split(',') as Severity[])
    : [];

  // Fetch alerts
  const load = async () => {
    setPageStatus('loading');
    try {
      const data = await getAlerts();
      setAlerts(data);
      setPageStatus('ready');
    } catch {
      setPageStatus('error');
    }
  };

  useEffect(() => {
    void load();
  }, []);

  // Filter + search logic (separated from UI)
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      // Severity filter (multi-select)
      if (
        severityFilter.length > 0 &&
        !severityFilter.includes(alert.severity)
      ) {
        return false;
      }
      // Status filter (single-select)
      if (statusFilter !== 'all' && alert.status !== statusFilter) {
        return false;
      }
      // Search (case-insensitive on title + agentName)
      if (searchText) {
        const query = searchText.trim().toLowerCase();
        const matchesTitle = alert.title.toLowerCase().includes(query);
        const matchesAgent = alert.actor.agentName
          .toLowerCase()
          .includes(query);
        if (!matchesTitle && !matchesAgent) return false;
      }
      return true;
    });
  }, [alerts, severityFilter, statusFilter, searchText]);

  // Helper to update a single URL param
  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'all') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  };

  // Columns
  const columns: ColumnsType<Alert> = [
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      sorter: (a, b) =>
        SEVERITY_WEIGHT[a.severity] - SEVERITY_WEIGHT[b.severity],
      filters: [
        { text: 'critical', value: 'critical' },
        { text: 'high', value: 'high' },
        { text: 'medium', value: 'medium' },
        { text: 'low', value: 'low' },
      ],
      filteredValue: severityFilter.length > 0 ? severityFilter : null,
      onFilter: (value, record) => record.severity === (value as Severity),
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
      defaultSortOrder: 'descend',
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (value: string) => new Date(value).toLocaleString(),
    },
  ];

  // States
  if (pageStatus === 'error') {
    return (
      <div className="alerts-list">
        <p>Something went wrong loading alerts.</p>
        <button onClick={load}>Retry</button>
      </div>
    );
  }

  return (
    <div className="alerts-list">
      <div className="alerts-list__header">
        <button onClick={() => navigate('/')}>
          <IoIosArrowBack /> back
        </button>
        <h1>Alerts</h1>
      </div>

      {/* Search + Status filter bar */}
      <div className="alerts-list__filters">
        <Input.Search
          placeholder="Search by title or agent name..."
          allowClear
          value={searchText}
          onChange={(e) => updateParam('search', e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Radio.Group
          value={statusFilter}
          onChange={(e) => updateParam('status', e.target.value)}
        >
          <Radio.Button value="all">All</Radio.Button>
          <Radio.Button value="open">Open</Radio.Button>
          <Radio.Button value="acknowledged">Acknowledged</Radio.Button>
        </Radio.Group>
      </div>

      <Table
        columns={columns}
        dataSource={filteredAlerts}
        rowKey="id"
        pagination={false}
        loading={pageStatus === 'loading'}
        locale={{ emptyText: 'No alerts match your filters' }}
        onChange={(_pagination, filters) => {
          // Sync severity filter from table to URL
          const sev = (filters.severity as Severity[]) || [];
          updateParam('severity', sev.join(','));
        }}
        onRow={(record) => ({
          onClick: () =>
            navigate(`/alerts/${record.id}?${searchParams.toString()}`),
          style: { cursor: 'pointer' },
        })}
      />
    </div>
  );
}
export default AlertsList;
