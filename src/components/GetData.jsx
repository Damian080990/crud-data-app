import { useQuery } from "@tanstack/react-query";
import { fetchingCoresData } from "../helpers";
import { Fragment } from "react";
import { NavLink } from "react-router";


export const GetData = () => {
    const { data, isLoading, error } = useQuery({ queryKey: ['cores'], queryFn: fetchingCoresData });

    if (isLoading) return <p>Loading...</p> //TODO
    if (error) return <p>Error: {error.message}</p> //TODO

    return (
        <Fragment>


            <div className="content">
                <nav className="navigate">
                    <NavLink
                        to="AddNewData"
                        end
                        className={({ isActive }) =>
                            `padding rounded-lg font-bold transition-all shadow-md ${isActive ? "bg-orange-500 text-white" : "bg-white text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white"
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
                            <th scope="col" className="border border-gray-300  px-8 py-5 text-center font-mono text-xl">Cores ID</th>
                            <th scope="col" className="border border-gray-300  px-8 py-5 text-center font-mono text-xl">Client ID</th>
                            <th scope="col" className="border border-gray-300  px-8 py-5 text-center font-mono text-xl">Full Name</th>
                            <th scope="col" className="border border-gray-300  px-8 py-5 text-center font-mono text-xl">Short Name</th>
                            <th scope="col" className="border border-gray-300  px-8 py-5 text-center font-mono text-xl">Product Index</th>
                            <th scope="col" className="border border-gray-300  px-8 py-5 text-center font-mono text-xl">Manufacturer</th>
                            <th scope="col" className="border border-gray-300  px-8 py-5 text-center font-mono text-xl">Quantity of Product Sent</th>
                            <th scope="col" className="border border-gray-300  px-8 py-5 text-center font-mono text-xl">Invoice ID</th>
                            <th scope="col" className="border border-gray-300  px-8 py-5 text-center font-mono text-xl">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((core, index) => (
                            <tr key={core._id}
                                className={`${index % 2 === 0 ? "bg-orange-100" : "bg-orange-200"} hover:bg-gray-50`}>
                                <td scope="row" className="border border-gray-300  px-8 py-5 text-center text-base" >{core.coresID}</td>
                                <td className="border border-gray-300  px-8 py-5 text-center font-mono text-base outline-none">{core.clientID}</td>
                                <td className="border border-gray-300  px-8 py-5 text-center font-mono text-base outline-none " >{core.fullName}</td>
                                <td className="border border-gray-300  px-8 py-5 text-center font-mono text-base outline-none " >{core.shortName}</td>
                                <td className="border border-gray-300  px-8 py-5 text-center font-mono text-base outline-none " >{core.productIndex}</td>
                                <td className="border border-gray-300  px-8 py-5 text-center font-mono text-base outline-none " >{core.manufacturer}</td>
                                <td className="border border-gray-300  px-8 py-5 text-center font-mono text-base outline-none " >{core.quantityProductsSent}</td>
                                <td className="border border-gray-300  px-8 py-5 text-center font-mono text-base outline-none " >{core.documentID}</td>
                                <td className="border border-gray-300  px-8 py-5 text-center font-mono text-base outline-none " >{core.created_date}</td>
                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}