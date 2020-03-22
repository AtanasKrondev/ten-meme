import { firestore } from 'firebase/app';

export interface Meme {
    title: string,
    imageUrl: string,
    nsfw: boolean,
    tags: string[],
    authorId: string,
    authorName: string,
    authorPhoto: string,
    createdAt: firestore.FieldValue,
    likes: number,
}

export interface MemeId {
    title: string,
    imageUrl: string,
    nsfw: boolean,
    tags: string[],
    authorId: string,
    authorName: string,
    authorPhoto: string,
    createdAt: firestore.Timestamp,
    likes: number,
    id: string,
};
