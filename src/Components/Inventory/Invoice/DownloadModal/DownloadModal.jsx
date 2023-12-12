import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import base_url from "../../../../../public/config";

const DownloadModal = ({ showModal, setShowModal, ResponseData }) => {
    const [PdfData, SetPdfData] = useState({})


    const handleDownload = () => {
        console.log("Download---------------+++++++");
        fetch(`${base_url}/api/inventory/generateinvoice/`, {
            method: 'POST',  // Change the method to POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ResponseData),  // Include the data in the body
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        // Check if the errorData includes an "errors" field
                        if (errorData.errors) {
                            // Iterate over the errors and display them
                            for (const field in errorData.errors) {
                                const errorMessages = errorData.errors[field];
                                // Display each error message using toast.error
                                errorMessages.forEach(errorMessage => {
                                    toast.error(`${field}: ${errorMessage}`);
                                });
                            }
                        } else {
                            // If the error format is unexpected, display a generic error message
                            toast.error('An error occurred. Please try again.');
                        }

                        // Throw an error to handle it in the catch block
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    });
                }
                toast.success(`Order Complete`);
                return response.json();
            })
            .then(data => {
                // Handle the success response data

                setShowModal(true);

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
    }

    return (
        <>
            {showModal && (
                <>
                    {/* Overlay */}
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',  // Full viewport width
                            height: '100%',  // Full viewport height
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent background
                        }}
                        onClick={() => setShowModal(false)}
                    ></div>

                    {/* Modal */}
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open>
                            <div className="modal-box bg-white p-4 rounded-md">
                                <h3 className="font-bold text-lg text-black"></h3>
                                <p className="py-4 text-black">{JSON.stringify(ResponseData)}</p>
                                <p className="py-4 text-black">Press ESC key or click the button below to close</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn" onClick={() => setShowModal(false)}>
                                            Close
                                        </button>
                                    </form>
                                    <button className="btn" onClick={() => handleDownload()}>
                                        Download Invoice
                                    </button>
                                </div>
                            </div>
                        </dialog>
                        <ToastContainer></ToastContainer>
                    </div>
                </>
            )}
        </>
    );
};

export default DownloadModal;
