import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { alertsMock } from '../data/alerts.mock';

const columns = [
  {
    title: 'Severity',
    dataIndex: 'severity',
    key: 'severity',
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
    dataIndex: 'agent',
    key: 'agent',
  },
  {
    title: 'Environment',
    dataIndex: 'environment',
    key: 'environment',
  },
  {
    title: 'Created Time',
    dataIndex: 'createdTime',
    key: 'createdTime',
  },
];

function AlertsList() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Alerts</h1>
      <button onClick={() => navigate('/')}>{'<- Back'}</button>
      <Table
        columns={columns}
        dataSource={alertsMock}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/alerts/${record.key}`);
            },
          };
        }}
      />
    </div>
  );
}

export default AlertsList;
