import { InvalidParamError } from '@/presentation/errors'
import { Validator } from '@/presentation/protocols'

export class ArrayValidator implements Validator {
  constructor (
    private readonly fieldName: string,
    private readonly min: number
  ) { }

  validate (input: any): Error | null {
    const field = input[this.fieldName]
    if (!Array.isArray(field) || field?.length < this.min) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
