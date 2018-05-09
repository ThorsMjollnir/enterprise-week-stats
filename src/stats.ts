const KCAL_NUTRIENT_ID = 1;

export class NutrientStats {

  readonly averageEnergy: number;
  readonly totalEnergy: number;

  constructor(readonly totalByNutrient: object, readonly averageByNutrient: object) {
    this.totalEnergy = totalByNutrient[KCAL_NUTRIENT_ID];
    this.averageEnergy = averageByNutrient[KCAL_NUTRIENT_ID];
  };
}

export function getNutrientStats(surveys: any[]): NutrientStats {

  let total = {};
  let count = {};

  for (let survey of surveys)
    for (let meal of survey["meals"])

      for (let food of meal["foods"])
        for (let nutrientId in food["nutrients"]) {
          let currentValue = (total[nutrientId] == null) ? 0 : total[nutrientId];
          let currentCount = (count[nutrientId] == null) ? 0 : count[nutrientId];
          total[nutrientId] = currentValue + food["nutrients"][nutrientId];
          count[nutrientId] = currentCount + 1;
        }

  let average = {};

  for (let nutrientId in count)
    average[nutrientId] = total[nutrientId] / count[nutrientId];

  return new NutrientStats(total, average);
}
