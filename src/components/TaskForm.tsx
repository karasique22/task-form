'use client'

import { useState, useEffect } from 'react'
import { Form, Input,  Switch, Button, message } from 'antd'
import { createTask } from '@/app/actions'
import { BudgetFields } from './form/BudgetFields'
import { DeadlineFields } from './form/DeadlineFields'
import { RulesFields } from './form/RulesFields'
import type { FormData } from '@/types/form'

const { TextArea } = Input

export function TaskForm() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      form.setFieldValue('token', savedToken)
    }
  }, [form])

  const handleSubmit = async (values: FormData) => {
    setLoading(true)
    
    try {
      localStorage.setItem('token', values.token)
      
      const result = await createTask(values)
      
      if (result.success) {
        messageApi.success('Задача успешно опубликована')
        form.resetFields(['title', 'description', 'tags', 'budget_from', 'budget_to', 'deadline_days', 'reminds', 'all_auto_responses', 'rules_budget_from', 'rules_budget_to', 'rules_deadline_days', 'rules_qty_freelancers'])
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      messageApi.error((err as Error).message || 'Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {contextHolder}
      <h1 className="text-2xl font-bold mb-6">Создание новой задачи</h1>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          all_auto_responses: false
        }}
      >
        <Form.Item
          label="API Токен"
          name="token"
          rules={[{ required: true, message: 'Введите ваш API токен' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Название задачи"
          name="title"
          rules={[{ required: true, message: 'Введите название задачи' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: 'Введите описание' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Теги (через запятую)"
          name="tags"
          rules={[{ required: true, message: 'Введите теги' }]}
        >
          <Input />
        </Form.Item>

        <BudgetFields />
        <DeadlineFields />
        
        <Form.Item
          name="all_auto_responses"
          valuePropName="checked"
        >
          <Switch 
            checkedChildren="Автоматические отклики включены" 
            unCheckedChildren="Автоматические отклики выключены"
          />
        </Form.Item>

        <Form.Item noStyle dependencies={['all_auto_responses']}>
          {({ getFieldValue }) => 
            !getFieldValue('all_auto_responses') && <RulesFields />
          }
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            block
          >
            Создать задачу
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
} 