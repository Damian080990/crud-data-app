import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { createNewCoreData } from "../helpers";
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";



export const AddNewData = () => {
    const [coreIdValue, setCoreIdValue] = useState("");
    const [clientIdValue, setClientIdValue] = useState("");
    const [fullNameValue, setFullNameValue] = useState("");
    const [shortNameValue, setShortNameValue] = useState("");
    const [productIndexValue, setProductIndexValue] = useState("");
    const [manufacturerValue, setManufacturerValue] = useState("");
    const [quantityProductsSentValue, setQuantityProductsSentValue] = useState("");
    const [documentIdValue, setDocumentIdValue] = useState("");
    const [createdDateValue, setCreatedDateValue] = useState("");

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createNewCoreData,
        onSuccess: () => {
            queryClient.invalidateQueries(['cores']); // Odświeżenie listy po dodaniu
        },
        onError: (error) => {
            console.error("Error:", error);
        }
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        let core = {
            coresID: coreIdValue,
            clientID: clientIdValue,
            fullName: fullNameValue,
            shortName: shortNameValue,
            productIndex: productIndexValue,
            manufacturer: manufacturerValue,
            quantityProductsSent: quantityProductsSentValue,
            documentID: documentIdValue,
            created_date: createdDateValue ? new Date(createdDateValue).toISOString() : null,
        }

        console.log("Sending data:", core); // co jest wysyłane

        mutation.mutate(core);
        navigate("/");

        // Resetowanie formularza
        setCoreIdValue("");
        setClientIdValue("");
        setFullNameValue("");
        setShortNameValue("");
        setProductIndexValue("");
        setManufacturerValue("");
        setQuantityProductsSentValue("");
        setDocumentIdValue("");
        setCreatedDateValue(Date);
    }
    return (
        <Fragment>
            <nav className="navigate flex p-8 w-full justify-center items-center mb-6">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `p-5 rounded-lg font-bold transition-all shadow-md ${isActive ? "bg-orange-500 text-white" : "bg-white text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white"
                        }`
                    }
                >
                    Table Data
                </NavLink>
            </nav>
            <div className="flex justify-center items-center ">
                <div className="content py-10 w-full max-w-lg bg-orange-100 border border-gray-300 shadow-lg rounded-xl">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Add new element</h2>

                        <div className="flex flex-col mb-2">
                            <label className="text-gray-700 font-medium">Core ID: {" "} </label>
                            <input className="py-2 px-2 bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setCoreIdValue(e.target.value)} value={coreIdValue} />
                        </div>

                        <div className="flex flex-col mb-2">
                            <label className="text-gray-700 font-medium">Client ID: {" "} </label>
                            <input className="py-2 px-2 bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setClientIdValue(e.target.value)} value={clientIdValue} /></div>

                        <div className="flex flex-col mb-2">
                            <label className="text-gray-700 font-medium">Full Name: {" "} </label>
                            <input className="py-2 px-2 bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setFullNameValue(e.target.value)} value={fullNameValue} /></div>

                        <div className="flex flex-col mb-2">
                            <label className="text-gray-700 font-medium">Short Name: {" "} </label>
                            <input className="py-2 px-2 bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setShortNameValue(e.target.value)} value={shortNameValue} /></div>

                        <div className="flex flex-col mb-2">
                            <label className="text-gray-700 font-medium">Product Index: {" "} </label>
                            <input className="py-2 px-2 bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setProductIndexValue(e.target.value)} value={productIndexValue} /> </div>

                        <div className="flex flex-col mb-2">
                            <label className="text-gray-700 font-medium">Manufacturer: {" "} </label>
                            <input className="py-2 px-2 bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setManufacturerValue(e.target.value)} value={manufacturerValue} /> </div>

                        <div className="flex flex-col mb-2">
                            <label className="text-gray-700 font-medium">Quantity of Products Sent: {" "} </label>
                            <input className="py-2 px-2 bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setQuantityProductsSentValue(e.target.value)} value={quantityProductsSentValue} /> </div>

                        <div className="flex flex-col mb-2">
                            <label className="text-gray-700 font-medium">Document ID: {" "} </label>
                            <input className="py-2 px-2 bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setDocumentIdValue(e.target.value)} value={documentIdValue} /></div>
                        <div className="flex flex-col mb-2">
                            <label className="text-gray-700 font-medium">Created Date: {" "} </label>
                            <input className="py-2 px-2 bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" type="date" onChange={(e) => setCreatedDateValue(e.target.value)} value={createdDateValue} /></div>

                        <button type="submit" className=" mt-4 py-2 px-2 w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition-all">Submit</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}