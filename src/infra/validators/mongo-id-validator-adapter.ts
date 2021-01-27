import { MongoIdValidator } from '@/validation/protocols'

import validator from 'validator'

export class MongoIdValidatorAdapter implements MongoIdValidator {
  isMongoId (id: string): boolean {
    return validator.isMongoId(id)
  }
}
