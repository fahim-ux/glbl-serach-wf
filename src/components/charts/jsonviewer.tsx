import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface JsonViewerProps {
  data: object;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 shadow-lg text-sm max-w-full overflow-auto">
      <SyntaxHighlighter language="json" style={atomOneDark} wrapLines wrapLongLines>
        {JSON.stringify(data, null, 2)}
      </SyntaxHighlighter>
    </div>
  );
};

export default JsonViewer;
