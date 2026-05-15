const STATUS_COLORS = {
  Applied: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Test: 'bg-orange-100 text-orange-800 border-orange-200',
  Interview: 'bg-blue-100 text-blue-800 border-blue-200',
  Rejected: 'bg-red-100 text-red-800 border-red-200',
  Selected: 'bg-green-100 text-green-800 border-green-200'
}

const STATUS_OPTIONS = ['Applied', 'Test', 'Interview', 'Rejected', 'Selected']

function JobCard({ application, onDelete, onStatusChange }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{application.companyName}</h3>
          <p className="text-sm text-slate-600">{application.role}</p>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            STATUS_COLORS[application.status] || 'bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          {application.status}
        </span>
      </div>

      <p className="mb-4 text-sm text-slate-500">Applied on: {application.applyDate}</p>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={application.status}
          onChange={(event) => onStatusChange(application.id, event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          onClick={() => onDelete(application.id)}
          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default JobCard
