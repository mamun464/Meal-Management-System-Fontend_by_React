import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdLibraryAdd } from "react-icons/md";
import InvoiceDropdown from "./InvoiceDropDown/InvoiceItemDropdown";
import base_url from "../../../../public/config";
import InvoiceVariantdropDown from "./InvoiceDropDown/InvoiceVariantdropDown";

const Invoice = () => {
    const [itemDropdown, setItemDropdown] = useState([]);
    const [category, SetCategory] = useState('');
    const [VariantID, SetVariantID] = useState(0);
    const [filterVariant, SetFilterVariant] = useState([]);

    const [startDate, setStartDate] = useState(new Date());
    const [items, setItems] = useState([{ itemType: "", variant: "", quantity: "", unitRate: "", amount: "" }]);

    const handleAddItem = () => {
        setItems([...items, { itemType: "", variant: "", quantity: "", unitRate: "", amount: "" }]);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const handleNumericFieldChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = parseFloat(value) || 0; // Parse value as a float, default to 0 if not a valid number
        setItems(updatedItems);
    };

    const handleSubmit = () => {
        // Collect and submit the data wherever needed
        const formData = {
            date: startDate,
            billTo: "", // Add the actual value from the "Bill to" textarea
            shipTo: "", // Add the actual value from the "Ship to" textarea
            items: [...items],
        };

        // Example: Log the form data to the console
        console.log(formData);
    };



    const itemListFetch = async (url) => {
        try {
            const response = await fetch(`${base_url}${url}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            setItemDropdown(result.unique_item_names);
            // console.log("Item Fetch+++++++Inside++++++++++:", itemDropdown);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Now you can use itemListFetch here
        itemListFetch('/api/inventory/unique-item-names/');
    }, []);

    useEffect(() => {
        // Now you can use itemListFetch here

    }, [itemDropdown]);



    useEffect(() => {

        const fetchCategoryData = async () => {
            // console.log('Fetching category data', category);
            try {
                const response = await fetch(`${base_url}/api/inventory/get-item-variant/?item_name=${category}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                SetFilterVariant(result);
                console.log("Varient:---->", filterVariant);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCategoryData();


    }, [category]);

    const refreshDropdown = () => {
        itemListFetch('/api/inventory/unique-item-names/');
    }

    const handleItem = (categoryName) => {

        SetCategory(categoryName)
    }

    const handleVariant = (variantId) => {
        SetVariantID(variantId)

    }



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

            <div className="flex bg-[#242e38] uppercase text-sm text-[#fff] font-bold p-2 rounded-md mt-5">
                <div className="flex" style={{ flex: '7' }}>
                    <div className="flex-1">
                        <h1>Item</h1>
                    </div>
                    <div className="flex-1">
                        <h1>Variant</h1>
                    </div>
                </div>
                <div className="flex gap-3 justify-between" style={{ flex: '3' }}>
                    <h1>Quantity</h1>
                    <h1>Unit Rate</h1>
                    <h1>Amount</h1>
                </div>
            </div>

            {items.map((item, index) => (
                <div key={index} className="my-2 flex">
                    <div className="flex gap-2" style={{ flex: '7' }}>
                        <div className="flex-1">
                            <InvoiceDropdown
                                type="Item"
                                value={item.itemType}
                                itemDropdown={itemDropdown}
                                refreshDropdown={refreshDropdown}
                                handleItem={handleItem}
                                itemListFetch={itemListFetch}
                                onChange={(e) => handleItemChange(index, 'itemType', e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <InvoiceVariantdropDown
                                type="Variant"
                                value={item.variant}
                                filterVariant={filterVariant}
                                onChange={(e) => handleItemChange(index, 'variant', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 justify-between pl-4" style={{ flex: '3' }}>
                        <input
                            className="border border-gray-300 p-2 w-full rounded-lg"
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleNumericFieldChange(index, 'quantity', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 p-2 w-full rounded-lg"
                            type="number"
                            value={item.unitRate}
                            onChange={(e) => handleNumericFieldChange(index, 'unitRate', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 p-2 w-full rounded-lg"
                            type="tel"
                            value={item.amount}
                            onChange={(e) => handleNumericFieldChange(index, 'amount', e.target.value)}
                        />
                    </div>
                </div>
            ))}

            <div>
                <button className="btn btn-accent text-white bg-[#009f6f] font-bold uppercase" onClick={handleAddItem}>
                    <span>
                        <MdLibraryAdd />
                    </span>Item
                </button>

                <button className="btn btn-accent text-white bg-[#009f6f] font-bold uppercase" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Invoice;
