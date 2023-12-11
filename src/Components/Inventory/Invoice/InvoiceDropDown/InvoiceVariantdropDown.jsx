import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    TEDropdown,
    TEDropdownToggle,
    TEDropdownMenu,
    TEDropdownItem,
    TERipple,
} from "tw-elements-react";

const InvoiceVariantdropDown = ({ filterVariant, handleItem }) => {
    // console.log("sInvoiceDropdown-------->", itemDropdown)
    const [type, SetType] = useState('Select Variant')
    const handleItemClick = (item) => {
        // handleItem()
        SetType(item)
    };
    return (
        <TEDropdown className="flex w-full" >
            <TERipple rippleColor="light" className="w-full">
                <TEDropdownToggle className="flex w-full text-[#233255CC] font-bold items-center justify-center whitespace-nowrap rounded bg-white px-6 p-2.5 text-xs  uppercase leading-normal text-black border border-gray-300 shadow-[0_4px_9px_-4px_rgba(0,0,0,0.1)] transition duration-150 ease-in-out hover:bg-gray-100 hover:shadow-[0_8px_9px_-4px_gray-400,0_4px_18px_0_gray-300] focus:bg-gray-100 focus:shadow-[0_8px_9px_-4px_gray-400,0_4px_18px_0_gray-300] focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-[0_8px_9px_-4px_gray-400,0_4px_18px_0_gray-300] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_gray-500] dark:hover:shadow-[0_8px_9px_-4px_gray-400,0_4px_18px_0_gray-500] dark:focus:shadow-[0_8px_9px_-4px_gray-400,0_4px_18px_0_gray-500] dark:active:shadow-[0_8px_9px_-4px_gray-400,0_4px_18px_0_gray-500]">
                    {type}
                    <span className="ml-2 [&>svg]:w-5 w-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </TEDropdownToggle>
            </TERipple>

            <TEDropdownMenu>
                <ul className="list-none p-0 m-0">
                    {filterVariant.map((item, index) => (
                        <TEDropdownItem key={index}>
                            <li onClick={() => {
                                handleItemClick(item);
                            }} className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
                                {item}
                            </li>
                        </TEDropdownItem>
                    ))}
                </ul>
            </TEDropdownMenu>
        </TEDropdown>
    );
};

export default InvoiceVariantdropDown;

InvoiceVariantdropDown.propTypes = {

    filterVariant: PropTypes.array.isRequired,
    handleItem: PropTypes.func.isRequired,
    refreshDropdown: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
}