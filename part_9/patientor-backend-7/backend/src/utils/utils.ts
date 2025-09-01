import { NewPatient,Gender } from "../types/types";
import { z } from 'zod';


const newEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
})

const toNewPatient = (object: unknown): NewPatient => {
    return newEntrySchema.parse(object);
};

export default toNewPatient;