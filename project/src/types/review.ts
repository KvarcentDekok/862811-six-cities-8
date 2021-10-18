import { User, UserServer } from './user';

export type Review = {
  comment: string,
  date: string,
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

export type ReviewServer = Omit<Review, 'user'> & {
  user: UserServer
}
