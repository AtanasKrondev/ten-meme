import { User } from './user'
import { Comment } from './comment'

export interface Meme {
    id: string,
    date: Date,
    title: string,
    imageUrl: string,
    nsfw: boolean,
    tags: string[],
    author: User,
    comments: Comment[],
}
