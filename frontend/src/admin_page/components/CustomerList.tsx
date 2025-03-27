import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import EditCustomerDialog from "./EditCustomerDialog";

const customersData = [
    { id: 1, name: "George Lindelof", contact: "+4 315 23 62", points: "6/8" },
    { id: 2, name: "Eric Dyer", contact: "cristofer.ajer@lone.no", points: "7/8" },
    { id: 3, name: "Haitam Alessami", contact: "haitam@gmail.com", points: "5/8" },
    { id: 4, name: "Michael Campbel", contact: "+1 756 52 73", points: "8/8" },
    { id: 5, name: "Ashley Williams", contact: "williams.ash@newl.com", points: "6/8" },
];

const CustomerList = () => {
    const [customers, setCustomers] = useState(customersData);
    const [editCustomer, setEditCustomer] = useState(null);

    const handleDelete = (id: number) => {
        setCustomers(customers.filter(customer => customer.id !== id));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Mobile / Email</th>
                        <th className="py-3 px-6 text-center">Points</th>
                        <th className="py-3 px-6 text-center">Operation</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                    {customers.map((customer) => (
                        <tr
                            key={customer.id}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {customer.name}
                            </td>
                            <td className="py-3 px-6 text-left">{customer.contact}</td>
                            <td className="py-3 px-6 text-center">{customer.points}</td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex justify-center space-x-4">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => setEditCustomer(customer)}
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDelete(customer.id)}
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {editCustomer && (
                <EditCustomerDialog
                    customer={editCustomer}
                    onClose={() => setEditCustomer(null)}
                    onSave={(updatedCustomer) => {
                        setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
                        setEditCustomer(null);
                    }}
                />
            )}
        </div>
    );
};

export default CustomerList;
