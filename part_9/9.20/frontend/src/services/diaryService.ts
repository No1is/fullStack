import axios from 'axios'
import type { DiaryEntry, NewDiaryEntry } from '../types/types'
const baseUrl = 'http://localhost:3000/api/diaries'

export const getAll = async ()  => {
    const response = await axios.get<DiaryEntry[]>(baseUrl)
    return response.data
}

export const createNew = async (object: NewDiaryEntry, setMessage: any): Promise<DiaryEntry | undefined>=> {
    try {
        const response = await axios.post<DiaryEntry>(baseUrl, object)
        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data || 'an unknown error occured'
            setMessage(message)
            setTimeout(() => {
                setMessage('')
            }, 5000)
        } else {
            console.log('non axios error: ', error)
            setMessage('an unexpected error occured')
            setTimeout(() => {
                setMessage('')
            }, 5000)
        }
    }
}
