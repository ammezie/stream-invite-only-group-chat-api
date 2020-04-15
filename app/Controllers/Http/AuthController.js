'use strict'

const User = use('App/Models/User')
const Invite = use('App/Models/Invite')
const Env = use('Env')
const { StreamChat } = require('stream-chat')

class AuthController {
  async register ({ request, auth, response }) {
    const user = await User.create({
      username: request.input('username'),
      email: request.input('email'),
      password: request.input('password')
    })

    const invite = await Invite.findBy('email', user.email)

    invite.accepted = true
    await invite.save()

    const client = new StreamChat(
      Env.get('STREAM_API_KEY'),
      Env.get('STREAM_API_SECRET')
    )

    const channel = await client.channel('messaging', 'Chatroom')
    await channel.addMembers([user.username])

    const { token } = await auth.generate(user)

    return response.json(token)
  }

  async login ({ request, auth, response }) {
    const { token } = await auth.attempt(request.input('email'), request.input('password'))

    return response.json(token)
  }

  async me ({ auth, response }) {
    return response.json(auth.user)
  }
}

module.exports = AuthController
