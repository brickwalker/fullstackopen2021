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

export interface CalcInput {
  dailyLog: number[];
  dailyTarget: number;
}

export const parseExerciseArguments = (args: CalcInput): CalcInput => {
  const correctSyntax =
    'Correct POST payload: { "dailyLog": [1,0,2,0,3,0,2.5], "dailyTarget": 2.5 }';

  if (!("dailyLog" in args && "dailyTarget" in args))
    throw new Error("Malformed payload. " + correctSyntax);

  const allEntries = args.dailyLog.concat(args.dailyTarget);

  if (!(allEntries instanceof Array))
    throw new Error("Incorrect data format. " + correctSyntax);

  allEntries.map((entry) => {
    if (isNaN(entry))
      throw new Error(`Entry ${entry} is not a number. ` + correctSyntax);
    if (0 > entry || entry > 24)
      throw new Error(
        `Daily exercise time ${entry} hrs is unrealistic. ` + correctSyntax
      );
  });

  return args;
};

export const exerciseCalculator = (
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
  const ratingDescription = (
    ratings.find((item) => item.rating === rating) as Rating
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
