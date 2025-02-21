import type { FormData } from '@/types/form'

export async function createTask(formData: FormData, token: string) {
  try {
    const params = {
      token,
      title: formData.title,
      description: formData.description,
      tags: formData.tags,
      budget_from: Number(formData.budget_from),
      budget_to: Number(formData.budget_to),
      deadline: Number(formData.deadline_days),
      reminds: Number(formData.reminds),
      all_auto_responses: formData.all_auto_responses,
      ...(formData.all_auto_responses ? {} : {
        rules: JSON.stringify({
          budget_from: Number(formData.rules_budget_from),
          budget_to: Number(formData.rules_budget_to),
          deadline_days: Number(formData.rules_deadline_days),
          qty_freelancers: Number(formData.rules_qty_freelancers)
        })
      })
    }

    const queryParams = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    )

    const response = await fetch(
      `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?${queryParams}`,
      { method: 'GET' }
    )

    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Ошибка при создании задачи')
    }

    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    }
  }
} 