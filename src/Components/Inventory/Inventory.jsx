
import { useEffect, useState } from 'react';
import MonthYearPicker from './../MonthYear/MonthYearPicker';
import ItemDropdown from './ItemDropdown/ItemDropdown';
import base_url from '../../../public/config';
import InventoryTable from './Table/InventoryTable';
import VariantDropdown from './ItemDropdown/VariantDropdown';
import NoRecordFound from '../NoRecordFound/NoRecordFound';


const Inventory = () => {
    const [itemDropdown, setItemDropdown] = useState([]);
    const [category, SetCategory] = useState('');
    const [VariantID, SetVariantID] = useState(0);
    const [filterVariant, SetFilterVariant] = useState([]);
    const [filterData, SetFilterData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());

    const fetchInventoryData = async (url) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log(url);
            SetFilterData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log("in variant: ", VariantID);
        let url = `${base_url}/api/inventory/get-inventory/`
        if (year == 0 || month == 0) {
            url = `${base_url}/api/inventory/get-inventory/?item=${VariantID}`
        } else {
            url = `${base_url}/api/inventory/get-inventory/?month=${month}&year=${year}&item=${VariantID}`
        }


        fetchInventoryData(url);


    }, [VariantID, year, month]);

    useEffect(() => {
        console.log("in parent: ", category);
        const fetchCategoryData = async () => {
            try {
                const response = await fetch(`${base_url}/api/inventory/get-item-variant/?item_name=${category}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                SetFilterVariant(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCategoryData();


    }, [category]);

    const handleVariant = (variantId) => {
        SetVariantID(variantId)

    }
    const handleItem = (categoryName) => {
        if (categoryName !== 'ALL') {
            SetCategory(categoryName)
        } else {
            fetchInventoryData(`${base_url}/api/inventory/get-inventory/`);
        }


    }

    const itemListFetch = async (url) => {
        try {
            const response = await fetch(`${base_url}${url}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            setItemDropdown(result.unique_item_names);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        itemListFetch('/api/inventory/unique-item-names/');
    }, []);

    const refreshDropdown = () => {
        itemListFetch('/api/inventory/unique-item-names/');
    }
    const handleDatePicker = (p_month, p_year) => {
        setYear(p_year);
        setMonth(p_month);
    };
    // console.log(itemDropdown)
    return (
        <div className="border-[#F8F8F8] rounded-tl-2xl rounded-tr-2xl bg-[#F8F8F8]">
            <div className="flex justify-between items-center gap-4 p-4">
                <div className='flex justify-start items-center gap-4 p-4'>

                    <button className="h-custom btn w-36 bg-[#233255] text-[#fff] uppercase">CREATE Item</button>
                    <button className="h-custom btn w-36 bg-[#233255] text-[#fff] uppercase">CREATE Item</button>
                    <button className="h-custom btn w-36 bg-[#233255] text-[#fff] uppercase">CREATE Item</button>
                </div>
                <div className='flex items-center gap-2'>
                    <MonthYearPicker handleDatePicker={handleDatePicker}></MonthYearPicker>
                    <ItemDropdown
                        itemDropdown={itemDropdown}
                        refreshDropdown={refreshDropdown}
                        handleItem={handleItem}
                    ></ItemDropdown>

                    <VariantDropdown VariantDropdown={filterVariant}
                        handleVariant={handleVariant}
                    ></VariantDropdown>
                </div>

            </div>


            <p className="border-b-2 border-[#2332551A]"></p>

            {/* <div className="text-[#233255E5] font-bold uppercase flex gap-7 px-4">
                <NavLink
                    className={`py-3 ${selectedNavLink === 'all' ? 'selected' : ''}`}
                    onClick={() => handleNavLinkClick('/api/user/user-list/', 'all')}
                >
                    All <span
                        className={`ml-3 ${selectedNavLink === 'all' ? 'span-select' : 'hidden'}`}

                    >{users.length}</span>
                </NavLink>
                <NavLink
                    className={`py-3 ${selectedNavLink === 'current' ? 'selected' : ''}`}
                    onClick={() => handleNavLinkClick('/api/user/active-user/', 'current')}
                >
                    Current Members <span
                        className={`ml-3 ${selectedNavLink === 'current' ? 'span-select' : 'hidden'}`}

                    >{users.length}</span>
                </NavLink>
                <NavLink
                    className={`py-3 ${selectedNavLink === 'previous' ? 'selected' : ''}`}
                    onClick={() => handleNavLinkClick('/api/user/deactive-user/', 'previous')}
                >
                    Previous Members <span
                        className={`ml-3 ${selectedNavLink === 'previous' ? 'span-select' : 'hidden'}`}

                    >{users.length}</span>
                </NavLink>
            </div> */}
            <p className="border-b-2 border-[#2332551A]"></p>
            <div className="bg-[#FFF]">
                <p className="font-medium text-[14px] text-[#2332557F] py-5 px-4 pb-0">Showing 1 - 10 of 70 Members</p>

                {/* <Table loadingForTable={loading} users={users} month={month} year={year} fetchData={fetchData} navClick={navClick}></Table> */}
                {filterData.length === 0 ? (
                    <NoRecordFound></NoRecordFound>
                ) : (
                    <InventoryTable filterData={filterData} />
                )}
            </div>
            {/* <h1>Users: {users.length}</h1> */}
        </div>
    );
};


export default Inventory;