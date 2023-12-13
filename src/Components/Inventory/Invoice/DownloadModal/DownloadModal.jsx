
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import base_url from "../../../../../public/config";
import PropTypes from 'prop-types';

const DownloadModal = ({ showModal, setShowModal, ResponseData }) => {



    const handleDownload = () => {
        toast.success(`Invoice Downloading Started !`);
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

                return response.json();
            })
            .then(() => {
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
                                {/* <p className="py-4 text-black">{JSON.stringify(ResponseData)}</p> */}
                                <div className="flex justify-center">
                                    <img
                                        src="https://i.ibb.co/Qc7XMhr/logo-header.png"
                                        className="brand-logo"
                                        width={150}
                                        height={150}
                                        alt="Brand Logo"
                                    />
                                </div>
                                <p className="py-4 uppercase text-[13px] text-[#233255CC] font-bold mb-1 text-center">Click To Download Invoice</p>
                                <div className="modal-action flex justify-between">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-outline btn-error" onClick={() => setShowModal(false)}>
                                            Close
                                        </button>
                                    </form>
                                    <button className="btn btn-warning" onClick={() => handleDownload()}>
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

DownloadModal.propTypes = {

    ResponseData: PropTypes.object.isRequired,
    setShowModal: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    refreshDropdown: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
}
