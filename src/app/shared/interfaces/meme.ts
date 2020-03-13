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
    id: string,
};
