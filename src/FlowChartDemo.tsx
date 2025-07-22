import { useState } from 'react';
import { FlowChart } from './FlowChart';
import {SwiftBankNode, SwiftPartyNode, DetailNode, SwiftRoutingHub } from './SwiftNodes';
import { BackgroundVariant, type Node, type Edge } from '@xyflow/react';

// Register custom node types
const nodeTypes = {
  swiftBank: SwiftBankNode,
  swiftParty: SwiftPartyNode,
  detailNode: DetailNode,
  routingHub: SwiftRoutingHub,
};

const swiftNodes: Node[] = [
  // Main Flow Nodes
  {
    id: 'originator',
    position: { x: 50, y: 300 },
    type: 'swiftParty',
    data: {
      label: '👤 Originating Party',
      name: 'John Doe',
      backgroundColor: '#10b981',
      borderColor: '#065f46',
      nodeType: 'input'
    }
  },
  {
    id: 'senderBank',
    position: { x: 250, y: 300 },
    type: 'swiftBank',
    data: {
      label: '🏦 Sender Bank',
      name: 'Bank A',
      backgroundColor: '#3b82f6',
      borderColor: '#1d4ed8'
    }
  },
  {
    id: 'senderCorr',
    position: { x: 450, y: 150 },
    type: 'swiftBank',
    data: {
      label: '🔁 Sender Correspondent',
      name: 'Bank B',
      backgroundColor: '#8b5cf6',
      borderColor: '#6d28d9'
    }
  },
  {
    id: 'receiverCorr',
    position: { x: 750, y: 150 },
    type: 'swiftBank',
    data: {
      label: '🔁 Receiver Correspondent',
      name: 'Bank C',
      backgroundColor: '#f59e0b',
      borderColor: '#d97706'
    }
  },
  {
    id: 'receiverBank',
    position: { x: 950, y: 300 },
    type: 'swiftBank',
    data: {
      label: '🏦 Receiver Bank',
      name: 'Bank D',
      backgroundColor: '#6366f1',
      borderColor: '#4f46e5'
    }
  },
  {
    id: 'beneficiary',
    position: { x: 1150, y: 300 },
    type: 'swiftParty',
    data: {
      label: '🎯 Beneficiary Party',
      name: 'Alice Smith',
      backgroundColor: '#6b7280',
      borderColor: '#374151',
      nodeType: 'output'
    }
  },
  
  // Payment Party Details (Top Center)
  {
    id: 'paymentDetails',
    position: { x: 600, y: 50 },
    type: 'swiftParty',
    data: {
      label: '💳 Payment Party Details',
      name: 'Transaction Info',
      backgroundColor: '#ec4899',
      borderColor: '#be185d',
      nodeType: 'default'
    }
  },

  // Sub-nodes for detailed information
  {
    id: 'originator-details',
    position: { x: 50, y: 450 },
    type: 'detailNode',
    data: {
      label: 'Account Details',
      account: '123456789',
      bic: 'ORIGUS33XXX',
      swift: 'SWIFT-001',
      backgroundColor: '#d1fae5',
      borderColor: '#10b981',
      textColor: '#065f46'
    }
  },
  {
    id: 'senderBank-details',
    position: { x: 250, y: 450 },
    type: 'detailNode',
    data: {
      label: 'Bank Details',
      account: 'SENDBANK01',
      bic: 'SENDUS33XXX',
      swift: 'SWIFT-002',
      backgroundColor: '#dbeafe',
      borderColor: '#3b82f6',
      textColor: '#1d4ed8'
    }
  },
  {
    id: 'senderCorr-details',
    position: { x: 450, y: 450 },
    type: 'detailNode',
    data: {
      label: 'Correspondent Details',
      account: 'SENDCORR01',
      bic: 'SCOREUS33XXX',
      swift: 'SWIFT-003',
      backgroundColor: '#f3e8ff',
      borderColor: '#8b5cf6',
      textColor: '#7c3aed'
    }
  },
  {
    id: 'receiverCorr-details',
    position: { x: 750, y: 450 },
    type: 'detailNode',
    data: {
      label: 'Correspondent Details',
      account: 'RECVCORR01',
      bic: 'RCOREGB33XXX',
      swift: 'SWIFT-004',
      backgroundColor: '#fef3c7',
      borderColor: '#f59e0b',
      textColor: '#d97706'
    }
  },
  {
    id: 'receiverBank-details',
    position: { x: 950, y: 450 },
    type: 'detailNode',
    data: {
      label: 'Bank Details',
      account: 'RECVBANK01',
      bic: 'RECVGB22XXX',
      swift: 'SWIFT-005',
      backgroundColor: '#e0e7ff',
      borderColor: '#6366f1',
      textColor: '#4f46e5'
    }
  },
  {
    id: 'beneficiary-details',
    position: { x: 1150, y: 450 },
    type: 'detailNode',
    data: {
      label: 'Account Details',
      account: '987654321',
      bic: 'BNFGB22XXX',
      swift: 'SWIFT-006',
      backgroundColor: '#f3f4f6',
      borderColor: '#6b7280',
      textColor: '#374151'
    }
  },
  // SWIFT Routing Hubs (Intermediate Nodes)
  {
    id: 'hub-sender-to-senderCorr',
    position: { x: 350, y: 225 },
    type: 'routingHub',
    data: {
      label: '🌐 SWIFT Hub',
      name: 'Route-01',
      backgroundColor: '#fbbf24',
      borderColor: '#d97706'
    }
  },
  {
    id: 'hub-senderCorr-to-receiverCorr',
    position: { x: 600, y: 150 },
    type: 'routingHub',
    data: {
      label: '🌐 SWIFT Hub',
      name: 'Route-02',
      backgroundColor: '#fbbf24',
      borderColor: '#d97706'
    }
  },
  {
    id: 'hub-receiverCorr-to-receiver',
    position: { x: 850, y: 225 },
    type: 'routingHub',
    data: {
      label: '🌐 SWIFT Hub',
      name: 'Route-03',
      backgroundColor: '#fbbf24',
      borderColor: '#d97706'
    }
  }
];

