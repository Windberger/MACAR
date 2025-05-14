import {useState} from "react";
import {X} from "lucide-react";


export default function BonusDialog() {
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [isOpen, setIsOpen] = useState(true);

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-2xl shadow-lg w-80 relative">
                    <button className="absolute top-2 right-2" onClick={() => setIsOpen(false)}>
                        <X className="w-6 h-6"/>
                    </button>
                    <Select onValueChange={setSelectedCustomer}>
                        <SelectTrigger className="w-full border p-2 rounded-lg">
                            <SelectValue placeholder="Select Customer"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="customer1">Customer 1</SelectItem>
                            <SelectItem value="customer2">Customer 2</SelectItem>
                            <SelectItem value="customer3">Customer 3</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex justify-center my-4 space-x-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <span key={num}
                                  className="w-8 h-8 flex items-center justify-center rounded-full border text-gray-700">
        {num}
        </span>
                        ))}
                    </div>
                    <Button className="w-full mt-2" onClick={() => setIsOpen(false)}>
                        Done
                    </Button>
                </div>
            </div>
        )
    );
}
