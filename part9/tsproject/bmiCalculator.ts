const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightM = heightCm / 100;
  const BMI = weightKg / heightM ** 2;
  let result: string;
  if (40 <= BMI) {
    result = "Obese (Class III)";
  } else if (35 <= BMI && BMI < 40) {
    result = "Obese (Class II)";
  } else if (30 <= BMI && BMI < 35) {
    result = "Obese (Class I)";
  } else if (25 <= BMI && BMI < 30) {
    result = "Overweight (Pre-obese)";
  } else if (18.5 <= BMI && BMI < 25) {
    result = "Normal range";
  } else if (17 <= BMI && BMI < 18.5) {
    result = "Underweight (Mild thinness)";
  } else if (16 <= BMI && BMI < 17) {
    result = "Underweight (Moderate  thinness)";
  } else {
    result = "Underweight (Severe  thinness)";
  }
  return result;
};

console.log(calculateBmi(171, 68));
