import { NewPatient,Gender } from "../types/types";
import { z } from 'zod';

const EntrySchema = z.object({})

const newEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string(),
    entries: z.array(EntrySchema)
})

const toNewPatient = (object: unknown): NewPatient => {
    return newEntrySchema.parse(object);
};

export default toNewPatient;