const swiftEdges: Edge[] = [
  // Main payment flow through routing hubs
  {
    id: 'e1',
    source: 'originator',
    target: 'senderBank',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 3 },
    label: 'Initiate'
  },
  {
    id: 'e2',
    source: 'senderBank',
    target: 'hub-sender-to-senderCorr',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 3 },
    label: 'Route'
  },
  {
    id: 'e2b',
    source: 'hub-sender-to-senderCorr',
    target: 'senderCorr',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 3 }
  },
  {
    id: 'e3',
    source: 'senderCorr',
    target: 'hub-senderCorr-to-receiverCorr',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 3 },
    label: 'Transfer'
  },
  {
    id: 'e3b',
    source: 'hub-senderCorr-to-receiverCorr',
    target: 'receiverCorr',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 3 }
  },
  {
    id: 'e4',
    source: 'receiverCorr',
    target: 'hub-receiverCorr-to-receiver',
    animated: true,
    style: { stroke: '#f59e0b', strokeWidth: 3 },
    label: 'Route'
  },
  {
    id: 'e4b',
    source: 'hub-receiverCorr-to-receiver',
    target: 'receiverBank',
    animated: true,
    style: { stroke: '#f59e0b', strokeWidth: 3 }
  },
  {
    id: 'e5',
    source: 'receiverBank',
    target: 'beneficiary',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 3 },
    label: 'Deliver'
  },

  // Connection to Payment Details (from center hub)
  {
    id: 'e6',
    source: 'paymentDetails',
    target: 'hub-senderCorr-to-receiverCorr',
    animated: false,
    style: { stroke: '#ec4899', strokeWidth: 2, strokeDasharray: '5,5' },
    label: 'Payment Info'
  },

  // Sub-node connections (detailed information) - connecting from bottom of parent nodes
  {
    id: 'detail1',
    source: 'originator',
    sourceHandle: 'bottom',
    target: 'originator-details',
    animated: false,
    style: { stroke: '#10b981', strokeWidth: 1, strokeDasharray: '3,3' },
    type: 'straight'
  },
  {
    id: 'detail2',
    source: 'senderBank',
    sourceHandle: 'bottom',
    target: 'senderBank-details',
    animated: false,
    style: { stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '3,3' },
    type: 'straight'
  },
  {
    id: 'detail3',
    source: 'senderCorr',
    sourceHandle: 'bottom',
    target: 'senderCorr-details',
    animated: false,
    style: { stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '3,3' },
    type: 'straight'
  },
  {
    id: 'detail4',
    source: 'receiverCorr',
    sourceHandle: 'bottom',
    target: 'receiverCorr-details',
    animated: false,
    style: { stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '3,3' },
    type: 'straight'
  },
  {
    id: 'detail5',
    source: 'receiverBank',
    sourceHandle: 'bottom',
    target: 'receiverBank-details',
    animated: false,
    style: { stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '3,3' },
    type: 'straight'
  },
  {
    id: 'detail6',
    source: 'beneficiary',
    sourceHandle: 'bottom',
    target: 'beneficiary-details',
    animated: false,
    style: { stroke: '#6b7280', strokeWidth: 1, strokeDasharray: '3,3' },
    type: 'straight'
  }
];

export function SwiftFlowChart() {
  console.log('SwiftFlowChart component rendering...');
  const [showDemo] = useState(true);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold text-center">SWIFT Payment Flow Network</h2>
        <p className="text-center text-blue-100 mt-1">International Payment Processing System</p>
      </div>
      
      <div className="flex-1 border-2 border-gray-300 rounded-b-lg p-4 bg-gray-50">
        <FlowChart
          initialNodes={showDemo ? swiftNodes : undefined}
          initialEdges={showDemo ? swiftEdges : undefined}
          nodeTypes={nodeTypes}
          onNodesChange={(nodes) => console.log('Nodes:', nodes)}
          onEdgesChange={(edges) => console.log('Edges:', edges)}
          showMiniMap={true}
          showControls={true}
          showBackground={true}
          backgroundVariant={BackgroundVariant.Dots}
          className="rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
}

export default SwiftFlowChart;
