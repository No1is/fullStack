import React from 'react';
import entryService from '../services/entries';
import { useState } from 'react';
import { EntryWithoutId, Entry, SickLeave, Discharge, HealthCheckRating, EntryType } from '../types';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Stack, Autocomplete } from '@mui/material';

const initialDischarge = {
    date: '',
    criteria: ''
}

const initialSickLEave = {
    startDate: '',
    endDate: ''
}

interface FormProps {
    id: string;
    toggle: () => void;
    addEntryList: (entry: Entry) => void;
}

const EntryForm = ({ id, toggle, addEntryList }: FormProps) => {
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [specialist, setSpecialist] = useState('')
    const [healthRating, setHealthRating] = useState<HealthCheckRating | ''>('')
    const [diagnosis, setDiagnosis] = useState<string[]>([])
    const [sickLeave, setSickLeave] = useState<SickLeave>(initialSickLEave)
    const [discharge, setDischarge] = useState<Discharge>(initialDischarge)
    const [employer, setEmployer] = useState('')
    const [type, setType] = useState<EntryType | ''>('')

    const typeOptions = [
        {
            type: 'Hospital'
        },
        {
            type: 'HealthCheck'
        },
        {
            type: 'OccupationalHealthcare'
        }
    ]

    const buildEntry = (): EntryWithoutId => {
        const base = {
            date, 
            description,
            specialist,
            ...(diagnosis.length ? { diagnosisCodes: diagnosis } : {})
        }

        if (type === 'HealthCheck') {
            if (healthRating === '') throw new Error('Health check rating is required');
            return { type, ...base, healthCheckRating: healthRating };
        }

        if (type === 'Hospital') {
            if (
                discharge.date === initialDischarge.date &&
                discharge.criteria === initialDischarge.criteria
            ) throw new Error('Discharge is required')
            return { type, ...base, discharge }
        }

        if (type === 'OccupationalHealthcare') {
            const withSickLeave = 
              sickLeave.startDate === initialSickLEave.startDate && 
              sickLeave.endDate === initialSickLEave.endDate 
              ? {}
              : { sickLeave }
            return { type, ...base, employerName: employer, ...withSickLeave }
        }

        throw new Error('Entry Type is required')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const entryData = buildEntry();
            const newEntry = await entryService.create(entryData, id)
            addEntryList(newEntry)
            setDate('')
            setDescription('')
            setSpecialist('')
            setDiagnosis([])
            setHealthRating('')
            setType('')
            setDischarge(initialDischarge)
            setSickLeave(initialSickLEave)
            setEmployer('')
            toggle()
        } catch (error: unknown) {
            console.error(error)
        }
    }

    const typeForm = () => {
        switch (type) {
            case 'Hospital':
                return (
                    <>
                      <TextField
                        label="Discharge Date"
                        type="date"
                        value={discharge.date}
                        onChange={({ target }) => setDischarge({ ...discharge, date: target.value })}
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        label="Discharge Criteria"
                        value={discharge.criteria}
                        onChange={({ target }) => setDischarge({ ...discharge, criteria: target.value })}
                        fullWidth
                      />
                      <Button variant="contained" color="primary" type="submit">
                        Add Entry
                      </Button>
                    </>
                );
            case 'HealthCheck':
                return (
                    <>
                      <FormControl fullWidth>
                        <InputLabel id="rating">Health Check Rating</InputLabel>
                        <Select<HealthCheckRating | null>
                          labelId="rating"
                          value={healthRating}
                          label="Health Rating"
                          onChange={({ target }) => setHealthRating(target.value as HealthCheckRating)}
                        >
                            <MenuItem value={0}>Healthy</MenuItem>
                            <MenuItem value={1}>Low Risk</MenuItem>
                            <MenuItem value={2}>High Risk</MenuItem>
                            <MenuItem value={3}>Critical Risk</MenuItem>
                        </Select>
                      </FormControl>
                      <Button variant="contained" color="primary" type="submit">
                        Add Entry
                      </Button>
                    </>
                )
            case 'OccupationalHealthcare':
                return (
                    <>
                      <TextField
                        label="Employer"
                        value={employer}
                        onChange={({ target }) => setEmployer(target.value)}
                        fullWidth
                      />
                      <InputLabel>Sick Leave</InputLabel>
                      <TextField
                        label="Start Date"
                        type='date'
                        value={sickLeave.startDate}
                        onChange={({ target }) => setSickLeave({ ...sickLeave, startDate: target.value })}
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        label="End Date"
                        type="date"
                        value={sickLeave.endDate}
                        onChange={({ target }) => setSickLeave({ ...sickLeave, endDate: target.value })}
                        InputLabelProps={{ shrink: true }}
                      />
                      <Button variant="contained" color="primary" type="submit">
                        Add Entry
                      </Button>
                    </>
                )
            default:
                return null
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, m:'auto' }}>
            <Stack spacing={2}>
                <TextField
                  label="Date"
                  type="date"
                  value={date}
                  onChange={({ target }) => setDate(target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Description"
                  value={description}
                  onChange={({ target }) => setDescription(target.value)}
                  multiline
                  fullWidth
                />
                <TextField
                  label="Specialist"
                  value={specialist}
                  onChange={({ target }) => setSpecialist(target.value)}
                  fullWidth
                />
                <Autocomplete
                  multiple
                  freeSolo
                  options={[] as string[]}
                  value={diagnosis}
                  onChange={(_, newValue: string[]) => setDiagnosis(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Diagnosis Codes" placeholder='Type and press Enter' />
                  )}
                />
                <FormControl fullWidth>
                    <InputLabel id='type-label'>Entry Type</InputLabel>
                    <Select<EntryType | null>
                      labelId='type-label'
                      value={type}
                      label="Entry Type"
                      onChange={({ target }) => setType(target.value as EntryType)}
                    >
                        {typeOptions.map(t => (<MenuItem key={t.type} value={t.type}>{t.type}</MenuItem>))}
                    </Select>
                </FormControl>
                {typeForm()}
            </Stack>
        </Box>
    )


}


export default EntryForm
