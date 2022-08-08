// Returns the amount of absorbed alcohol in grams.
const alcoholAbsorbed = (abv, volume) => {
  if (abv === 0 || volume === 0) return 0;
  // 1L of alcohol = 800g.
  return abv * (volume / 100) * 8;
};

// Returns the amount of time to reach the the legal threshold in minutes.
const estimatedTime = (alcoholLevel, sex) => {
  // Homme : 0,10g/L à 0,15g/L par heure,
  // Femme : 0,085g/L à 0,10g/L par heure.
  let eliminationSpeed = sex ? 0.125 : 0.092;
  eliminationSpeed /= 60;
  let minute = 0;
  let tmp = alcoholLevel;
  for (minute; tmp > 0.5; minute += 1) tmp -= eliminationSpeed;
  return minute;
};

export default class Stats {
  constructor(alcohol, volume, weight, sex) {
    // String that stores the amount of absorbed alcohol in grams.
    this.alcoholAbsorbed = alcoholAbsorbed(alcohol.abv, volume);
    // Float that stores the diffusion coefficient according to the sex.
    this.diffusionCoef = sex ? 0.7 : 0.6;
    // Float that stores the alcohol level.
    this.alcoholLevel = this.alcoholAbsorbed / (weight * this.diffusionCoef);
    // Int that stores the amount of time to reach the the legal threshold.
    this.estimatedTime = estimatedTime(this.alcoholLevel, sex);
    // Int that stores the alcohol level in %.
    this.alcoholPercent = parseInt((this.alcoholLevel / 0.5) * 100, 10);
  }
}
