import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
export default function JobList() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
       .from('jobs')
       .select('*');
      if (data) {
        setJobs(data);
      }
    };
    fetchJobs();
  }, []);
  return (
    <div>
      <h1>Daftar Job</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>{job.name}</li>
        ))}
      </ul>
    </div>
  );
}