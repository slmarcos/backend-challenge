export interface AddOrderRepo {
  add: (data: AddOrderRepo.Params) => Promise<AddOrderRepo.Result>
}

export namespace AddOrderRepo {
  export type Params = {}
  export type Result = {}
}
