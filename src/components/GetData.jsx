import { useQuery } from "@tanstack/react-query";
import { fetchingCoresData } from "../helpers";
import { Fragment, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaEdit } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdAutoDelete } from "react-icons/md";
import { IoTrashBinOutline } from "react-icons/io5";
import { BsPrinterFill } from "react-icons/bs";
import { SlPrinter } from "react-icons/sl";
import { DeleteData } from "./DeleteData";
import { Loading } from "./Loading";



export const GetData = () => {
    const { data, isLoading, error } = useQuery({ queryKey: ['cores'], queryFn: fetchingCoresData });
    const [selectedItem, setSelectedItem] = useState(null)

    if (isLoading) return <Loading /> //TODO
    if (error) return <p>Error: {error.message}</p> //TODO

    return (
        <Fragment>


            <div className="content">
                <nav className="navigate flex p-8 w-full justify-center items-center mb-6">
                    <NavLink
                        to="AddNewData"
                        end
                        className={({ isActive }) =>
                            `p-5 rounded-lg font-bold transition-all shadow-md ${isActive ? "bg-orange-500 text-white" : "bg-white text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white"
                            }`
                        }
                    >
                        Add New Data
                    </NavLink>
                </nav>
                <table className="border-separate border-spacing-x-1 border-spacing-y-2 border border-gray-400 overflow-hidden rounded-lg shadow-lg">
                    <caption className=" bg-amber-200" >
                        <h2 className="text-xl font-semibold font-mono">Data Managment App 2025</h2>
                    </caption>
                    <thead>
                        <tr className="bg-orange-200">
                            <th scope="col" className="border border-gray-300  px-4 py-2 text-center font-mono text-xl">Core ID</th>
                            <th scope="col" className="border border-gray-300  px-4 py-2 text-center font-mono text-xl">Client ID</th>
                            <th scope="col" className="border border-gray-300  px-4 py-2 text-center font-mono text-xl">Full Name</th>
                            <th scope="col" className="border border-gray-300  px-4 py-2 text-center font-mono text-xl">Short Name</th>
                            <th scope="col" className="border border-gray-300  px-4 py-2 text-center font-mono text-xl">Product Index</th>
                            <th scope="col" className="border border-gray-300  px-4 py-2 text-center font-mono text-xl">Manufacturer</th>
                            <th scope="col" className="border border-gray-300  px-4 py-2 text-center font-mono text-xl">Quantity of Product Sent</th>
                            <th scope="col" className="border border-gray-300  px-4 py-2 text-center font-mono text-xl">Invoice ID</th>
                            <th scope="col" className="border border-gray-300  px-4 py-2 text-center font-mono text-xl">Date</th>
                            <th scope="col" className="border border-gray-300  px-4 py-2 text-center font-mono text-xl"><FaEdit className="text-2xl" /></th>
                            <th scope="col" className="border border-gray-300  px-4 py-2 text-center font-mono text-xl"><MdAutoDelete className="text-2xl" /></th>
                            <th scope="col" className="border border-gray-300  px-4 py-2 text-center font-mono text-xl"><BsPrinterFill className="text-2xl" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((core, index) => (
                            <tr key={core._id}
                                className={`${index % 2 === 0 ? "bg-orange-100" : "bg-orange-200"} hover:bg-gray-50`}>
                                <td scope="row" className="border border-gray-300  px-4 py-2 text-center text-base" >{core.coresID}</td>
                                <td className="border border-gray-300  px-4 py-2 text-center font-mono text-base outline-none">{core.clientID}</td>
                                <td className="border border-gray-300  px-4 py-2 text-center font-mono text-base outline-none " >{core.fullName}</td>
                                <td className="border border-gray-300  px-4 py-2 text-center font-mono text-base outline-none " >{core.shortName}</td>
                                <td className="border border-gray-300  px-4 py-2 text-center font-mono text-base outline-none " >{core.productIndex}</td>
                                <td className="border border-gray-300  px-4 py-2 text-center font-mono text-base outline-none " >{core.manufacturer}</td>
                                <td className="border border-gray-300  px-4 py-2 text-center font-mono text-base outline-none " >{core.quantityProductsSent}</td>
                                <td className="border border-gray-300  px-4 py-2 text-center font-mono text-base outline-none " >{core.documentID}</td>
                                <td className="border border-gray-300  px-4 py-2 text-center font-mono text-base outline-none " >{core.created_date}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center text-black-500 hover:text-grey-700"> <Link to={`/edit/${core._id}`}>
                                    <CiEdit className="text-2xl" />
                                </Link> </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="text-red-500 hover:text-red-900 " onClick={() => setSelectedItem({ id: core._id, coresID: core.coresID, fullName: core.fullName })}>
                                        <IoTrashBinOutline className="text-xl text-center cursor-pointer" />
                                    </button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <Link to={`/print/${core._id}`}>
                                        <SlPrinter className="text-xl text-center cursor-pointer" />
                                    </Link>
                                </td>
                            </tr>

                        ))}

                    </tbody>
                </table>
                {/* Modal wyświetlany warunkowo */}
                {selectedItem && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <DeleteData id={selectedItem.id} coresID={selectedItem.coresID} fullName={selectedItem.fullName} onClose={() => setSelectedItem(null)} />
                    </div>
                )}
            </div>
        </Fragment>
    )
}