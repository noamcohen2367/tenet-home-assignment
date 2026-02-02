import { useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Typography } from 'antd';
import type { AlertDetails, Severity } from '../data/DataContract';

const { Paragraph, Text } = Typography;

type Props = {
  alert: AlertDetails;
};

type Environment = 'dev' | 'staging' | 'prod';

type FormValues = {
  ruleName: string;
  environment: Environment;
  agentName: string;
  severityAtMost: Severity;
  titleContains: string;
  expiresInDays: number;
};

export function SuppressRuleForm({ alert }: Props) {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  return (
    <div>
      <Typography.Title level={4}>Suppress Future Alerts</Typography.Title>

      <Form<FormValues>
        layout="vertical"
        validateTrigger={['onChange', 'onBlur']}
        initialValues={{
          ruleName: `Suppress ${alert.actor.agentName}`,
          environment: alert.actor.environment,
          agentName: alert.actor.agentName,
          severityAtMost: alert.severity,
          titleContains: '',
          expiresInDays: 30,
        }}
        onFinish={(values) => setSubmitted(values)}
      >
        <Form.Item
          label="Rule name"
          name="ruleName"
          rules={[
            { required: true, message: 'Rule name is required' },
            { min: 3, max: 40, message: 'Must be 3–40 characters' },
          ]}
        >
          <Input placeholder="e.g. Ignore deploy agent secrets" />
        </Form.Item>

        <Form.Item label="Agent name" name="agentName">
          <Input placeholder="e.g. deploy-agent-02 (leave empty for any)" />
        </Form.Item>

        <Form.Item label="Title contains" name="titleContains">
          <Input placeholder="e.g. access production secrets (optional)" />
        </Form.Item>

        <Form.Item
          label="Environment"
          name="environment"
          rules={[{ required: true, message: 'Environment is required' }]}
        >
          <Select
            options={[
              { value: 'dev', label: 'dev' },
              { value: 'staging', label: 'staging' },
              { value: 'prod', label: 'prod' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Suppress alerts up to severity"
          name="severityAtMost"
          rules={[{ required: true, message: 'Select a severity' }]}
        >
          <Select
            options={[
              { value: 'low', label: 'low' },
              { value: 'medium', label: 'medium' },
              { value: 'high', label: 'high' },
              { value: 'critical', label: 'critical' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Expires in days"
          name="expiresInDays"
          rules={[
            { required: true, message: 'Expires is required' },
            {
              validator: (_, value) =>
                typeof value === 'number' && value >= 1 && value <= 90
                  ? Promise.resolve()
                  : Promise.reject(new Error('Must be between 1–90')),
            },
          ]}
        >
          <InputNumber min={1} max={90} style={{ width: '100%' }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create Rule
        </Button>
      </Form>

      {submitted && (
        <>
          <Paragraph style={{ marginTop: 12 }}>
            This rule will suppress <strong>{submitted.severityAtMost}</strong>{' '}
            and lower severity alerts
            {submitted.agentName
              ? ` from agent ${submitted.agentName}`
              : ''} in <strong>{submitted.environment}</strong> for{' '}
            <strong>{submitted.expiresInDays}</strong> days.
            {submitted.titleContains
              ? ` Only alerts with "${submitted.titleContains}" in the title.`
              : ''}
          </Paragraph>

          <Text strong>JSON Preview</Text>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
