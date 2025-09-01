import { Diagnose } from "../types/types";
import data from '../data/diagnoses'

const getDiagnoses = (): Diagnose[] => {
    return data
}

export default { getDiagnoses }