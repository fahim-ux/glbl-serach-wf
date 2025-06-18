import Table from './Table_v3'; 

const NewTable = () => {
  const columns = ['Name', 'Department', 'Role', 'Score', 'Remarks'];

  const data = [
    { Name: 'Fahim', Department: 'CSE', Role: 'Developer', Score: 92, Remarks: 'Excellent' },
    { Name: 'Ayesha', Department: 'ECE', Role: 'Tester', Score: 76, Remarks: 'Good' },
    { Name: 'Raj', Department: 'EE', Role: 'Manager', Score: 85, Remarks: 'Very Good' },
    { Name: 'Sara', Department: 'ME', Role: 'Designer', Score: 89, Remarks: 'Strong visuals' },
    { Name: 'Ali', Department: 'CE', Role: 'Analyst', Score: 71, Remarks: 'Improving' },
    { Name: 'John', Department: 'CSE', Role: 'Intern', Score: 65, Remarks: 'Needs training' },
    { Name: 'Meera', Department: 'CHE', Role: 'Engineer', Score: 94, Remarks: 'Outstanding' },
    { Name: 'Rita', Department: 'MME', Role: 'Researcher', Score: 81, Remarks: 'Capable' },
  ];

  return (
    // <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-6">
      

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <Table
          columns={columns}
          data={data}
          headerClass="bg-black text-white"
          rowClassFn={(row, index) =>
            index % 2 === 0 ? 'bg-gray-100 text-black' : 'bg-white text-black'
          }
          cellClassFn={() => 'text-center'}
          rowsPerPage={5}
        />
      </div>
    // </div>
  );
};

export default NewTable;
