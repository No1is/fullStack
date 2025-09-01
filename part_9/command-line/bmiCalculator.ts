interface BmiVals {
    val1: number;
    val2: number;
}

const parseArgs = (args: string[]): BmiVals => {
    if (args.length < 4) throw new Error('not enough arguments');
    if (args.length > 4) throw new Error('too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            val1: Number(args[2]),
            val2: Number(args[3])
        }
    } else {
        throw new Error('provided values are not numbers');
    }
}

const calculateBmi = (h: number, w: number): string => {
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

try {
    const { val1, val2 } = parseArgs(process.argv);
    console.log(calculateBmi(val1, val2));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
        errorMessage += error.message
    }
    console.log(errorMessage)
}