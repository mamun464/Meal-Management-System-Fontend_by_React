import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdLibraryAdd } from "react-icons/md";

const Invoice = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [items, setItems] = useState([{ item: "", variant: "", quantity: "", unitRate: "", amount: "" }]);

    const handleAddItem = () => {
        setItems([...items, { item: "", variant: "", quantity: "", unitRate: "", amount: "" }]);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    return (
        <div className="max-w-7xl mx-auto border p-4 rounded-md bg-gray-50 drop-shadow-lg">
            {/* ... (rest of your code) */}
            <div>
                {items.map((item, index) => (
                    <div key={index} className="my-2 flex">
                        <div className="flex gap-2" style={{ flex: '7' }}>
                            <div className="flex-1">
                                <input
                                    className="border border-gray-300 p-2 w-full rounded-lg"
                                    type="text"
                                    value={item.item}
                                    onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    className="border border-gray-300 p-2 w-full rounded-lg"
                                    type="text"
                                    value={item.variant}
                                    onChange={(e) => handleItemChange(index, 'variant', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-between pl-4" style={{ flex: '3' }}>
                            <input
                                className="border border-gray-300 p-2 w-full rounded-lg"
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            />
                            <input
                                className="border border-gray-300 p-2 w-full rounded-lg"
                                type="number"
                                value={item.unitRate}
                                onChange={(e) => handleItemChange(index, 'unitRate', e.target.value)}
                            />
                            <input
                                className="border border-gray-300 p-2 w-full rounded-lg"
                                type="tel"
                                value={item.amount}
                                onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
                <div>
                    <button
                        className="btn btn-accent text-white bg-[#009f6f] font-bold uppercase"
                        onClick={handleAddItem}
                    >
                        <span>
                            <MdLibraryAdd />
                        </span>Item
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
