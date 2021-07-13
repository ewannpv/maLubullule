const alcoholAbsorbed = (abv, volume) => {
  if (abv === 0 || volume === 0) return 0;
  // 1L of alcohol = 800g.
  return abv * (volume / 100) * 8;
};

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
    this.alcoholAbsorbed = alcoholAbsorbed(alcohol.abv, volume);
    this.diffusionCoef = sex ? 0.7 : 0.6;
    this.alcoholLevel = this.alcoholAbsorbed / (weight * this.diffusionCoef);
    this.estimatedTime = estimatedTime(this.alcoholLevel, sex);
  }
}
