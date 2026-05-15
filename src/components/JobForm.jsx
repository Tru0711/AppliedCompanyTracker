import { useState } from 'react'

const STATUS_OPTIONS = ['Applied', 'Test', 'Interview', 'Rejected', 'Selected']

function JobForm({ onAddApplication }) {
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    applyDate: '',
    status: 'Applied'
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.companyName.trim() || !formData.role.trim() || !formData.applyDate) {
      return
    }

    onAddApplication({
      id: Date.now().toString(),
      companyName: formData.companyName.trim(),
      role: formData.role.trim(),
      applyDate: formData.applyDate,
      status: formData.status
    })

    setFormData({
      companyName: '',
      role: '',
      applyDate: '',
      status: 'Applied'
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <input
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        placeholder="Company Name"
        className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
        required
      />

      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Job Role"
        className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
        required
      />

      <input
        type="date"
        name="applyDate"
        value={formData.applyDate}
        onChange={handleChange}
        className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
      >
        Add Application
      </button>
    </form>
  )
}

export default JobForm
