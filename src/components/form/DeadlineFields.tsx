import { Form, InputNumber } from 'antd'

export function DeadlineFields() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Form.Item
        label="Дедлайн (дни)"
        name="deadline_days"
        rules={[
          { required: true, message: 'Укажите срок выполнения' },
          { type: 'number', min: 1, message: 'Срок должен быть не менее 1 дня' }
        ]}
      >
        <InputNumber className="w-full" />
      </Form.Item>

      <Form.Item
        label="Напоминания"
        name="reminds"
        rules={[
          { required: true, message: 'Укажите количество напоминаний' },
          { type: 'number', min: 0, message: 'Количество не может быть отрицательным' }
        ]}
      >
        <InputNumber className="w-full" />
      </Form.Item>
    </div>
  )
} 