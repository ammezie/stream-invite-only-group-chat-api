'use strict'

const { StreamChat } = require('stream-chat')
const Env = use('Env')

class TokenController {
  async generate({ request, response }) {
    const client = new StreamChat(
      Env.get('STREAM_API_KEY'),
      Env.get('STREAM_API_SECRET')
    )

    const token = client.createToken(request.input('username'))

    return response.json(token)
  }
}

module.exports = TokenController
