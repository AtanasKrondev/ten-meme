export interface User {
    displayName: string,
    photoURL: string,
    uploads: string[],
    likes: string[],
    favorites: string[],
    comments: string[],
    showNsfw: Boolean,
}

export interface UserUid {
    uid: string,
    email: string,
    displayName: string,
    photoURL: string,
}
