import { Form, InputNumber } from 'antd'

export function RulesFields() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          label="Правила - Бюджет от"
          name="rules_budget_from"
          rules={[
            { required: true, message: 'Введите минимальный бюджет' },
            { 
              type: 'number', 
              min: 0,
              message: 'Бюджет не может быть отрицательным'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const toValue = getFieldValue('rules_budget_to');
                if (!value || !toValue || Number(value) <= Number(toValue)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Правила: бюджет "от" должен быть меньше "до"'));
              },
            })
          ]}
        >
          <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item
          label="Правила - Бюджет до"
          name="rules_budget_to"
          rules={[
            { required: true, message: 'Введите максимальный бюджет' },
            { 
              type: 'number', 
              min: 0,
              message: 'Бюджет не может быть отрицательным'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const fromValue = getFieldValue('rules_budget_from');
                if (!value || !fromValue || Number(value) >= Number(fromValue)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Правила: бюджет "до" должен быть больше "от"'));
              },
            })
          ]}
        >
          <InputNumber className="w-full" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          label="Правила - Дедлайн (дни)"
          name="rules_deadline_days"
          rules={[
            { required: true, message: 'Укажите срок выполнения' },
            { type: 'number', min: 1, message: 'Срок должен быть не менее 1 дня' }
          ]}
        >
          <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item
          label="Правила - Количество фрилансеров"
          name="rules_qty_freelancers"
          rules={[
            { required: true, message: 'Укажите количество фрилансеров' },
            { type: 'number', min: 1, message: 'Должен быть хотя бы 1 фрилансер' }
          ]}
        >
          <InputNumber className="w-full" />
        </Form.Item>
      </div>
    </>
  )
} 