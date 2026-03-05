import { publicApi } from './lib/axios'

export const userServices = {
  /**
   * @param {Object} variables campos do form
   * @param {string} variables.first_name nome do usuário
   * @param {string} variables.last_name sobrenome do usuário
   * @param {string} variables.email email do usuario
   * @param {string} variables.password senha do usuário
   * @param {string} variables.tokens tokens para validação
   * @returns {object}
   */
  signIn: async (variables) => {
    const response = await publicApi.post('/users', {
      first_name: variables.firstName,
      last_name: variables.lastName,
      email: variables.email,
      password: variables.password,
    })
    return {
      first_name: response.data.firstName,
      last_name: response.data.lastName,
      email: response.data.email,
      password: response.data.password,
      tokens: response.data.tokens,
    }
  },
  /**
   * @param {Object} variables campos do form
   * @param {string} variables.first_name primeiro nome
   * @param {string} variables.last_name sobrenome
   * @param {string} variables.email email do usuário
   * @param {string} variables.password senha do usuário
   * @param {string} variables.tokens tokens para validação
   * @returns {object}
   */
  login: async (data) => {
    const response = await publicApi.post('/users/login', {
      email: data.email,
      password: data.password,
    })
    return {
      first_name: response.data.firstName,
      last_name: response.data.lastName,
      tokens: response.data.tokens,
    }
  },
}
