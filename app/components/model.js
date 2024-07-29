const Model = ({ closePopup, handleImageSelect }) => {
    return (
        <div className="fixed inset-0 flex items-center bg-black bg-opacity-50 z-[999999]">
            <div className=" bg-white w-[600px] flex flex-col  items-start  h-[700px] mx-auto rounded  p-4 ">
                <div className="flex items-center justify-between w-full py-2">
                    <p className="text-xl">Select a design to link</p>
                    <button onClick={closePopup} className="text-xl">
                        Close
                    </button>
                </div>

                <div className=" grid grid-cols-2 gap-3 w-full h-full">
                    {['/image-11.jpeg', '/image-12.jpeg', '/image-13.jpeg', '/image-14.jpeg', "/image-15.jpeg", "/image-16.jpeg"].map((image) => (
                        <div className=" ">
                            <img
                                key={image}
                                src={image}
                                alt={image}
                                className="  cursor-pointer w-full h-full "
                                onClick={() => handleImageSelect(image)}
                            />
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}


export default Model