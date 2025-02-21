import type { FormData, FormErrors } from '@/types/form'

export const validateForm = (formData: FormData): [boolean, FormErrors] => {
  const errors: FormErrors = {
    title: '',
    budget_from: '',
    budget_to: '',
    deadline_days: '',
    reminds: '',
    rules_budget_from: '',
    rules_budget_to: '',
    rules_deadline_days: '',
    rules_qty_freelancers: ''
  }

  let isValid = true

  if (!formData.title.trim()) {
    errors.title = 'Название задачи обязательно'
    isValid = false
  }

  const fieldsToCheck = [
    { name: 'budget_from', value: formData.budget_from },
    { name: 'budget_to', value: formData.budget_to },
    { name: 'deadline_days', value: formData.deadline_days },
    { name: 'reminds', value: formData.reminds },
    { name: 'rules_budget_from', value: formData.rules_budget_from },
    { name: 'rules_budget_to', value: formData.rules_budget_to },
    { name: 'rules_deadline_days', value: formData.rules_deadline_days },
    { name: 'rules_qty_freelancers', value: formData.rules_qty_freelancers }
  ]

  fieldsToCheck.forEach(({ name, value }) => {
    if (Number(value) < 0) {
      errors[name as keyof FormErrors] = 'Значение не может быть отрицательным'
      isValid = false
    }
  })

  if (Number(formData.budget_from) > Number(formData.budget_to)) {
    errors.budget_from = 'Бюджет "от" не может быть больше бюджета "до"'
    errors.budget_to = 'Бюджет "до" не может быть меньше бюджета "от"'
    isValid = false
  }

  if (Number(formData.rules_budget_from) > Number(formData.rules_budget_to)) {
    errors.rules_budget_from = 'Правила: бюджет "от" не может быть больше бюджета "до"'
    errors.rules_budget_to = 'Правила: бюджет "до" не может быть меньше бюджета "от"'
    isValid = false
  }

  return [isValid, errors]
} 