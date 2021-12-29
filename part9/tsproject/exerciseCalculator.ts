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

interface CalcInput {
  dailyLog: number[];
  dailyTarget: number;
}

const parseExerciseArguments = (args: string[]): CalcInput => {
  const correctSyntax =
    "Correct syntax: calculateExercises <day1 exercise hrs> <day2 exercise hrs> <day... exercise hrs> <target daily hrs>";

  if (process.argv.length < 4)
    throw new Error(
      "Less than minimum number of arguments specified. " + correctSyntax
    );

  const params = args.slice(2);

  const parsedParams = params.map((arg) => {
    const parsedArg = parseFloat(arg);
    if (isNaN(parsedArg))
      throw new Error(`Argument ${arg} is not a number. ` + correctSyntax);

    if (0 > parsedArg || parsedArg > 24)
      throw new Error(
        `Daily exercise time ${arg} hrs is unrealistic. ` + correctSyntax
      );

    return parsedArg;
  });

  const dailyLog = parsedParams.slice(0, parsedParams.length - 1);
  const dailyTarget = parsedParams[parsedParams.length - 1];

  return { dailyLog, dailyTarget };
};

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

try {
  const { dailyLog, dailyTarget } = parseExerciseArguments(process.argv);
  console.log(exerciseCalculator(dailyLog, dailyTarget));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
