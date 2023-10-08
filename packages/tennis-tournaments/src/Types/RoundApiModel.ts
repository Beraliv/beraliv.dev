interface RoundApiModel {
  name: string;
  /* the field is called `round`, but to get rid of tautology, it's renamed to `id` */
  id: number;
  slug: string;
}

export { type RoundApiModel };
