"use client"
import { useState } from "react"
import Model from "./model";
import { toast } from 'react-toastify';

const initialColumns = [
    { id: 'productFilter', name: 'Product Filter', type: 'filter' },
    { id: 'primaryVariant', name: 'Primary Variant', type: 'image' },
    { id: 'variant2', name: 'Variant 2', type: 'image' },
];

const initialRows = [
    { id: 1, productFilter: ["tags", "contains", "onsale"], primaryVariant: '/image-11.jpeg', variant2: '/image-12.jpeg' },
    { id: 2, productFilter: ["tags", "contains", "onsale"], primaryVariant: '/image-13.jpeg', variant2: '/image-14.jpeg' },
    { id: 3, productFilter: ["tags", "contains", "onsale"], primaryVariant: '/image-15.jpeg', variant2: '/image-16.jpeg' },
    { id: 4, productFilter: ["tags", "contains", "onsale"], primaryVariant: '/image-17.jpeg', variant2: '/image-18.jpeg' },
    { id: 5, productFilter: ["tags", "contains", "onsale"], primaryVariant: '/image-1.jpeg', variant2: '/image-20.jpeg' },
];


const Grid = () => {
    const [columns, setColumns] = useState(initialColumns);
    const [rows, setRows] = useState(initialRows);


    console.log(columns, rows, "row and columns")
    const [draggedIndex, setDraggedIndex] = useState(null);


    const [showInput, setShowInput] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const [currRowId, setCurrRowId] = useState(null)
    const [currColId, setCurrColId] = useState(null)
    const [showDelete, setShowDelete] = useState(false)

    const getNextVariantNumber = () => {
        const variantColumns = columns.filter(col => col.id.startsWith('variant'));
        const lastVariant = variantColumns.length ? variantColumns[variantColumns.length - 1].id : 'variant2';
        const lastNumber = parseInt(lastVariant.replace('variant', ''), 10);
        return lastNumber + 1;
    };

    const addColumn = () => {

        console.log("clicng")
        const newVariantNumber = getNextVariantNumber();
        const newColumnId = `variant${newVariantNumber}`;
        const newColumn = { id: newColumnId, name: `Variant ${newVariantNumber}`, type: 'image' };

        const updatedColumns = [...columns, newColumn];
        setColumns(updatedColumns);

        const updatedRows = rows.map(row => ({
            ...row,
            [newColumnId]: '' 
        }));
        setRows(updatedRows);
        toast("Column added", {
            position: "top-center",
            theme: "light",
        })
    };

    const addRow = () => {
        const newRowId = rows.length + 1;
        const newRow = { id: newRowId, productFilter: [] };

        const updatedRow = columns.reduce((acc, column) => {
            if (!acc.hasOwnProperty(column.id)) {
                acc[column.id] = ''; 
            }
            return acc;
        }, newRow);

        setRows([...rows, updatedRow]);
        toast("Row added", {
            position: "top-center",
            theme: "light",
        })
    };




    const handleDeleteRow = (rowId) => {
        const updatedRows = rows.filter(row => row.id !== rowId);
        setRows(updatedRows);
    };


    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();

    };

    const handleDrop = (e, index) => {

        if (draggedIndex === null || draggedIndex === index) return;

        const newRows = [...rows];
        const [movedRow] = newRows.splice(draggedIndex, 1);
        newRows.splice(index, 0, movedRow);
        setRows(newRows);
        setDraggedIndex(null);
    };




    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setShowInput(false)

    };




    const handleImageSelect = (imageUrl) => {


        const updatedRows = rows.map((row) => {
            if (row.id === currRowId) {
                return { ...row, [currColId]: imageUrl };
            }
            return row;
        });
        setRows(updatedRows);
        setShowPopup(false);
    };

    const handleDeleteColumn = (columnId) => {
        const updatedColumns = columns.filter((column) => column.id !== columnId);

        const updatedRows = rows.map((row) => {
            const { [columnId]: removedColumn, ...rest } = row;
            return rest;
        });

        setColumns(updatedColumns);
        setRows(updatedRows);
    };
    return (
        <div className=" relative  overflow-hidden  w-full  pb-[100px]" >
            <div className="overflow-x-auto relative w-full  table-wrapper" >
                {/* headrs */}
                <div className="flex gap-5   w-full  py-4">


                    <div className="w-[30%] flex  sticky left-0 bg-gray-50  z-[99]">

                        <div className="w-[20%]"></div>
                        <div className="flex-1 text-xl font-bold"> {columns[0].name}
                        </div>

                    </div>

                    <div className="w-[70%]  flex">
                        {

                            columns.map((column, index) => (
                                <>
                                    {
                                        column.type === "filter" ? (
                                            <></>
                                        ) : (
                                            <div className="flex w-[30%] min-w-[30%]  max-w-[30%] px-5 text-xl font-bold">
                                                <div
                                                    className="flex w-full items-center justify-start relative  "
                                                >
                                                    <p
                                                        className="w-full"
                                                    >{column.name}</p>
                                                    <img src="/ver.svg"
                                                        className="h-5 w-5 cursor-pointer"
                                                        onClick={() => setShowDelete(!showDelete)} />
                                                    {showDelete && (
                                                        <div className="bg-white shadow-xl absolute top-8 right-0 p-4 z-[99]">
                                                            <img src="/delete.svg" className="w-5 h-5 cursor-pointer" onClick={() => { handleDeleteColumn(column.id); setShowDelete(false); }} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    }


                                </>
                            ))
                        }
                    </div>

                </div>

                {/* rows */}
                <div className="flex flex-col gap-5 py-4 ">
                    {
                        rows.map((row, index) => (
                            <div key={row.id} className="flex gap-5  "
                                draggable onDragStart={(e) => handleDragStart(e, index)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, index)}
                            >
                                <div className="flex  items-center space-x-4 w-[30%] sticky left-0  bg-gray-50 z-[2]">
                                    <div className="">
                                        <div

                                            className="inset-0 opacity-0 hover:opacity-100 hover:pointer-events-auto transition-opacity duration-300  cursor-pointer"
                                        >
                                            <img src="/delete.svg" className="w-5 h-8"
                                                onClick={() => handleDeleteRow(row.id)}
                                            />
                                        </div>
                                        <div className="flex items-center space-x-4 text-4xl">
                                            <p>{index + 1}</p>
                                            <img src="/menu.svg" className="w-8 h-8" />
                                        </div>
                                    </div>
                                    {columns.map((column) => column.type === 'filter' &&

                                        <div key={column.id}
                                            className="  flex-1 bg-white"
                                        >
                                            <div className="w-full h-full">
                                                {
                                                    column?.productFilter?.length === 0 ? (
                                                        <div className="relative  w-full h-full  flex justify-center items-center">
                                                            <div
                                                                className=" border border-gray-300 shadow-md w-full h-[200px] flex justify-center items-center "

                                                            >
                                                                <button className="bg-white px-2 py-1 text-xl "
                                                                    // onClick={openPopup}
                                                                > + add design</button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative  w-full h-full  flex justify-center items-center">
                                                            <div
                                                                className=" border border-gray-300 shadow-md w-full h-[200px] flex items-center justify-evenly  "

                                                            >{
                                                                    row[column.id].map((prod) => (

                                                                        <p className="bg-gray-50 shadow-md px-4 py-1 text-lg ">{prod}</p>

                                                                    ))
                                                                }

                                                            </div>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        </div>


                                    )}

                                </div>


                                <div className="w-[70%]  flex  items-center">
                                    {
                                        columns.map((column) => column.type === 'image' && (

                                            <div
                                                className="flex w-[30%] min-w-[30%]  max-w-[30%]"
                                                onMouseEnter={() => { setShowInput(true); setCurrColId(column.id); setCurrRowId(row.id); }}
                                                onMouseLeave={() => setShowInput(false)}
                                            >
                                                {row[column.id] && row[column.id].length > 0 ? (
                                                    <div
                                                        className="relative w-full h-full flex  items-center justify-center "
                                                    >
                                                        <img src={row[column.id]}
                                                            className="p-2 border border-gray-300 shadow-md w-[300px] h-[200px] object-contain"
                                                        />
                                                        {showInput && (
                                                            <button className="tex-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onClick={openPopup}>
                                                                <img src="/insert.svg" className="w-8 h-8" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="relative w-full h-full flex justify-center items-center">
                                                        <div className="border border-gray-300 shadow-md w-[300px] h-[200px] flex justify-center items-center">
                                                            <button className="bg-white px-2 py-1 text-xl"
                                                                onClick={openPopup}
                                                            >+ add design</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            // </div>
                                        ))
                                    }

                                    <div >
                                        <button
                                            onClick={() => addColumn(`Variant ${columns.length - 2 + 1}`)}
                                            className="px-2 py-1 text-4xl bg-white shadow-2xl">+</button>

                                    </div>
                                </div>



                            </div>
                        ))
                    }

                    <div>
                        <button onClick={addRow} className="px-2 py-1 text-4xl bg-white shadow-2xl mb-2">+</button>

                    </div>

                </div>
            </div>


            {showPopup && currRowId && currColId && (
                <Model closePopup={closePopup} handleImageSelect={handleImageSelect} />
            )}
        </div>
    )
}


export default Grid