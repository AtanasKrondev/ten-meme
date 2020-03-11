export interface Meme {
    title: string,
    imageUrl: string,
    nsfw: boolean,
    tags: string[],
    authorId: string,
}

export interface MemeId extends Meme {
    id: string,
    displayName: string,
    photoURL: string
};
