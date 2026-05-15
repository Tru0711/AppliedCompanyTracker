import JobCard from './JobCard'

function JobList({ applications, onDelete, onStatusChange }) {
  if (applications.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        No applications added yet
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {applications.map((application) => (
        <JobCard
          key={application.id}
          application={application}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}

export default JobList
