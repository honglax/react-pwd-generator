let characters = ''
let passwordLength = 0

const setUpperCase = (isUpperCase) => {
  if (isUpperCase) {
    characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  }
  return ''
}

const setLowerCase = (isLowerCase) => {
  if (isLowerCase) {
    characters += 'abcdefghijklmnopqrstuvwxyz'
  }
  return ''
}

const setSymbols = (isSymbols) => {
  if (isSymbols) {
    characters += '!@#$%^&*()<>,.?/[]{}-=_+|/'
  }
  return ''
}

const setNumber = (isNumeric) => {
  if (isNumeric) {
    characters += '0123456789'
  }
  return ''
}

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const passwordCharacters = () => {
  let password = ''
  if (characters.length !== 0) {
    for (let i = 0; i < passwordLength; i++) {
      password += characters[getRandomInteger(0, characters.length - 1)]
    }
    characters = ''
    passwordLength = 0
    return password
  }
}

export const setPasswordLength = (length) => {
  passwordLength = length
  return passwordLength
}

export const generatePassword = (passwordProps, pwdLength) => {
  const { uppercase, lowercase, symbols, numbers } = passwordProps
  setPasswordLength(pwdLength)
  setUpperCase(uppercase)
  setLowerCase(lowercase)
  setSymbols(symbols)
  setNumber(numbers)
  return passwordCharacters()
}

export const copyToClipBoard = (elementRef) => {
  elementRef.select()
  document.execCommand('copy')
}
