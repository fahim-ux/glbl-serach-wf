import Table from "./Table"


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
    return (
        <>
            <div className="flex flex-col items-center justify-center p-2 font-mono">
                <Table
                    columns={columns}
                    data={data}
                    headerClass="bg-blue-600 text-white"
                    rowClassFn={(row, i) => (i % 2 === 0 ? 'bg-[#A6AEBF]' : 'bg-white')}
                />


            </div>
        </>
    )
}


export default NewTable;