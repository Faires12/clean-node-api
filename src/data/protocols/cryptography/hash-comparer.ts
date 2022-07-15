export interface HashComparer {
    compare(input : string, hashed: string) : Promise<boolean>
}