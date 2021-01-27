import { Validator } from '@/presentation/protocols'
import { RequiredMongoIdValidator, ValidatorComposite } from '@/validation/validators'
import { MongoIdValidatorAdapter } from '@/infra/validators'

export const makeLoadOrderByIdValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  validators.push(new RequiredMongoIdValidator('id', new MongoIdValidatorAdapter()))
  return new ValidatorComposite(validators)
}
