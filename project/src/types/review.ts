import { User } from './user';

export type Review = {
  comment: string,
  date: Date,
  id: number,
  rating: number,
  user: User
}

export type Rating = {
  name: string,
  value: string
}

export type FormControls = {
  rating: string,
  review: string
}
