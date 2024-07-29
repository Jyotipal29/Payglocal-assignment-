"use client"

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Model from './components/model';
import Radio from './components/Radio';
import Grid from './components/Grid';

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
export default function Home() {
  const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState(initialRows);
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

    // Update columns
    const updatedColumns = [...columns, newColumn];
    setColumns(updatedColumns);

    // Add new column with empty value for each row
    const updatedRows = rows.map(row => ({
      ...row,
      [newColumnId]: '' // Initialize new column with empty value
    }));
    setRows(updatedRows);
    toast("Column added", {
      position: "top-center",
      theme: "light",
    })
  };

  const addRow = () => {
    const newRowId = rows.length + 1;
    const newRow = { id: newRowId, productFilter: [] }; // Initialize with empty productFilter

    // Initialize missing columns with empty values
    const updatedRow = columns.reduce((acc, column) => {
      if (!acc.hasOwnProperty(column.id)) {
        acc[column.id] = ''; // Initialize with empty value
      }
      return acc;
    }, newRow);

    setRows([...rows, updatedRow]);
    toast("Row added", {
      position: "top-center",
      theme: "light",
    })
  };

  const handleInputChange = (rowId, columnId, value) => {
    const updatedRows = rows.map(row => {
      if (row.id === rowId) {
        return { ...row, [columnId]: value };
      }
      return row;
    });
    setRows(updatedRows);
  };


  const RenderProductFilter = ({ value }) => {
    return (
      <div className="w-full h-full">
        {
          value.length === 0 ? (
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
                  value.map((prod) => (

                    <p className="bg-white px-4 py-1 text-lg">{prod}</p>

                  ))
                }

              </div>
            </div>
          )
        }

      </div>
    );
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
    // Remove the column from the columns array
    const updatedColumns = columns.filter((column) => column.id !== columnId);

    // Remove the column data from each row
    const updatedRows = rows.map((row) => {
      const { [columnId]: removedColumn, ...rest } = row;
      return rest;
    });

    // Update the state
    setColumns(updatedColumns);
    setRows(updatedRows);
  };
  return (
    // <div className=" w-full h-full flex flex-col space-y-10 ">
    //   <div className="flex justify-between items-center  px-6">
    //     <div className="flex  space-x-5 items-center  ">
    //       <img
    //         src="/arrow.svg"
    //         className="w-[50px]"
    //       />
    //       <p className="text-[35px] font-bold border-b-2 border-black  w-[400px]">Rules creation</p>
    //     </div>
    //     <div>
    //       <button className=" bg-green-500 text-white text-[20px] p-3 rounded-lg border-2 border-green-500">Publish Feed</button>
    //     </div>
    //   </div>
    //   <div className="bg-gray-50 px-6  w-full  rounded-2xl my-4  ">
    //     <div className="flex-1 overflow-x-auto overflow-hidden  ">
    //       <table className=" w-full   ">
    //         <thead>
    //           <tr className="">
    //             <th className=""></th>
    //             {columns.map((column, index) => (
    //               <th key={index} className="text-2xl py-4   text-left ">
    //                 <div className="flex items-center justify-between  relative">
    //                   <p className=" w-full text-center"> {column.name}</p>
    //                   <img src="/ver.svg" className="h-5 w-5 cursor-pointer"
    //                     onClick={() => {
    //                       setShowDelete(!showDelete)

    //                     }}
    //                   />

    //                   {
    //                     showDelete && (
    //                       <div className="bg-white shadow-xl absolute top-8 right-0 p-4 z-[99]">
    //                         <img src="/delete.svg" className="w-5 h-5 cursor-pointer" onClick={() => {
    //                           handleDeleteColumn(column.id)
    //                           setShowDelete(false)
    //                         }} />
    //                       </div>
    //                     )
    //                   }
    //                 </div>

    //               </th>
    //             ))}
    //           </tr>
    //         </thead>
    //         <tbody className="w-full h-full     ">
    //           {rows.map((row, index) => (
    //             <tr key={row.id}
    //               draggable
    //               onDragStart={(e) => handleDragStart(e, index)}
    //               onDragOver={handleDragOver}
    //               onDrop={(e) => handleDrop(e, index)}
    //               className="  h-[250px] items-center cursor-pointer  overflow-x-auto overflow-hidden   "

    //             >
    //               <td
    //                 // className="flex flex-col items-center justify-center  "
    //                 className=" left-0 relative flex flex-col items-center justify-center   w-[100px]  "
    //                 style={{ height: "inherit" }}
    //               >
    //                 <div className="absolute flex justify-center items-center top-[-90px] inset-0 opacity-0 hover:opacity-100 hover:pointer-events-auto transition-opacity duration-300">
    //                   <img
    //                     src="/delete.svg"
    //                     className="w-5 h-8"
    //                     onClick={() => handleDeleteRow(row.id)}
    //                   />
    //                 </div>
    //                 <div className="flex  items-center space-x-4 text-4xl">
    //                   <p>{index + 1}</p>
    //                   <img src="/menu.svg" className="w-8 h-8" />
    //                 </div>

    //               </td>
    //               {columns.map(column =>
    //               (<td key={column.id}
    //                 className={`text-center `} >
    //                 {column.type === 'image' ? (

    //                   <div className=" w-full h-full text-center relative min-w-[300px]  "
    //                     onMouseEnter={() => {
    //                       setShowInput(true)
    //                       setCurrColId(column.id)
    //                       setCurrRowId(row.id)
    //                     }}
    //                     onMouseLeave={() => {
    //                       setShowInput(false)

    //                       // setCurrColId(null)
    //                       // setCurrRowId(null)

    //                     }}
    //                   >

    //                     {
    //                       row[column.id] && row[column.id].length > 0 ? (
    //                         <div className="relative  w-full h-full  flex justify-center items-center  ">
    //                           <img src={row[column.id]}
    //                             className="p-2 border border-gray-300 shadow-md w-[300px] h-[200px] object-contain  relative"
    //                           />
    //                           {
    //                             showInput && (
    //                               <button
    //                                 className="  tex-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    //                                 onClick={openPopup}
    //                               >
    //                                 <img src="/insert.svg" className="w-8 h-8" />
    //                               </button>
    //                             )
    //                           }
    //                         </div>
    //                       ) : (
    //                         <div className="relative  w-full h-full  flex justify-center items-center  ">
    //                           <div
    //                             className=" border border-gray-300 shadow-md w-[300px] h-[200px] flex justify-center items-center "

    //                           >
    //                             <button className="bg-white px-2 py-1 text-xl "
    //                               onClick={openPopup}
    //                             > + add design</button>
    //                           </div>
    //                         </div>

    //                       )
    //                     }
    //                   </div>

    //                 ) : (
    //                   renderProductFilter(row[column.id])
    //                 )}
    //               </td>
    //               ))}
    //               <td className="text-center text-4xl">
    //                 <button onClick={() => addColumn(`Variant ${columns.length - 2 + 1}`)} className="px-2 py-1 text-4xl bg-white shadow-2xl">
    //                   +
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //       <button onClick={addRow} className="  px-2 py-1 text-4xl  bg-white shadow-2xl mb-2">
    //         +
    //       </button>

    //     </div>
    //   </div>
    //   <div className="pb-[100px]">
    //     <div className="flex space-x-10 items-center  py-6">
    //       <p className="text-3xl font-bold">Use different design for remaining SKU's</p>
    //       <Radio />
    //     </div>

    //     <div className="flex  w-full h-[300px] gap-[5%]">
    //       <div className="basis-[50%]  bg-gray-50  flex justify-center items-center rounded-md ">
    //         <p className="text-2xl text-gray-500">N/A</p>
    //       </div>
    //       <div className="basis-[25%]  h-full flex items-center justify-center bg-gray-50 pl-[20px] rounded-md ">
    //         <img src="/image-11.jpeg" className=" h-[250px]  w-[250px] object-cover  bg-white p-4 rounded-md" />
    //       </div>
    //       <div className="basis-[20%]  h-full flex items-center justify-center bg-gray-50 pl-[20px]  rounded-md ">
    //         <img src="/image-1.jpeg"
    //           className=" h-[250px]  w-[250px] object-cover  bg-white p-4 rounded-md"
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   {
    //     showPopup && currRowId && currColId && (
    //       <Model
    //         closePopup={closePopup}
    //         handleImageSelect={handleImageSelect}
    //       />
    //     )
    //   }
    //   <ToastContainer />
    // </div >
    <div className="w-full h-full flex flex-col space-y-10">
      <div className="flex justify-between items-center px-6">
        <div className="flex space-x-5 items-center">
          <img src="/arrow.svg" className="w-[50px]" />
          <p className="text-[35px] font-bold border-b-2 border-black w-[400px]">Rules creation</p>
        </div>
        <div>
          <button className="bg-green-500 text-white text-[20px] p-3 rounded-lg border-2 border-green-500">Publish Feed</button>
        </div>
      </div>
      <div className="bg-gray-50 px-6 w-full rounded-2xl my-4">
        {/* <div className="flex-1 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th
                // className="sticky left-0 bg-gray-50"
                ></th>
                {columns.map((column, index) => (
                  <th key={index}
                  // className="text-2xl py-4  sticky top-0 bg-gray-50  border border-black"
                  >
                    <div
                    // className="flex items-center justify-between relative"
                    >
                      <p
                      // className="w-full text-center"
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
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id} 
                draggable onDragStart={(e) => handleDragStart(e, index)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, index)}
                // className="h-[250px] items-center cursor-pointer"
                >
                  <td className="w-[30%]">
                    <div className="flex ">
                      <div>
                        <div
                        // className="absolute flex justify-center items-center top-[-90px] inset-0 opacity-0 hover:opacity-100 hover:pointer-events-auto transition-opacity duration-300"
                        >
                          <img src="/delete.svg" className="w-5 h-8" onClick={() => handleDeleteRow(row.id)} />
                        </div>
                        <div className="flex items-center space-x-4 text-4xl">
                          <p>{index + 1}</p>
                          <img src="/menu.svg" className="w-8 h-8" />
                        </div>
                      </div>




                      {columns.map((column) => column.type === 'filter' && (
                        <div key={column.id}
                          className=" border border-black flex-1"
                        // className="border border-black  sticky left-0    "
                        >
                          <RenderProductFilter value={row[column.id]} />
                        </div>
                      ))}
                    </div>

                  </td>
                  {/* <td
                    className="w-[5%] border border-black"
                  // className="sticky left-0 bg-gray-50 z-10 w-[100px] h-[250px] flex flex-col items-center justify-center"
                  >
                    <div
                    // className="absolute flex justify-center items-center top-[-90px] inset-0 opacity-0 hover:opacity-100 hover:pointer-events-auto transition-opacity duration-300"
                    >
                      <img src="/delete.svg" className="w-5 h-8" onClick={() => handleDeleteRow(row.id)} />
                    </div>
                    <div className="flex items-center space-x-4 text-4xl">
                      <p>{index + 1}</p>
                      <img src="/menu.svg" className="w-8 h-8" />
                    </div>
                  </td> */}

        {/* <td>
                    {
                      columns.map((column) =>

                        <div key={column.id}>
                          {
                            column.type === 'filter' && (
                              renderProductFilter(row[column.id])
                            )
                          }

                        </div>
                      )
                    }
                  </td>
                  {columns.map((column) => {
                    return (
                      <td key={column.id} className="border border-black">
                        {column.type === 'image' && (
                          <div className="w-full h-full text-center relative" onMouseEnter={() => { setShowInput(true); setCurrColId(column.id); setCurrRowId(row.id); }} onMouseLeave={() => setShowInput(false)}>
                            {row[column.id] && row[column.id].length > 0 ? (
                              <div className="relative w-full h-full flex justify-center items-center">
                                <img src={row[column.id]} className="p-2 border border-gray-300 shadow-md w-[300px] h-[200px] object-contain" />
                                {showInput && (
                                  <button className="tex-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onClick={openPopup}>
                                    <img src="/insert.svg" className="w-8 h-8" />
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div className="relative w-full h-full flex justify-center items-center">
                                <div className="border border-gray-300 shadow-md w-[300px] h-[200px] flex justify-center items-center">
                                  <button className="bg-white px-2 py-1 text-xl" onClick={openPopup}>+ add design</button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    )
                  }

                  )} */}
        {/* Filter Column */}
        {/* {columns.map((column) => column.type === 'filter' && (
                    <td key={column.id}
                      className="w-[30%] border border-black"
                    // className="border border-black  sticky left-0    "
                    >
                      <RenderProductFilter value={row[column.id]} />
                    </td>
                  ))} */}
        {/* Image Column */}
        {/* {columns.map((column) => column.type === 'image' && (
                    <td key={column.id}
                      className="border border-black  w-[20%]"
                    >
                      <div
                        // className="w-full h-full text-center relative"
                        onMouseEnter={() => { setShowInput(true); setCurrColId(column.id); setCurrRowId(row.id); }} onMouseLeave={() => setShowInput(false)}>
                        {row[column.id] && row[column.id].length > 0 ? (
                          <div
                          // className="relative w-full h-full flex "
                          >
                            <img src={row[column.id]}
                            // className="p-2 border border-gray-300 shadow-md w-[300px] h-[200px] object-contain"
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
                              <button className="bg-white px-2 py-1 text-xl" onClick={openPopup}>+ add design</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  ))} */}
        {/* <td className="w-[60%]">
          <div className="flex   ">
            {
              columns.map((column) => column.type === 'image' && (
                // <div key={column.id}>
                <div
                  className="flex w-[30%] min-w-[30%]  max-w-[30%] border border-black"
                  // className="w-full h-full text-center relative"
                  onMouseEnter={() => { setShowInput(true); setCurrColId(column.id); setCurrRowId(row.id); }} onMouseLeave={() => setShowInput(false)}>
                  {row[column.id] && row[column.id].length > 0 ? (
                    <div
                    // className="relative w-full h-full flex "
                    >
                      <img src={row[column.id]}
                      // className="p-2 border border-gray-300 shadow-md w-[300px] h-[200px] object-contain"
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
                        <button className="bg-white px-2 py-1 text-xl" onClick={openPopup}>+ add design</button>
                      </div>
                    </div>
                  )}
                </div>
                // </div>
              ))
            }
          </div>

        </td> */}



        {/* 
                  <td className="text-center text-4xl">
                    <button onClick={() => addColumn(`Variant ${columns.length - 2 + 1}`)} className="px-2 py-1 text-4xl bg-white shadow-2xl">+</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addRow} className="px-2 py-1 text-4xl bg-white shadow-2xl mb-2">+</button>
        </div> */}

        <Grid />
      </div>
      <div className="pb-[100px]">
        <div className="flex space-x-10 items-center py-6">
          <p className="text-3xl font-bold">Use different design for remaining SKU's</p>
          <Radio />
        </div>
        <div className="flex w-full h-[300px] gap-[5%]">
          <div className="basis-[50%] bg-gray-50 flex justify-center items-center rounded-md">
            <p className="text-2xl text-gray-500">N/A</p>
          </div>
          <div className="basis-[25%] h-full flex items-center justify-center bg-gray-50 pl-[20px] rounded-md">
            <img src="/image-11.jpeg" className="h-[250px] w-[250px] object-cover bg-white p-4 rounded-md" />
          </div>
          <div className="basis-[20%] h-full flex items-center justify-center bg-gray-50 pl-[20px] rounded-md">
            <img src="/image-1.jpeg" className="h-[250px] w-[250px] object-cover bg-white p-4 rounded-md" />
          </div>
        </div>
      </div>
      {showPopup && currRowId && currColId && (
        <Model closePopup={closePopup} handleImageSelect={handleImageSelect} />
      )}
      <ToastContainer />
    </div>

    // <Grid />


  );
}
