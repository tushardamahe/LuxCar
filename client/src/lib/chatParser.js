export const parseQuery = (text) => {
  const query = text.toLowerCase();

  const result = {};

  const brands = ["bmw", "audi", "mercedes", "toyota", "honda", "land rover"];
  for (let brand of brands) {
    if (query.includes(brand)) {
      result.brand = brand.toUpperCase();
      break;
    }
  }

  const priceMatch = query.match(/(under|below|less than)\s?(\d+)/);
  if (priceMatch) {
    result.maxPrice = Number(priceMatch[2]);
  }

  if (query.includes("tomorrow")) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    result.date = d.toISOString().split("T")[0];
  }

  if (query.includes("today")) {
    result.date = new Date().toISOString().split("T")[0];
  }

  const categories = ["suv", "sedan", "hatchback"];
  for (let cat of categories) {
    if (query.includes(cat)) {
      result.category = cat;
      break;
    }
  }

  return result;
};
