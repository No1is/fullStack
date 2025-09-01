import { Patient } from '../types'
import { useEffect, useState } from 'react'
import { Typography, createTheme, ThemeProvider } from '@mui/material'
import  FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import { useParams } from 'react-router-dom'
import patientService from '../services/patients'

const theme = createTheme({
    typography: {
        fontFamily: '"Spectral"'
    }
})


const PatientDetail = () => {
    const [patient, setPatient] = useState<Patient | null>(null)
    const id = useParams().id
    
    useEffect(() => {
        const fetch = async () => {
            if (id) {
                try {
                    const data = await patientService.getPatient(id);
                    setPatient(data)
                } catch (error) {
                    console.log('error fetching data: ', error)
                    setPatient(null)
                }
            }
        }
        fetch()
    }, [id])

    if (!patient) return null

    const gender = () => {
        switch(patient.gender) {
            case 'male':
                return <MaleIcon color="primary" />
            case 'female':
                return <FemaleIcon color="primary" />
            case 'other':
                return <QuestionMarkIcon color="primary" />
            default:
                return null
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <div style={{ paddingTop: 10 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{patient.name} {gender()}</Typography>
                <div>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                </div>
            </div>
        </ThemeProvider>
    )
}


export default PatientDetail