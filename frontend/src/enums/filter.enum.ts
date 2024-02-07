enum Metric {

  Gram = 'g',
  Cup = 'cup',
  Pinch = 'pnch',
  Kilogram = 'kg',
  Liter = 'L',
  Milliliter = 'ml',
  Teaspoon = 'tsp',
  Tablespoon = 'tbsp',
  Piece = 'pcs'

}

enum Difficulty {
  
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'

}

enum DietPref {

  Vegan = 'Vegan',
  Vegetarian = 'Vegetarian',
  GlutenFree = 'Gluten-free',
  DairyFree = 'Dairy-free',
  LowCarb = 'Low-carb',
  Keto = 'Keto'

}

enum MealType {

  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Dessert = 'Dessert',
  Snack = 'Snack'

}

enum CuisineType {

  Italian = 'Italian',
  French = 'French',
  Chinese = 'Chinese',
  Japanese = 'Japanese',
  Indian = 'Indian',
  Mexican = 'Mexican',
  Spanish = 'Spanish',
  Greek = 'Greek',
  Thai = 'Thai',
  MiddleEastern = 'Middle eastern',
  Vietnamese = 'Vietnamese',
  Korean = 'Korean',
  Brazilian = 'Brazilian',
  Caribbean = 'Caribbean',
  African = 'African',
  Russian = 'Russian'

}

enum SearchType {

  AllFilters = 'AllFilters',
  AnyFilter = 'AnyFilter'
  // AllFilters = 'All filters',
  // AnyFilter = 'Any filter'

}


export {
  Metric,
  Difficulty,
  DietPref,
  MealType,
  CuisineType,
  SearchType
}
