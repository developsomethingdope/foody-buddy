export interface Dish
{
  Id: string,
  Name: string,
  Area: string,
  Category: string,
  Ingredients: string,
  Instructions: string[],
  Image: string,
  IsFavorite: boolean
}