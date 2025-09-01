interface exerciseStats {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (dailyHours: number[], target: number): exerciseStats => {
    let sum = dailyHours.reduce((accumelator, currentItem) => {
        return accumelator + currentItem
    }, 0)
    let avg = sum/dailyHours.length
    let restDays = dailyHours.filter(n => n === 0).length
    let stats = {
        periodLength: dailyHours.length,
        trainingDays: dailyHours.length - restDays,
        success: false,
        rating: 1,
        ratingDescription: '',
        target: target,
        average: avg
    }
    switch(true) {
        case avg <= (target - 0.5):
            return stats = { ...stats, rating: 1, ratingDescription: 'terrible' };
        case (target - 0.5) < avg && avg < target:
            return stats = { ...stats, rating: 2, ratingDescription: 'not to bad but could be better'};
        case avg >= target:
            return stats = { ...stats, rating: 3, ratingDescription: 'excellent!', success: true}
        default:
            throw new Error('invalid daily hours or target provided.')
    }
}


console.log(calculateExercises([3,0,2,4.5,0,2,1], 2))