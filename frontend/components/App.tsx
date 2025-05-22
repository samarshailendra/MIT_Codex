import React, { useEffect, useState } from 'react';

interface WorkflowsResponse {
  status: string;
  workflows: string[];
}

type FileState = Record<string, File | null>;

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';

const App: React.FC = () => {
  const [graderName, setGraderName] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [workflows, setWorkflows] = useState<string[]>([]);
  const [files, setFiles] = useState<FileState>({
    assignmentFile: null,
    solutionFile: null,
    sampleFile: null,
    rubricsFile: null
  });
  const [output, setOutput] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/workflows/`)
      .then((res) => res.json())
      .then((data: WorkflowsResponse) => {
        if (data.status === 'success') {
          setWorkflows(data.workflows);
          if (data.workflows.length > 0) {
            setWorkflow(data.workflows[0]);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to load workflows', err);
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles({ ...files, [e.target.name]: e.target.files?.[0] ?? null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('graderName', graderName);
    formData.append('workflow', workflow);
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    try {
      const res = await fetch(`${API_BASE}/api/grade/`, {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      setOutput(JSON.stringify(result, null, 2));
    } catch (err: any) {
      setOutput('Request failed: ' + err.message);
    }
  };

  return (
    <div className="container">
      <h1>Upload Files for Grading</h1>
      <form className="grading-form" onSubmit={handleSubmit}>
        <label>Grader Name</label>
        <input
          type="text"
          value={graderName}
          onChange={(e) => setGraderName(e.target.value)}
          required
        />

        <label>Workflow</label>
        <select value={workflow} onChange={(e) => setWorkflow(e.target.value)} required>
          {workflows.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>

        <label>Assignment File</label>
        <input type="file" name="assignmentFile" onChange={handleFileChange} required />

        <label>Solution File</label>
        <input type="file" name="solutionFile" onChange={handleFileChange} required />

        <label>Sample File</label>
        <input type="file" name="sampleFile" onChange={handleFileChange} required />

        <label>Rubrics File</label>
        <input type="file" name="rubricsFile" onChange={handleFileChange} required />

        <button type="submit">Submit for Grading</button>
      </form>

      <h3>Response</h3>
      <pre className="output">{output}</pre>
    </div>
  );
};

export default App;
