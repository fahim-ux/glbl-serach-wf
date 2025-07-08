import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ThinkingSectionProps {
  content: string;
}

export const ThinkingSection: React.FC<ThinkingSectionProps> = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-t-sm overflow-hidden">
      <div 
        className="bg-gray-200 text-gray-800 p-4 font-semibold flex items-center cursor-pointer hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:bg-gray-300"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <span className="font-mono text-gray-800">Reasoning</span>
        <div className="ml-auto flex items-center" title={isExpanded ? 'Collapse' : 'Expand'}>
          {isExpanded ? (
            <ChevronDown size={20} className="text-gray-600" />
          ) : (
            <ChevronRight size={20} className="text-gray-600" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-5 bg-gray-50 border-t border-gray-200 max-h-80 overflow-y-auto custom-scrollbar">
          <div className="prose prose-sm max-w-none prose-gray">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom styling for markdown elements - fixed table and code rendering
                h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-gray-800">{children}</h1>,
                h2: ({ children }) => <h2 className="text-md font-semibold mb-2 text-gray-800">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 text-gray-800">{children}</h3>,
                p: ({ children }) => <p className="text-sm leading-relaxed mb-2 text-gray-700">{children}</p>,
                code: ({ children, className }) => {
                  // Check if it's inline code or block code
                  const isInline = !className;
                  if (isInline) {
                    return <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono text-gray-800 border">{children}</code>;
                  }
                  return <code className="block">{children}</code>;
                },
                pre: ({ children }) => (
                  <pre className="bg-gray-200 p-3 rounded text-xs font-mono overflow-x-auto mb-2 border border-gray-300 custom-scrollbar whitespace-pre">
                    {children}
                  </pre>
                ),
                ul: ({ children }) => <ul className="list-disc list-inside mb-2 text-sm text-gray-700">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 text-sm text-gray-700">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 mb-2 bg-gray-100 py-2">{children}</blockquote>,
                strong: ({ children }) => <strong className="font-semibold text-gray-800">{children}</strong>,
                em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                
                // Enhanced table styling for thinking section
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-3">
                    <table className="min-w-full border-collapse bg-white shadow-sm rounded text-xs">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
                tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
                tr: ({ children }) => <tr className="hover:bg-gray-50 transition-colors">{children}</tr>,
                th: ({ children }) => (
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-800 border-b-2 border-gray-200">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2 text-xs text-gray-700 border-b border-gray-200">
                    {children}
                  </td>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};
