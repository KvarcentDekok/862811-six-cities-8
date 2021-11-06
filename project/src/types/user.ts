export type User = {
  'avatarUrl': string,
  'id': number,
  'isPro': boolean,
  'name': string
}

export type UserServer = Omit<User, 'avatarUrl' | 'isPro'> & {
  'avatar_url': string,
  'is_pro': boolean
}
