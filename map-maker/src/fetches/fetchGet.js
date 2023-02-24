import axios from "./axiosInstance";

const fetchGet = async (url) => {
    try {
        console.log("In fetchGet with url: ",url);
        const response = await axios.get(url);
        console.log("Fetched data: ", response.data);
        return response
    } catch (e) {
        console.log("Error in fetchGet", e)
        return e.response
    }
}

export default fetchGet;
