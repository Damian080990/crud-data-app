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