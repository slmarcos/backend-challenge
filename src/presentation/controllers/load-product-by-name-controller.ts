import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { LoadProductByName } from '@/domain/use-cases'

export class LoadProductByNameController implements Controller {
  constructor (
    private readonly loadProductByName: LoadProductByName
  ) { }

  async handle (request: LoadProductByNameController.Request): Promise<HttpResponse> {
    try {
      const product = await this.loadProductByName.load(request.name)
      if (!product) {
        return noContent()
      }
      return ok(product)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadProductByNameController {
  export type Request = {
    name: string
  }

  export type Result = HttpResponse
}
