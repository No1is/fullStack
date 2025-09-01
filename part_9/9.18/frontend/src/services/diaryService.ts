import axios from 'axios'
import type { DiaryEntry, NewDiaryEntry } from '../types/types'
const baseUrl = 'http://localhost:3000/api/diaries'

export const getAll = async ()  => {
    const response = await axios.get<DiaryEntry[]>(baseUrl)
    return response.data
}

export const createNew = async (object: NewDiaryEntry): Promise<DiaryEntry> => {
    const response = await axios.post<DiaryEntry>(baseUrl, object)
    return response.data
}
