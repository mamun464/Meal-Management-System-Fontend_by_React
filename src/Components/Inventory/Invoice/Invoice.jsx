import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Invoice = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className="max-w-7xl mx-auto border p-4 rounded-md bg-gray-50 drop-shadow-lg">
            <h1 className="uppercase text-3xl text-[#233255CC] font-bold text-center my-3">Invoice</h1>
            <div className="flex justify-between">
                <div className="flex gap-5">
                    <div className="mt-5">
                        <h1 className="uppercase text-[13px] text-[#233255CC] font-bold mb-1">Bill to:</h1>
                        <textarea className="border border-gray-300 p-2 rounded-md h-[67px]" placeholder="Who is this invoice to? (required)"></textarea>
                    </div>
                    <div className="mt-5">
                        <h1 className="uppercase text-[13px] text-[#233255CC] font-bold mb-1">Ship to:</h1>
                        <textarea className="border border-gray-300 p-2 rounded-md h-[67px]" placeholder="Optional"></textarea>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="flex items-center justify-end gap-3 mb-2">
                        <h1 className="uppercase text-[15px] text-[#233255CC] font-bold mb-1">Date</h1>
                        <DatePicker className="border border-gray-300 p-2 rounded-md" selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>

                    <div className="flex items-center gap-3">
                        <h1 className="uppercase text-[15px] text-[#233255CC] font-bold mb-1">PO Number</h1>
                        <input type="tel" className="border border-gray-300 p-2 rounded-md" placeholder="PO Number" pattern="[0-9]*" />
                    </div>
                </div>
            </div>

            <table className="border-collapse w-full mb-4 mt-16">
                <thead>
                    <tr className="border-2 rounded-xl bg-gray-300 text-left">
                        <th className="border-b-2 px-4 py-2">Item</th>
                        <th className="border-b-2 px-4 py-2">Variant</th>
                        <th className="border-b-2 px-4 py-2">Quantity</th>
                        <th className="border-b-2 px-4 py-2">Rate</th>
                        <th className="border-b-2 px-4 py-2">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-b-2 px-4 py-2">Beef</td>
                        <td className="border-b-2 px-4 py-2">Deshi</td>
                        <td className="border-b-2 px-4 py-2">1</td>
                        <td className="border-b-2 px-4 py-2">$800</td>
                        <td className="border-b-2 px-4 py-2">$800.00</td>
                    </tr>

                </tbody>
                <tfoot>
                    <tr>
                        <th className="border-t-2 px-4 py-2" colSpan="3">
                            Subtotal
                        </th>
                        <th className="border-t-2 px-4 py-2">$1,000.00</th>
                    </tr>
                </tfoot>
            </table>

        </div>

    );
};

export default Invoice;