const DownloadModal = ({ showModal, setShowModal, ResponseData }) => {
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
                                <h3 className="font-bold text-lg text-black">{JSON.stringify(ResponseData)}</h3>
                                <p className="py-4 text-black">Press ESC key or click the button below to close</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn" onClick={() => setShowModal(false)}>
                                            Close
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </>
            )}
        </>
    );
};

export default DownloadModal;
