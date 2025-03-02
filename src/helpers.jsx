import axios from "axios";
//GET
export const fetchingCoresData = async () => {
    const { data } = await axios.get(`http://localhost:3000/core`);
    return data;
};

//POST
export const createNewCoreData = async (core) => {
    const { data } = await axios.post(`http://localhost:3000/core`, core);
    return data;
};

//DELETE
export const deleteCoreData = async (core) => {
    const { data } = await axios.delete(`http://localhost:3000/core/${id}`, core);
    return data;
};