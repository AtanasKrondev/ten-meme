import { Meme } from './meme';
import { Comment } from './comment';

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    memes: Meme[],
    comments: Comment[]
}
