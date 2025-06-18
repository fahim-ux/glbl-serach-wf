import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface PythonViewerProps {
  code: string;
}

const PythonViewer: React.FC<PythonViewerProps> = ({ code }) => {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 shadow-lg text-sm max-w-full overflow-auto">
      <SyntaxHighlighter language="python" style={atomOneDark} wrapLines wrapLongLines>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default PythonViewer;
