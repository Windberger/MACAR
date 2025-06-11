import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@mui/material";
import * as Select from "@radix-ui/react-select";

export default function BonusDialog() {
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [isOpen, setIsOpen] = useState(true);

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-gray-400 dark:bg-opacity-10">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-80 relative">
                    {/* Close Button */}
                    <button
                        className="absolute top-2 right-2 text-black dark:text-white"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Customer Select Dropdown */}
                    <Select.Root onValueChange={setSelectedCustomer}>
                        <Select.Trigger className="w-full border p-2 rounded-lg flex justify-between items-center dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <Select.Value placeholder="Select Customer" />
                            <Select.Icon />
                        </Select.Trigger>
                        <Select.Content className="bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
                            <Select.Item
                                value="customer1"
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                            >
                                Customer 1
                            </Select.Item>
                            <Select.Item
                                value="customer2"
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                            >
                                Customer 2
                            </Select.Item>
                            <Select.Item
                                value="customer3"
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                            >
                                Customer 3
                            </Select.Item>
                        </Select.Content>
                    </Select.Root>

                    {/* Number Selection */}
                    <div className="flex justify-center my-4 space-x-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <span
                                key={num}
                                className="w-8 h-8 flex items-center justify-center rounded-full border text-gray-700 dark:text-gray-100 dark:border-gray-600"
                            >
                                {num}
                            </span>
                        ))}
                    </div>

                    {/* Done Button */}
                    <Button
                        className="w-full mt-2 bg-blue-500 text-white dark:bg-blue-600 dark:text-white"
                        onClick={() => setIsOpen(false)}
                    >
                        Done
                    </Button>
                </div>
            </div>
        )
    );
}