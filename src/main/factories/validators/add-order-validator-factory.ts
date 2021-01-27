import { Validator } from '@/presentation/protocols'
import { ArrayValidator, RequiredFieldValidator, ValidatorComposite } from '@/validation/validators'

export const makeArrayValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  validators.push(new RequiredFieldValidator('products'))
  validators.push(new ArrayValidator('products', 1))
  return new ValidatorComposite(validators)
}
