import { Form, InputNumber } from 'antd'

export function BudgetFields() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Form.Item
        label="Бюджет от"
        name="budget_from"
        rules={[
          { required: true, message: 'Введите минимальный бюджет' },
          { 
            type: 'number', 
            min: 0,
            message: 'Бюджет не может быть отрицательным'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const toValue = getFieldValue('budget_to');
              if (!value || !toValue || Number(value) <= Number(toValue)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Минимальный бюджет должен быть меньше максимального'));
            },
          })
        ]}
      >
        <InputNumber className="w-full" />
      </Form.Item>
      
      <Form.Item
        label="Бюджет до"
        name="budget_to"
        rules={[
          { required: true, message: 'Введите максимальный бюджет' },
          { 
            type: 'number', 
            min: 0,
            message: 'Бюджет не может быть отрицательным'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const fromValue = getFieldValue('budget_from');
              if (!value || !fromValue || Number(value) >= Number(fromValue)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Максимальный бюджет должен быть больше минимального'));
            },
          })
        ]}
      >
        <InputNumber className="w-full" />
      </Form.Item>
    </div>
  )
} 