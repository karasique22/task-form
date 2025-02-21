import type { FieldProps } from '@/types/form'

export function AutoResponseToggle({ formData, setFormData }: FieldProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.all_auto_responses}
          onChange={(e) => {
            setFormData({
              ...formData, 
              all_auto_responses: e.target.checked,
              ...(e.target.checked && {
                rules_budget_from: '',
                rules_budget_to: '',
                rules_deadline_days: '',
                rules_qty_freelancers: ''
              })
            })
          }}
          className="w-4 h-4"
        />
        <label>Автоматически принимать все отклики</label>
      </div>

      {formData.all_auto_responses && (
        <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
          При автоматических откликах правила не требуются
        </div>
      )}
    </>
  )
} 