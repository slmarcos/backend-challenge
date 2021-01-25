import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent } from '@/presentation/helpers'
import { LoadProductByName } from '@/domain/use-cases'

export class LoadProductByNameController implements Controller {
  constructor (
    private readonly loadProductByName: LoadProductByName
  ) { }

  async handle (request: LoadProductByNameController.Request): Promise<HttpResponse> {
    const product = await this.loadProductByName.load(request.name)
    if (!product) {
      return noContent()
    }
    return null as unknown as HttpResponse
  }
}

export namespace LoadProductByNameController {
  export type Request = {
    name: string
  }

  export type Result = HttpResponse
}
