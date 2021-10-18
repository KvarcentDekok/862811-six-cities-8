export type User = {
  'avatarUrl': string,
  //'avatar_url'?: string,
  'id': number,
  'isPro': boolean,
  //'is_pro'?: boolean,
  'name': string
}

export type UserServer = Omit<User, 'avatarUrl' | 'isPro'> & {
  'avatar_url': string,
  'is_pro': boolean
}
