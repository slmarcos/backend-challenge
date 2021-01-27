import { InvalidParamError } from '@/presentation/errors'
import { Validator } from '@/presentation/protocols'
import { MongoIdValidator } from '@/validation/protocols'

export class RequiredMongoIdValidator implements Validator {
  constructor (
    private readonly fieldName: string,
    private readonly mongoIdValidator: MongoIdValidator
  ) { }

  validate (input: any): Error | null {
    const isValid = this.mongoIdValidator.isMongoId(input[this.fieldName])
    return !isValid ? new InvalidParamError(this.fieldName) : null
  }
}
