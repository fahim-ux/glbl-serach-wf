import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';

interface SwiftNodeData {
  label: string;
  name: string;
  account?: string;
  bic?: string;
  swift?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  nodeType?: 'input' | 'output' | 'default';
}

export function SwiftBankNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as SwiftNodeData;
  
  return (
    <div className={`px-6 py-4 shadow-xl rounded-xl border-3 min-w-[180px] transition-all duration-300 hover:scale-105 ${
      selected ? 'ring-4 ring-blue-400 ring-opacity-60' : ''
    }`} style={{
      backgroundColor: nodeData.backgroundColor || '#3b82f6',
      borderColor: nodeData.borderColor || '#1d4ed8',
      color: 'white',
      borderWidth: '3px',
      borderStyle: 'solid'
    }}>
      <Handle type="target" position={Position.Left} className="w-4 h-4 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />
      
      <div className="text-center">
        <div className="text-xl font-bold mb-2">{nodeData.label}</div>
        <div className="text-sm font-medium bg-white/20 rounded-lg px-3 py-1">
          {nodeData.name}
        </div>
      </div>
      
      <Handle type="source" position={Position.Right} className="w-4 h-4 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />
      <Handle type="source" position={Position.Bottom} className="w-4 h-4 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />
    </div>
  );
}

export function SwiftPartyNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as SwiftNodeData;
  
  return (
    <div className={`px-6 py-4 shadow-xl rounded-xl border-3 min-w-[180px] transition-all duration-300 hover:scale-105 ${
      selected ? 'ring-4 ring-blue-400 ring-opacity-60' : ''
    }`} style={{
      backgroundColor: nodeData.backgroundColor || '#10b981',
      borderColor: nodeData.borderColor || '#065f46',
      color: 'white',
      borderWidth: '3px',
      borderStyle: 'solid'
    }}>
      {nodeData.nodeType !== 'input' && <Handle type="target" position={Position.Left} className="w-4 h-4 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />}
      
      <div className="text-center">
        <div className="text-xl font-bold mb-2">{nodeData.label}</div>
        <div className="text-sm font-medium bg-white/20 rounded-lg px-3 py-1">
          {nodeData.name}
        </div>
      </div>
      
      {nodeData.nodeType !== 'output' && <Handle type="source" position={Position.Right} className="w-4 h-4 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />}
      <Handle type="source" position={Position.Bottom} className="w-4 h-4 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />
    </div>
  );
}

export function DetailNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as SwiftNodeData;
  
  return (
    <div className={`px-4 py-3 shadow-lg rounded-lg border-2 min-w-[160px] transition-all duration-200 ${
      selected ? 'ring-2 ring-gray-400' : ''
    }`} style={{
      backgroundColor: nodeData.backgroundColor || '#f8fafc',
      borderColor: nodeData.borderColor || '#e2e8f0',
      color: nodeData.textColor || '#374151',
      borderWidth: '2px',
      borderStyle: 'solid'
    }}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" style={{ backgroundColor: nodeData.borderColor }} />
      
      <div className="text-center">
        <div className="text-sm font-semibold mb-2">{nodeData.label}</div>
        <div className="space-y-1 text-xs">
          {nodeData.account && (
            <div className="bg-white/60 rounded px-2 py-1">
              <span className="font-medium">Account:</span> {nodeData.account}
            </div>
          )}
          {nodeData.bic && (
            <div className="bg-white/60 rounded px-2 py-1">
              <span className="font-medium">BIC:</span> {nodeData.bic}
            </div>
          )}
          {nodeData.swift && (
            <div className="bg-white/60 rounded px-2 py-1">
              <span className="font-medium">SWIFT:</span> {nodeData.swift}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SwiftRoutingHub({ data, selected }: NodeProps) {
  const nodeData = data as unknown as SwiftNodeData;
  
  return (
    <div className={`px-3 py-2 shadow-lg rounded-full border-3 min-w-[100px] transition-all duration-300 hover:scale-110 ${
      selected ? 'ring-4 ring-yellow-400 ring-opacity-60' : ''
    }`} style={{
      backgroundColor: nodeData.backgroundColor || '#fbbf24',
      borderColor: nodeData.borderColor || '#d97706',
      color: 'white',
      borderWidth: '3px',
      borderStyle: 'solid'
    }}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />
      <Handle type="target" position={Position.Right} className="w-3 h-3 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />
      <Handle type="target" position={Position.Bottom} className="w-3 h-3 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />
      
      <div className="text-center">
        <div className="text-sm font-bold">{nodeData.label}</div>
        <div className="text-xs font-medium opacity-90">{nodeData.name}</div>
      </div>
      
      <Handle type="source" position={Position.Top} className="w-3 h-3 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />
      <Handle type="source" position={Position.Left} className="w-3 h-3 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-white !border-2" style={{ borderColor: nodeData.borderColor }} />
    </div>
  );
}
