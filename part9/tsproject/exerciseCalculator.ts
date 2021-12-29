interface Rating {
  rating: number;
  ratingDescription: string;
}

interface ExerciseResult extends Rating {
  totalDays: number;
  trainingDays: number;
  targetDailyHours: number;
  avgDailyHours: number;
  isTargetReached: boolean;
}

const ratings: Rating[] = [
  { rating: 1, ratingDescription: "ramp it up" },
  { rating: 2, ratingDescription: "could be better, could be worse" },
  { rating: 3, ratingDescription: "spot on" },
];

const exerciseCalculator = (
  dailyLog: number[],
  dailyTarget: number
): ExerciseResult => {
  const totalDays = dailyLog.length;
  const trainingDays = dailyLog.filter((hours) => hours > 0).length;
  const targetDailyHours = dailyTarget;
  const totalHours = dailyLog.reduce((prev, cur) => prev + cur, 0);
  const avgDailyHours = totalHours / totalDays;
  const isTargetReached = avgDailyHours >= targetDailyHours;
  const ratio = avgDailyHours / targetDailyHours;
  const rating = isTargetReached ? 3 : ratio > 0.8 ? 2 : 1;
  const ratingDescription = ratings.find(
    (item) => item.rating === rating
  ).ratingDescription;
  return {
    totalDays,
    trainingDays,
    targetDailyHours,
    avgDailyHours,
    isTargetReached,
    rating,
    ratingDescription,
  };
};

const dailyLog = [3, 0, 2, 4.5, 0, 3, 1];
const dailyTarget = 2;

console.log(exerciseCalculator(dailyLog, dailyTarget));
