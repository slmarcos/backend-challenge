export interface LoadProductByName {
  load: (name: string) => Promise<LoadProductByName.Result>
}

export namespace LoadProductByName {
  export type Result = {
    name: string
    price: number
    quantity: number
  }
}
