import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  BackgroundVariant,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';

interface FlowChartProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  className?: string;
  showMiniMap?: boolean;
  showControls?: boolean;
  showBackground?: boolean;
  backgroundVariant?: BackgroundVariant;
  nodeTypes?: Record<string, any>;
  onNodesChange?: (nodes: Node[]) => void;
  onEdgesChange?: (edges: Edge[]) => void;
}

const defaultNodes: Node[] = [
  { 
    id: 'n1', 
    position: { x: 100, y: 100 }, 
    data: { label: 'Start Node' },
    type: 'default'
  },
  { 
    id: 'n2', 
    position: { x: 100, y: 250 }, 
    data: { label: 'Process Node' },
    type: 'default'
  },
  { 
    id: 'n3', 
    position: { x: 300, y: 250 }, 
    data: { label: 'End Node' },
    type: 'default'
  },
];

const defaultEdges: Edge[] = [
  { id: 'e1-2', source: 'n1', target: 'n2', animated: true },
  { id: 'e2-3', source: 'n2', target: 'n3', animated: true },
];

export function FlowChart({
  initialNodes = defaultNodes,
  initialEdges = defaultEdges,
  className = '',
  showMiniMap = true,
  showControls = true,
  showBackground = true,
  backgroundVariant = BackgroundVariant.Dots,
  nodeTypes,
  onNodesChange,
  onEdgesChange
}: FlowChartProps) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      setNodes(updatedNodes);
      onNodesChange?.(updatedNodes);
    },
    [nodes, onNodesChange],
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      setEdges(updatedEdges);
      onEdgesChange?.(updatedEdges);
    },
    [edges, onEdgesChange],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const updatedEdges = addEdge(params, edges);
      setEdges(updatedEdges);
      onEdgesChange?.(updatedEdges);
    },
    [edges, onEdgesChange],
  );

  return (
    <div className={`w-full h-full ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        {showControls && <Controls />}
        {showMiniMap && (
          <MiniMap 
            nodeColor="#374151"
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
        )}
        {showBackground && (
          <Background 
            variant={backgroundVariant} 
            gap={12} 
            size={1}
            color="#e5e7eb"
          />
        )}
      </ReactFlow>
    </div>
  );
}

export default FlowChart;
