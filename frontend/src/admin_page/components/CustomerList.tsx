import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import EditCustomerDialog from "./EditCustomerDialog";

const customersData = [
    { id: 1, name: "George Lindelof", contact: "+4 315 23 62", points: "6" },
    { id: 2, name: "Eric Dyer", contact: "cristofer.ajer@lone.no", points: "7" },
    { id: 3, name: "Haitam Alessami", contact: "haitam@gmail.com", points: "5" },
    { id: 4, name: "Michael Campbel", contact: "+1 756 52 73", points: "8" },
    { id: 5, name: "Ashley Williams", contact: "williams.ash@newl.com", points: "6" },
];

const CustomerList = () => {
    const [customers, setCustomers] = useState(customersData);
    const [editCustomer, setEditCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (id: number) => {
        setCustomers(customers.filter(customer => customer.id !== id));
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container items-center justify-center p-4">
            <input
                type="text"
                placeholder="Suche nach Namen..."
                className="mb-4 px-4 py-2 border-2 border-black rounded-md w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="w-full bg-white shadow-md border-t-2 border-l-2 border-r-2 border-b-2 border-black rounded-lg">
                <thead>
                <tr className="bg-black text-white uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Mobile / Email</th>
                    <th className="py-3 px-6 text-center">Points/8</th>
                    <th className="py-3 px-6 text-center">Operation</th>
                </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                {filteredCustomers.map((customer) => (
                    <tr
                        key={customer.id}
                        className="border border-gray-200 rounded-lg hover:bg-gray-100"
                    >
                        <td className="py-3 px-6 text-left whitespace-nowrap">{customer.name}</td>
                        <td className="py-3 px-6 text-left">{customer.contact}</td>
                        <td className="py-3 px-6 text-center">{customer.points}</td>
                        <td className="py-3 px-6 text-center">
                            <div className="flex justify-center space-x-4">
                                <button
                                    className="bg-white text-grey-700 bg-gray-100 hover:text-blue-700"
                                    onClick={() => setEditCustomer(customer)}
                                >
                                    <FaEdit size={18} />
                                </button>
                                <button
                                    className="bg-white text-red-500 hover:text-red-700"
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
