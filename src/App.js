import React, { useState } from 'react';
import './App.css';
import useFetchJobs from './useFetchJobs';
import { Container, Spinner } from 'react-bootstrap'
import Job from './Job'
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm'


function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page)

  function handleParamChange(e) {
    const param = e.target.name 
    const value = e.target.value 
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value}
    })
  }

  return (
    <div>
      <Container className="my-4">
        <h1 className="mb-4">GitHub Jobs</h1>
        <SearchForm params={params} onParamChange={handleParamChange}></SearchForm>
        <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
        {loading && 
          <Spinner animation="border" role="status" variant="primary" className="mt-3">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        {error && <h1>Error, try refreshing.</h1>}
        {jobs.map(job => {
          return <Job key={job.id} job={job}></Job>
        })}
        {!loading && 
          <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
        }
      </Container>
    </div>
  );
}

export default App;
