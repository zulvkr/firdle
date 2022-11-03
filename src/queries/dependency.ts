import { default as pkgAxios } from 'axios'

const axios = pkgAxios.create({
  baseURL: 'https://basket.uno.ivanzulfikar.com/firdle',
})

export { axios }
