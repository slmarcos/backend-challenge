import { ProductModel } from '@/infra/db/models'

import csv from 'csv-parser'
import fs from 'fs'

export const convertCsvToJson = async () => new Promise<any>((resolve, reject) => {
  const FILE_PATH = './csv/products.csv'
  const result: any = []
  fs.createReadStream(FILE_PATH)
    .pipe(csv())
    .on('data', (data) => result.push({
      name: data.name,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity)
    }))
    .on('end', () => {
      resolve(result)
    })
})

export const populateDatabase = async () => {
  const data = await convertCsvToJson()
  const products = await ProductModel.find({})
  if (products.length === 0) {
    await ProductModel.insertMany(data)
    console.log(`[${new Date().toISOString()}]`, 'Populate database finished with success')
  }
}
