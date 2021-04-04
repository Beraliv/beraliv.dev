import { POSTS_PER_PAGE } from "../../constants/POSTS_PER_PAGE"

export const getNumberOfPages = (length: number): number =>
  Math.ceil(length / POSTS_PER_PAGE)
