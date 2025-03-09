import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCoreData } from "../helpers";
import PropTypes from "prop-types";

export const DeleteData = ({ id, fullName, coresID, onClose }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteCoreData,
        onSuccess: () => {
            queryClient.invalidateQueries(['cores']); //odswiezenie tabeli
            onClose(); // Zamykamy modal po usunięciu
        },
        onError: (error) => {
            console.error("Error:", error);
        }
    });

    const handleDelete = () => {
        console.log("Usuwam ID:", id);
        mutation.mutate({ id });
    }

    return (
        <div className="content min-h-screen z-40">
            <div className="px-5 py-5 min-w-3xs flex flex-col flex-wrap justify-center items-center content form w-full max-w-lg bg-orange-100 border border-gray-300 shadow-lg rounded-xl">
                <h3 className="mb-4 ">{`Do you want to delete Core ID: ${coresID} belongs to ${fullName}`}</h3>
                <div className="flex justify-around w-full">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={handleDelete}>Yes</button>
                    <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    )
}

DeleteData.propTypes = {
    id: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    coresID: PropTypes.string.isRequired,
    onClose: PropTypes.func,
}