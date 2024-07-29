const Radio = () => {
    return (
        <div className="">
            <div className="relative inline-block w-16 align-middle select-none transition duration-200 ease-in">
                <input
                    type="radio"
                    name="toggle"
                    id="toggle"
                    className=" toggle-radio p-2 absolute right-0 block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    defaultChecked
                />
                <label
                    htmlFor="toggle"
                    className="toggle-label block overflow-hidden h-8 rounded-full bg-green-500 cursor-pointer"
                ></label>
            </div>

        </div>
    )
}


export default Radio