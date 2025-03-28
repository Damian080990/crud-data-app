import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

//GET
export const fetchingCoresData = async () => {
    const { data } = await axios.get(`${API_URL}/core`);
    return data;
};

//POST
export const createNewCoreData = async (core) => {
    const { data } = await axios.post(`${API_URL}/core`, core);
    return data;
};

//DELETE
export const deleteCoreData = async ({ id }) => {
    const { data } = await axios.delete(`${API_URL}/core/${id}`);
    return data;
};

//GetthisID
export const fetchCoreById = async (id) => {
    const { data } = await axios.get(`${API_URL}/core/${id}`);
    return data;
};

// PUT
export const updateCoreData = async ({ id, core }) => {
    console.log(`Aktualizuję rekord o ID: ${id}`);
    const { data } = await axios.put(`${API_URL}/core/${id}`, core);
    return data;
};