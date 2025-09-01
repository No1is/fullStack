import { NewPatient,Gender, Entry, HealthCheckRating, OccupationalHealthcareEntry, HealthCheckEntry, HospitalEntry } from "../types/types";
import { z } from 'zod';

const BaseEntrySchema = z.object({
    id: z.string(),
    description: z.string(),
    date: z.iso.date(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal('HealthCheck'),
    healthCheckRating: z.enum(HealthCheckRating),
}) satisfies z.ZodType<HealthCheckEntry>;

const DischargeSchema = z.object({
    date: z.iso.date(),
    criteria: z.string(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal('Hospital'),
    discharge: DischargeSchema,
}) satisfies z.ZodType<HospitalEntry>;

const SickLeaveSchema = z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date(),
}).optional();

const OccupationalHealthcareSchema = BaseEntrySchema.extend({
    type: z.literal('OccupationalHealthcare'),
    employerName: z.string(),
    sickLeave: SickLeaveSchema,
}) satisfies z.ZodType<OccupationalHealthcareEntry>;

const EntrySchema = z.union([
    HealthCheckEntrySchema,
    HospitalEntrySchema,
    OccupationalHealthcareSchema,
]) satisfies z.ZodType<Entry>;

const newEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string(),
    entries: z.array(EntrySchema).optional().default([]),
}) satisfies z.ZodType<NewPatient>

const toNewPatient = (object: unknown): NewPatient => {
    return newEntrySchema.parse(object);
};

export default toNewPatient;