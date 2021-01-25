import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadProductByName } from '@/domain/use-cases'

export class LoadProductByNameController implements Controller {
  constructor (
    private readonly loadProductByName: LoadProductByName
  ) { }

  async handle (request: LoadProductByNameController.Request): Promise<HttpResponse> {
    await this.loadProductByName.load(request.name)
    return null as unknown as HttpResponse
  }
}

export namespace LoadProductByNameController {
  export type Request = {
    name: string
  }

  export type Result = HttpResponse
}
