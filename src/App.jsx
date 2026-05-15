import { useEffect, useMemo, useState } from 'react'
import JobForm from './components/JobForm'
import JobList from './components/JobList'

const STORAGE_KEY = 'jobApplications'

function App() {
  const [applications, setApplications] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const savedApplications = localStorage.getItem(STORAGE_KEY)

    if (savedApplications) {
      try {
        setApplications(JSON.parse(savedApplications))
      } catch (error) {
        console.error('Failed to parse saved applications:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  }, [applications])

  const addApplication = (application) => {
    setApplications((prev) => [application, ...prev])
  }

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((item) => item.id !== id))
  }

  const updateApplicationStatus = (id, nextStatus) => {
    setApplications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: nextStatus
            }
          : item
      )
    )
  }

  const filteredApplications = useMemo(() => {
    return applications.filter((item) =>
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [applications, searchTerm])

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <section className="mx-auto w-full max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Job Application Tracker</h1>
          <p className="text-sm text-slate-600">Track your job applications in one place.</p>
          <p className="text-sm font-medium text-slate-700">
            Total Applications: {applications.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <JobForm onAddApplication={addApplication} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by company name"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
          />
        </div>

        <JobList
          applications={filteredApplications}
          onDelete={deleteApplication}
          onStatusChange={updateApplicationStatus}
        />
      </section>
    </main>
  )
}

export default App
