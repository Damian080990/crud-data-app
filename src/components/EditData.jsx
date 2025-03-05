import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate, useParams } from "react-router"
import { fetchCoreById, updateCoreData } from "../helpers";
import { Fragment, useEffect, useState } from "react";

export const EditData = () => {
    const [coreIdEditedValue, setCoreIdEditedValue] = useState("");
    const [clientIdEditedValue, setClientIdEditedValue] = useState("");
    const [fullNameEditedValue, setFullNameEditedValue] = useState("");
    const [shortNameEditedValue, setShortNameEditedValue] = useState("");
    const [productIndexEditedValue, setProductIndexEditedValue] = useState("");
    const [manufacturerEditedValue, setManufacturerEditedValue] = useState("");
    const [quantityProductsSentEditedValue, setQuantityProductsSentEditedValue] = useState("");
    const [documentIdEditedValue, setDocumentIdEditedValue] = useState("");
    const [createdDateEditedValue, setCreatedDateEditedValue] = useState("");

    const mutation = useMutation({
        mutationFn: updateCoreData,
        onSuccess: () => {
            queryClient.invalidateQueries(['cores']);
            queryClient.invalidateQueries(['cores', id]); // Odśwież pojedynczy rekord
        },
        onError: (error) => {
            console.error("Error:", error);
        }
    });
    // Pobierz ID z parametrów ścieżki
    const { id } = useParams();

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Pobieranie danych dla konkretnego ID
    const { data, isLoading, error } = useQuery({
        queryKey: ['cores', id],
        queryFn: () => fetchCoreById(id), // Pobranie danych dla konkretnego ID
        enabled: !!id, // Zapytanie wykona się tylko, jeśli id istnieje
    });

    //ustawienie wartości po pobraniu danych


    useEffect(() => {
        //pobranie wartości do pol z formularza - [data] - wazne, zeby nie bylo infiniteloop
        if (data) {
            setCoreIdEditedValue(data?.coresID || "");
            setClientIdEditedValue(data?.clientID || "");
            setFullNameEditedValue(data?.fullName || "");
            setShortNameEditedValue(data?.shortName || "");
            setProductIndexEditedValue(data?.productIndex || "");
            setManufacturerEditedValue(data?.manufacturer || "");
            setQuantityProductsSentEditedValue(data?.quantityProductsSent || "");
            setDocumentIdEditedValue(data?.documentID || "");
            setCreatedDateEditedValue(data?.created_date || "");
        }
    }, [data])



    if (isLoading) return <p>Loading...</p> //TODO
    if (error) return <p>Error: {error.message}</p> //TODO
    //todo przerobić listę na formularz i dokończyć




    const handleSubmit = (event) => {
        event.preventDefault();

        let updatedData = {
            coresID: coreIdEditedValue,
            clientID: clientIdEditedValue,
            fullName: fullNameEditedValue,
            shortName: shortNameEditedValue,
            productIndex: productIndexEditedValue,
            manufacturer: manufacturerEditedValue,
            quantityProductsSent: quantityProductsSentEditedValue,
            documentID: documentIdEditedValue,
            created_date: createdDateEditedValue,
        }

        console.log(updatedData)
        mutation.mutate({ id, updatedData });

        navigate("/");

    }

    return (
        <Fragment>
            <nav className="navigate">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `padding rounded-lg font-bold transition-all shadow-md ${isActive ? "bg-orange-500 text-white" : "bg-white text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white"
                        }`
                    }
                >
                    Table Data
                </NavLink>
            </nav>
            <div className="flex justify-center items-center">
                <div className="content form w-full max-w-lg bg-orange-100 border border-gray-300 shadow-lg rounded-xl">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold text-center text-gray-800">Core Detail</h2>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Core ID: {" "} </label>
                            <input className=" inputClass bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setCoreIdEditedValue(e.target.value)} value={coreIdEditedValue} />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Client ID: {" "} </label>
                            <input className="inputClass bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setClientIdEditedValue(e.target.value)} value={clientIdEditedValue} />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Full Name: {" "} </label>
                            <input className="inputClass bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setFullNameEditedValue(e.target.value)} value={fullNameEditedValue} />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Short Name: {" "} </label>
                            <input className="inputClass bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setShortNameEditedValue(e.target.value)} value={shortNameEditedValue} />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Product Index: {" "} </label>
                            <input className="inputClass bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setProductIndexEditedValue(e.target.value)} value={productIndexEditedValue} />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Manufacturer: {" "} </label>
                            <input className="inputClass bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setManufacturerEditedValue(e.target.value)} value={manufacturerEditedValue} />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Quantity of product sent: {" "} </label>
                            <input className="inputClass bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setQuantityProductsSentEditedValue(e.target.value)} value={quantityProductsSentEditedValue} />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Document ID: {" "} </label>
                            <input className="inputClass bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setDocumentIdEditedValue(e.target.value)} value={documentIdEditedValue} />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Created Date: {" "} </label>
                            <input className="inputClass bg-orange-50 w-3xs p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500" onChange={(e) => setCreatedDateEditedValue(e.target.value)} value={createdDateEditedValue} />
                            <button type="submit" className="inputClass w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition-all">Save changes</button>
                        </div>

                    </form>

                </div>
            </div>
        </Fragment >
    )
}