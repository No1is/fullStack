import axios from "axios";
import { EntryWithoutId, Entry } from "../types";
import { apiBaseUrl } from "../constants";

const create = async (object: EntryWithoutId, id: string) => {
    const response = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, object)

    return response.data
}

export default { create }