import axios from 'axios'
import type { DiaryEntry } from '../types/types'
const baseUrl = 'http://localhost:3000/api/diaries'

export const getAll = async ()  => {
    const response = await axios.get<DiaryEntry[]>(baseUrl)
    return response.data
}
