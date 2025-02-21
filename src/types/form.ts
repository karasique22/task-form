export interface FormData {
  title: string
  description: string
  tags: string
  budget_from: string
  budget_to: string
  deadline_days: string
  reminds: string
  all_auto_responses: boolean
  rules_budget_from: string
  rules_budget_to: string
  rules_deadline_days: string
  rules_qty_freelancers: string
}

export interface FormErrors {
  title: string
  budget_from: string
  budget_to: string
  deadline_days: string
  reminds: string
  rules_budget_from: string
  rules_budget_to: string
  rules_deadline_days: string
  rules_qty_freelancers: string
}

export interface FieldProps {
  formData: FormData
  setFormData: (data: FormData) => void
  errors: FormErrors
} 