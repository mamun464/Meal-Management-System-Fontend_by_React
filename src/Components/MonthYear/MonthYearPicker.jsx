import { useState } from "react";
import './button.css';
import PropTypes from 'prop-types';

const MonthYearPicker = ({ handleDatePicker }) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    // okClicked (Eita dorkar hole bosate jabe, niche)
    const [, setOkClicked] = useState(false);


    const handleMonthSelect = (month) => {
        setSelectedMonth(month);
    };

    const handleYearChange = (action) => {
        if (action === 'prev') {
            setSelectedYear(selectedYear - 1);
        } else if (action === 'next') {
            setSelectedYear(selectedYear + 1);
        }
    };

    const handleContainerClick = (e) => {
        const isInsideDatePicker = e.target.closest('.your-date-picker-class'); // replace with the actual class name of your date picker container

        if (isInsideDatePicker) {
            // Click is inside the date picker, do nothing
        } else {
            setShowDatePicker(!showDatePicker);
            setOkClicked(false);
        }
    };

    const handleOKButtonClick = () => {
        setOkClicked(true);
        handleDatePicker(selectedMonth, selectedYear);
        console.log('from dp.jsx month', selectedMonth)
        console.log('from dp.jsx year', selectedYear)
        setShowDatePicker(false); // Close the date picker after OK button click
    };

    const handleMonthClick = (month) => {
        handleMonthSelect(month);
    };

    return (
        <div className="" onClick={handleContainerClick}>
            {/* Input Field */}
            <div className="relative mt-2">
                <input
                    type="text"
                    className="h-custom w-28  bg-gray-200 font-extrabold hover:bg-gray-300 hover:cursor-pointer text-red-600 text-center form-input py-4 outline-none px-3 leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    value={`${months[selectedMonth - 1]}-${selectedYear}`}
                    readOnly
                    onClick={(e) => {
                        handleContainerClick(e);
                        e.stopPropagation();
                    }}
                />

                {/* Date Picker */}
                {showDatePicker && (
                    <div
                        className="your-date-picker-class absolute top-10 left-0 bg-white border rounded p-4 z-10 shadow-lg h-fit"
                    >
                        {/* Year Navigation */}
                        <div className="flex justify-between gap-3  mb-3 font-semibold">
                            <button className="bg-gray-200 h-fit font-semibold px-1 py-0 rounded-md" onClick={() => handleYearChange('prev')}>Prev</button>
                            <h1>{selectedYear}</h1>
                            <button className="bg-gray-200 h-fit font-semibold px-1 py-0 rounded-md" onClick={() => handleYearChange('next')}>Next</button>
                        </div>
                        <p className='border-b-2 border-[#2332551A]'></p>
                        {/* Month Grid */}
                        <div className="grid grid-cols-3 gap-2">
                            {months.map((month, index) => (
                                <div
                                    key={index + 1}
                                    onClick={() => handleMonthClick(index + 1)}
                                    className={`cursor-pointer p-2 rounded-md transition duration-150 ease-in-out hover:bg-gray-300 ${selectedMonth === index + 1 ? 'bg-gray-300' : ''}`}
                                >
                                    {month}
                                </div>
                            ))}
                        </div>
                        {/* OK Button */}
                        <button className="bg-blue-500 text-white mt-4 p-2 rounded-md" onClick={handleOKButtonClick}>OK</button>
                    </div>
                )}
            </div>
        </div>
    );
};

MonthYearPicker.propTypes = {
    handleDatePicker: PropTypes.func.isRequired,
};

export default MonthYearPicker;
