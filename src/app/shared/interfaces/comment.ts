import { firestore } from 'firebase/app';

export interface Comment {
    comment: string,
    memeId: string
    authorId: string,
    authorName: string,
    authorPhoto: string,
    createdAt: firestore.FieldValue,
}

export interface CommentId {
    comment: string,
    memeId: string,
    authorId: string,
    authorName: string,
    authorPhoto: string,
    createdAt: firestore.Timestamp,
    id: string,
}