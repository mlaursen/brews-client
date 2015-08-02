var BrewedDrink = function(id, name, originalGravity, finalGravity, abv, dateBrewed, primaryFermentationEnd, secondaryFermentationEnd, dateDrinkable, numberOfBottles) {
  this.id = id;
  this.name = name;
  this.originalGravity = originalGravity;
  this.finalGravity = finalGravity;
  this.abv = abv;
  this.dateBrewed = dateBrewed;
  this.primaryFermentationEnd = primaryFermentationEnd;
  this.secondaryFermentationEnd = secondaryFermentationEnd;
  this.dateDrinkable = dateDrinkable;
  this.numberOfBottles = numberOfBottles;
};

BrewedDrink.fromJson = function(json) {
  for(var key in BrewedDrink) {
    if(BrewedDrink.hasOwnProperty(key)) {
      console.log(key);
    }
  }
  return json;
};

module.exports = BrewedDrink;
