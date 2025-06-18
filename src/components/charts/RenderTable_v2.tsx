import React from 'react';
import Table from './Table_v2'; // adjust path as needed

const columns = ['id', 'name', 'email', 'phone', 'age', 'gender', 'country', 'city', 'zipCode', 'joinedAt', 'status', 'balance', 'isPremium', 'lastLogin', 'device', 'score', 'referrals', 'plan', 'feedback', 'notes'
];

const data = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `+91-98765${(10000 + i).toString().slice(-5)}`,
    age: 20 + (i % 10),
    gender: i % 2 === 0 ? 'Male' : 'Female',
    country: ['India', 'USA', 'UK', 'Germany'][i % 4],
    city: ['Delhi', 'New York', 'London', 'Berlin'][i % 4],
    zipCode: `${100000 + i}`,
    joinedAt: `2023-0${(i % 9) + 1}-15`,
    status: ['Active', 'Inactive', 'Pending'][i % 3],
    balance: (Math.random() * 10000).toFixed(2),
    isPremium: i % 3 === 0,
    lastLogin: `2024-0${(i % 9) + 1}-10T12:00:00`,
    device: ['Mobile', 'Desktop', 'Tablet'][i % 3],
    score: Math.floor(Math.random() * 100),
    referrals: Math.floor(Math.random() * 10),
    plan: ['Free', 'Pro', 'Enterprise'][i % 3],
    feedback: ['Good', 'Average', 'Excellent'][i % 3],
    notes: `Some note for user ${i + 1}`
}));


const NewTable = () => {
//   const columns = ['Name', 'Department', 'Role', 'Score', 'Remarks'];

//   const data = [
//     { Name: 'Fahim', Department: 'CSE', Role: 'Developer', Score: 92, Remarks: 'Excellent' },
//     { Name: 'Ayesha', Department: 'ECE', Role: 'Tester', Score: 76, Remarks: 'Good' },
//     { Name: 'Raj', Department: 'EE', Role: 'Manager', Score: 85, Remarks: 'Very Good' },
//     { Name: 'Sara', Department: 'ME', Role: 'Designer', Score: 89, Remarks: 'Strong visuals' },
//     { Name: 'Ali', Department: 'CE', Role: 'Analyst', Score: 71, Remarks: 'Improving' },
//     { Name: 'John', Department: 'CSE', Role: 'Intern', Score: 65, Remarks: 'Needs training' },
//     { Name: 'Meera', Department: 'CHE', Role: 'Engineer', Score: 94, Remarks: 'Outstanding' },
//   ];

  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full ">
        <Table
          columns={columns}
          data={data}
          headerClass="bg-[#123458] text-white"
          rowClassFn={(row, idx) => (idx % 2 === 0 ? 'bg-[#A6AEBF]' : 'bg-white')}
          cellClassFn={() => 'text-center'}
          rowsPerPage={5}
        />
      </div>
    // </div>
  );
};

export default NewTable;
