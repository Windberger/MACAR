import {FaTrash, FaEdit} from "react-icons/fa";
import {useContext, useEffect, useState} from "react";
import EditCustomerDialog from "./EditCustomerDialog";
import {User} from "../types/UserData.ts";
import {deleteCustomer, fetchAllUsers, updateCustomer} from "../services/userService.ts";
import {UserContext} from "../../homepage/context/UserContext.tsx";

const customersData: User[] = [
    {user_id: 1, first_name: "George Lindelof", last_name: "Lindelof", email: "+4 315 23 62", bonus: 6, phone_number: "+4 315 23 62", is_admin: false},
    {user_id: 2, first_name: "Eric Dyer", last_name: "Dyer", email: "cristofer.ajer@lone.no", bonus: 7, phone_number: "+43 47589765", is_admin: false},
    {user_id: 3, first_name: "Haitam Alessami", last_name: "Alessami", email: "haitam@gmail.com", bonus: 5, phone_number: "+4 315 23 62", is_admin: false},
    {user_id: 4, first_name: "Michael Campbel", last_name: "Campbel", email: "+1 756 52 73", bonus: 8, phone_number: "+1 756 52 73", is_admin: false},
    {user_id: 5, first_name: "Ashley Williams", last_name: "Williams", email: "williams.ash@newl.com", bonus: 6, phone_number: "+4 315 23 62", is_admin: false},
];

const CustomerList = () => {
    const [editCustomer, setEditCustomer] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [customers, setCustomers] = useState<User[]>(customersData);

    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext not found");
    }
    const {token} = userContext;

    useEffect(() => {
        if (!token) {
            alert("You are not logged in or your session has expired.");
        } else {

            fetchAllUsers(token).then((customers) => {
                setCustomers(customers);
            }).catch((error) => {
                console.error("Error fetching customers:", error);
                setCustomers(customersData);
            })
        }
    }, []);

    const handleDelete = (id: number) => {
        if(!token) {
            alert("You are not logged in or your session has expired.");
            return;
        }

        if(!window.confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
            return;
        }

        deleteCustomer(token, id).then(() => {
            console.log("Customer deleted successfully");
        }).catch((error) => {
            console.error("Error deleting customer:", error);
            alert("An error occurred while deleting the customer.");
        });

        setCustomers(customers.filter(customer => customer.user_id !== id));
    };

    const filteredCustomers = customers.filter(customer =>
        customer.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const updateUser = (customer: User) => {
        if(!token) {
            alert("You are not logged in or your session has expired.");
            return;
        }

        updateCustomer(token, customer).catch((error) => {
            console.error("Error updating customer:", error);
            if (error.status === 409) {
                alert("This email is already in use by another user!")
            } else {
                alert("An error occurred while updating the customer.");
            }
        });
    }

    return (
        <div className="container items-center justify-center p-4">
            <input
                type="text"
                placeholder="Suche nach Namen..."
                className="mb-4 px-4 py-2 border-2 border-black dark:border-gray-400 dark:bg-gray-400 rounded-md w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table
                className="w-full bg-white dark:bg-gray-800 shadow-md border-t-2 border-l-2 border-r-2 border-b-2 border-black dark:border-gray-400 rounded-lg">
                <thead className="rounded-xl">
                <tr className="bg-black dark:bg-gray-400 dark:text-black text-white uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Mobile / Email</th>
                    <th className="py-3 px-6 text-center">Points/8</th>
                    <th className="py-3 px-6 text-center">Operation</th>
                </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-100 text-sm font-light">
                {filteredCustomers.map((customer) => (
                    <tr
                        key={customer.user_id}
                        className="border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700 transition duration-300"
                    >
                        <td className="py-3 px-6 text-left whitespace-nowrap">{customer.first_name}</td>
                        <td className="py-3 px-6 text-left">{customer.email}</td>
                        <td className="py-3 px-6 text-center">{customer.bonus}</td>
                        <td className="py-3 px-6 text-center">
                            <div className="flex justify-center space-x-4">
                                <button
                                    className="dark:bg-gray-800 dark:text-gray-100 text-grey-700 bg-gray-100 hover:text-blue-700"
                                    onClick={() => setEditCustomer(customer)}
                                >
                                    <FaEdit size={18}/>
                                </button>
                                <button
                                    className="bg-white dark:bg-gray-800 text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(customer.user_id)}
                                >
                                    <FaTrash size={18}/>
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

                        updateUser(updatedCustomer);

                        setCustomers(customers.map(c => c.user_id === updatedCustomer.user_id ? updatedCustomer : c));
                        setEditCustomer(null);
                    }}
                />
            )}
        </div>
    );
};

export default CustomerList;
