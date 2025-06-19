import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { FiSend } from 'react-icons/fi';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';

const highlightCode = (code: string, lang: 'json' | 'python') => {
  return Prism.highlight(code, Prism.languages[lang], lang);
};

const EditableCodeEditors: React.FC = () => {
  const [jsonCode, setJsonCode] = useState(`{
  "name": "Agent",
  "task": "Reasoning"
}`);
  const [pythonCode, setPythonCode] = useState(`def run():
    print("Hello from LLM")`);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Validate JSON on every change
  const handleJsonChange = (code: string) => {
    setJsonCode(code);
    try {
      JSON.parse(code);
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message);
    }
  };

  const handleSend = async () => {
    try {
      setIsSending(true);
      const parsedJson = JSON.parse(jsonCode);

      console.log('✅ JSON:', parsedJson);
      console.log('🐍 Python:', pythonCode);

      // 🔁 Your API logic here
      // await fetch('/api/execute', { method: 'POST', body: JSON.stringify({ json: parsedJson, py: pythonCode }) });

      alert('🚀 Code sent successfully!');
    } catch (err) {
      console.error('❌ Send failed:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex w-full h-[500px] gap-4">
      {/* JSON Editor */}
      <div className="w-1/2 h-full flex flex-col bg-zinc-900 rounded-xl p-4 shadow-md relative">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-white font-semibold">JSON Input</h2>
          <button
            onClick={handleSend}
            className={`text-white transition ${jsonError ? 'opacity-30 cursor-not-allowed' : 'hover:text-green-400'}`}
            disabled={!!jsonError || isSending}
            title="Send"
          >
            <FiSend className="text-xl" />
          </button>
        </div>
        <div className="flex-1 overflow-auto text-sm rounded">
          <Editor
            value={jsonCode}
            onValueChange={handleJsonChange}
            highlight={(code) => highlightCode(code, 'json')}
            padding={12}
            className="min-h-full font-mono outline-none text-white"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
        {jsonError && (
          <p className="text-red-500 text-sm mt-2 break-words">{`⚠️ Invalid JSON: ${jsonError}`}</p>
        )}
      </div>

      {/* Python Editor */}
      <div className="w-1/2 h-full flex flex-col bg-zinc-900 rounded-xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-white font-semibold">Python Code</h2>
        </div>
        <div className="flex-1 overflow-auto text-sm rounded">
          <Editor
            value={pythonCode}
            onValueChange={setPythonCode}
            highlight={(code) => highlightCode(code, 'python')}
            padding={12}
            className="min-h-full font-mono outline-none text-white"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditableCodeEditors;
