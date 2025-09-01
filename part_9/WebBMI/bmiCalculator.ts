export const calculateBmi = (h: number, w: number): string => {
    h = h / 100;
    if (h === 0) throw new Error('height cant be 0');
    let bmi = w / (h**2);
    switch (true) {
        case bmi < 18.5:
            return 'Below range';
        case 18.5 < bmi && bmi < 24.9:
            return 'Normal range';
        case 25 < bmi && bmi < 29.9:
            return 'Over range';
        case bmi > 30:
            return 'obese';
        default:
            throw new Error('values were not numbers')
    }
}