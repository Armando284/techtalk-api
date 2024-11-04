module.exports = class Validation {
  static #isNull(value, tag) {
    if (value == null) throw new Error(`${tag} is required!`)
  }

  static #isString(value, tag) {
    if (typeof value !== 'string') throw new Error(`${tag} must be a string!`)
  }

  static #isLen(value, tag, min = 0, max = Infinity) {
    const trimed = typeof value === 'string' ? value.trim() : value
    if (trimed.length < min || trimed.length > max) throw new Error(`${tag} length must be larger than ${min} and smaller than ${max}!`)
  }

  static username(_name) {
    const tag = 'User name'
    this.#isNull(_name, tag)
    this.#isString(_name, tag)
    this.#isLen(_name, tag, 3, 16)
  }

  static email(_email) {
    const tag = 'Email'
    this.#isNull(_email, tag)
    this.#isString(_email, tag)
    // at least a@b so 3 characters
    this.#isLen(_email, tag, 3, 64)
  }

  static password(_pass) {
    const tag = 'Password'
    this.#isNull(_pass, tag)
    this.#isString(_pass, tag)
    this.#isLen(_pass, tag, 6, 64)
  }
}