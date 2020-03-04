import { Meme } from './meme';
import { User } from './user';

export interface Comment {
    id: string,
    date: Date,
    coment: string,
    author: User,
    meme: Meme
}
