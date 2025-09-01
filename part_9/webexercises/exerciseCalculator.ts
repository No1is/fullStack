export interface exerciseStats {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface exerciseVals {
    val1: number[];
    val2: number;
}

const parseArguments = (args: string[]): exerciseVals => {
    if (args.length < 4) throw new Error('not enough arguments');
    const hours = args.slice(3).map(Number);

    if (!isNaN(Number(args[2] && !hours.some(n => Number.isNaN(n))))) {
        return {
            val1: hours,
            val2: Number(args[2])
        };
    } else {
        throw new Error('provided arguments are not numbers and array of numbers');
    }
};



export const calculateExercises = (dailyHours: number[], target: number): exerciseStats => {
    const sum = dailyHours.reduce((accumelator, currentItem) => {
        return accumelator + currentItem;
    }, 0);
    const avg = sum/dailyHours.length;
    const restDays = dailyHours.filter(n => n === 0).length;
    let stats = {
        periodLength: dailyHours.length,
        trainingDays: dailyHours.length - restDays,
        success: false,
        rating: 1,
        ratingDescription: '',
        target: target,
        average: avg
    };
    switch(true) {
        case avg <= (target - 0.5):
            return stats = { ...stats, rating: 1, ratingDescription: 'terrible' };
        case (target - 0.5) < avg && avg < target:
            return stats = { ...stats, rating: 2, ratingDescription: 'not to bad but could be better'};
        case avg >= target:
            return stats = { ...stats, rating: 3, ratingDescription: 'excellent!', success: true};
        default:
            throw new Error('invalid daily hours or target provided.');
    }
};


try {
    const { val1, val2 } = parseArguments(process.argv);
    console.log(calculateExercises(val1, val2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    };
    console.log(errorMessage);
}
