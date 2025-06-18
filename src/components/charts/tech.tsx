import JsonViewer from './components/JsonViewer';
import PythonViewer from './components/PythonViewer';

const dummyJson = {
  name: "Agent",
  role: "Query Resolver",
  active: true,
  tasks: ["reason", "fetch", "transform"],
};

const dummyPython = `
def fetch_query(query):
    response = db.search(query)
    return transform(response)

def transform(res):
    return {"result": res, "status": "success"}
`;

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">
      <h1 className="text-xl font-semibold">🧠 JSON Viewer</h1>
      <JsonViewer data={dummyJson} />

      <h1 className="text-xl font-semibold">🐍 Python Viewer</h1>
      <PythonViewer code={dummyPython} />
    </div>
  );
};

export default App;
