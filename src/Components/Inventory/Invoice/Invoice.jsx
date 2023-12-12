import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdLibraryAdd } from "react-icons/md";
import InvoiceDropdown from "./InvoiceDropDown/InvoiceItemDropdown";
import base_url from "../../../../public/config";
import InvoiceVariantdropDown from "./InvoiceDropDown/InvoiceVariantdropDown";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";

const Invoice = () => {
    const [itemDropdown, setItemDropdown] = useState([]);
    const [category, SetCategory] = useState('');
    const [loading, SetLoading] = useState(false);
    const [VariantID, SetVariantID] = useState(0);
    const [filterVariant, SetFilterVariant] = useState([]);

    const [poNumber, setPoNumber] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [subtotal, setSubtotal] = useState(0);


    const [startDate, setStartDate] = useState(new Date());
    const [items, setItems] = useState([{ item: "", quantity: "", unitRate: "" }]);

    const calculateTotalAmount = () => {
        return items.reduce((accumulator, item) => accumulator + (item.quantity * item.unitRate || 0), 0);
    };

    useEffect(() => {
        // Update subtotal whenever items change
        setSubtotal(calculateTotalAmount());
    }, [items]);

    const handleAddItem = () => {
        setItems([...items, { item: "", quantity: "", unitRate: "" }]);
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
        // Validate billing address
        if (!startDate) {
            // toast.warning('Please fill in the "Bill to" field.');
            toast.warn('Date Field is Required', {
            });
            return;
        }
        if (!billingAddress) {
            // toast.warning('Please fill in the "Bill to" field.');
            toast.warn('Please fill in the "Bill to" field.', {
            });
            return;
        }

        // Validate PO number
        if (!/^\d+$/.test(poNumber)) {
            toast.warning('Please enter a valid PO Number with only numbers.');
            return;
        }

        // Validate items
        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            // Check item field
            if (!item.item) {
                toast.warning(`Please fill in the "Item" field for Item ${i + 1}.`);
                return;
            }

            // Check quantity field
            if (!item.quantity) {
                toast.warning(`Please fill in the "Quantity" field for Item ${i + 1}.`);
                return;
            }

            // Check unitRate field
            if (!item.unitRate) {
                toast.warning(`Please fill in the "Unit Rate" field for Item ${i + 1}.`);
                return;
            }
        }

        // Extract only the date part from startDate
        const formattedDate = startDate.toLocaleDateString();
        const formData = {
            date: formattedDate,
            billTo: billingAddress, // Add the actual value from the "Bill to" textarea
            shipTo: shippingAddress, // Add the actual value from the "Ship to" textarea
            poNumber: poNumber, // Add the actual value from the "Ship to" textarea
            items: [...items],
        };

        // Example: Log the form data to the console

        const apiPostData = {
            purchase_date: "2023-10-20",
            product_list: items.map(item => ({
                item: item?.item?.id, // Assuming item is the ID of the product
                item_info: item, // Assuming item is the ID of the product
                quantity: item.quantity,
                price_per_unit: item.unitRate,
            })),
            Billing_address: billingAddress,
            shipping_address: shippingAddress,
            po_number: poNumber,
        };

        console.log(apiPostData);
        SetLoading(true)
        fetch(`${base_url}/api/inventory/create-invoice/`, {
            method: 'POST',  // Change the method to POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiPostData),  // Include the data in the body
        })
            .then(response => {
                if (!response.ok) {
                    toast.error(`Order Not Complete`);
                    // return;
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                toast.success(`Order Complete`);
                return response.json();
            })
            .then(data => {
                // Handle the success response data
                console.log(data);
            })
            .catch(error => {
                // Check if the error is a JSON response
                if (error.response && error.response.json) {
                    error.response.json().then(jsonError => {
                        console.error('API Error:', jsonError.error);
                        // You can now handle the error message from the JSON response
                        // For example, show a toast or display an error message to the user
                    });
                } else {
                    console.error('Error making API request:', error);
                    // Handle other types of errors here
                }
            })
            .finally(() => {
                SetLoading(false);
            });


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
                        <textarea className="border border-gray-300 p-2 rounded-md h-[67px]"
                            placeholder="Who is this invoice to? (required)"
                            onChange={(e) => setBillingAddress(e.target.value)}></textarea>
                    </div>
                    <div className="mt-5">
                        <h1 className="uppercase text-[13px] text-[#233255CC] font-bold mb-1">Ship to:</h1>
                        <textarea className="border border-gray-300 p-2 rounded-md h-[67px]" placeholder="Optional"
                            onChange={(e) => setShippingAddress(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="flex items-center justify-end gap-3 mb-2">
                        <h1 className="uppercase text-[15px] text-[#233255CC] font-bold mb-1">Date</h1>
                        <DatePicker className="border border-gray-300 p-2 rounded-md" selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div className="flex items-center gap-3">
                        <h1 className="uppercase text-[15px] text-[#233255CC] font-bold mb-1">PO Number</h1>
                        <input type="tel"
                            className="border border-gray-300 p-2 rounded-md"
                            placeholder="PO Number" pattern="[0-9]*"
                            onChange={(e) => setPoNumber(e.target.value)} />
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
                            // onChange={(e) => handleItemChange(index, 'itemType', e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <InvoiceVariantdropDown
                                type="Variant"
                                value={item.variant}
                                filterVariant={filterVariant}
                                handleVariant={handleVariant}
                                onChange={(selectedVariant) => handleItemChange(index, 'item', selectedVariant)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 justify-between pl-4" style={{ flex: '3' }}>
                        <input
                            className="border border-gray-300 p-2 w-full rounded-lg"
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                                    // Only update the state if the input is a positive number or an empty string
                                    handleNumericFieldChange(index, 'quantity', inputValue);
                                }
                            }}
                        />

                        <input
                            className="border border-gray-300 p-2 w-full rounded-lg"
                            type="number"
                            value={item.unitRate}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                                    // Only update the state if the input is a positive number or an empty string
                                    handleNumericFieldChange(index, 'unitRate', inputValue);
                                }
                            }}
                        />

                        <input
                            className=" p-2 w-full rounded-lg text-end font-semibold"
                            type="text"
                            readOnly
                            value={item.quantity * item.unitRate}
                            style={{ outline: 'none' }} // Calculate the multiplication here
                        // onChange={(e) => handleNumericFieldChange(index, 'amount', e.target.value)} // Remove this line
                        />
                    </div>
                </div>
            ))}

            <div className="flex justify-between items-center">
                <button className="btn btn-accent text-white bg-[#009f6f] font-bold uppercase" onClick={handleAddItem}>
                    <span>
                        <MdLibraryAdd />
                    </span>Item
                </button>
                <div className="flex justify-end">
                    <h1 className="uppercase textarea-md text-[#233255CC] font-bold text-center">Subtotal</h1>
                    <input
                        className="pr-2 w-2/5 py-1 rounded-lg text-end font-semibold outline-none"
                        type="text"
                        readOnly
                        value={subtotal.toFixed(2)}
                    // style={{ outline: 'none' }}
                    />

                </div>
            </div>
            <div className="flex justify-end mt-6">
                {!loading && (
                    <button className="btn btn-warning font-bold uppercase" onClick={handleSubmit}>
                        <span><BiSolidPurchaseTagAlt /></span>Confirm Order
                    </button>
                )}
            </div>

            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Invoice;
