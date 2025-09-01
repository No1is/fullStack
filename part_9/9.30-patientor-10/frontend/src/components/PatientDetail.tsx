import { Patient, Diagnosis, Entry } from '../types';
import { useEffect, useState } from 'react';
import { Typography, createTheme, ThemeProvider, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import  FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnosis';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EntryForm from './EntryForm';


const theme = createTheme({
    typography: {
        fontFamily: '"Spectral"'
    }
})


const PatientDetail = () => {
    const [patient, setPatient] = useState<Patient | null>(null)
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([])
    const [add, setAdd] = useState(false)
    const [entries, setEntries] = useState<Entry[]>([])
    const id = useParams().id
    
    useEffect(() => {
        const fetch = async () => {
            if (id) {
                try {
                    const p = await patientService.getPatient(id);
                    const d = await diagnosisService.getAll();
                    setDiagnosis(d)
                    setPatient(p)
                    setEntries(p.entries)
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

    const entryType = (e: Entry) => {
        switch(e.type) {
            case 'Hospital':
                return <LocalHospitalIcon color="primary" />;
            case 'OccupationalHealthcare':
                return <><WorkIcon color="primary" /> {e.employerName}</>;
            case 'HealthCheck':
                return <MedicalInformationIcon color="primary" />;
            default:
                return null
        }
    }

    const entryDetails = (e:Entry) => {
        switch(e.type){
            case 'Hospital':
                return <>Discharged: {e.discharge.date} {e.discharge.criteria}</>
            case 'HealthCheck':
                switch(e.healthCheckRating) {
                    case 0:
                        return <FavoriteIcon sx={{ color: 'green' }} />
                    case 1:
                        return <FavoriteIcon sx={{ color: 'yellow '}} />
                    case 2:
                        return <FavoriteIcon sx={{ color: 'orange' }} />
                    case 3:
                        return <FavoriteIcon sx={{ color: 'red' }} />
                    default:
                        return null
                }
            case 'OccupationalHealthcare':
                if (e.sickLeave) {
                    return (
                        <div>
                        Sick Leave:
                        <ul>
                            <li>start: {e.sickLeave?.startDate}</li>
                            <li>end: {e.sickLeave?.endDate}</li>
                        </ul>
                        </div>
                    )
                } 
                return null
            default:
                return null
        }
    }

    const toggle = () => setAdd(add => !add)

    const addEntryList = (entry: Entry) => {
        setEntries(prev => [...prev, entry])
    }

    return (
        <ThemeProvider theme={theme}>
            <div style={{ paddingTop: 20 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{patient.name} {gender()}</Typography>
                <div>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                </div>
                <h3>entries</h3>
                {patient && add? <EntryForm id={patient.id} diagnosisList={diagnosis} toggle={toggle} addEntryList={addEntryList} /> : null}
                <Button variant='contained' onClick={toggle}>
                    {add? 'Cancel' : 'Add Entry'}
                </Button>
                <List>
                    {entries.map(e => (
                        <div key={e.id}>
                            <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <ListItemText 
                                primary={<>{e.date} {entryType(e)}</>}
                                />
                                <ListItemText 
                                  primary={<i>{e.description}</i>}
                                />
                                <ul>
                                    {e.diagnosisCodes?.map(d => (
                                        <li key={d}>{d} {diagnosis?.find(desc => desc.code === d)?.name}</li>
                                    ))}
                                </ul>
                                <ListItemText
                                  primary={entryDetails(e)}
                                  secondary={`Diagnosed by: ${e.specialist}`}
                                />
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
            </div>
        </ThemeProvider>
    )
}


export default PatientDetail