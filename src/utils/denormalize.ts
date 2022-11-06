import { ALEF, ALEF_HAMZA_ABOVE, ALEF_MADDA, HAMZA, HAMZAT, SHADDA } from '../constants/hijaiy'

export function denormalizeShadda(fiil: string) {
  return fiil.split('').reduce((prev, curr, idx, arr) => {
    if (curr === prev.slice(-1)) {
      curr = SHADDA
    }
    return prev + curr
  }, '')
}

export function denormalizeAlefMadda(fiil: string) {
  return fiil.split('').reduce((prev, curr, idx, arr) => {
    if (curr === ALEF) {
      if (HAMZAT.includes(prev.slice(-1))) {
        return prev.slice(0,-1) + ALEF_MADDA
      }
    }
    return prev + curr
  }, '')
}

export function denormalizeHamza(fiil: string) {
  return fiil.split('').reduce((prev, curr, idx, arr) => {
    if (curr === HAMZA) {
      if (idx > 0) {
        curr = ALEF_HAMZA_ABOVE
      }
    }
    return prev + curr
  }, '')
}

export function denormalizeFiil(fiil: string) {
  let result = fiil
  result = denormalizeShadda(result)
  result = denormalizeAlefMadda(result)
  result = denormalizeHamza(result)
  return result
}
