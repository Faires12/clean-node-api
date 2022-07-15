export interface TokenGenerator {
    generate(input : string) : Promise<string>
}