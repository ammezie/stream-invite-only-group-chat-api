'use strict'

const Invite = use('App/Models/Invite')
const User = use('App/Models/User')
const Mail = use('Mail')
const randomString = require('randomstring')

class InviteController {
  async store({ request, response }) {
    let invite = await Invite.findBy('email', request.input('email'))

    if (invite) {
      if (invite.accepted) {
        return response.json('User is already a member')
      } else {
        return response.json('An invite has been sent to user already')
      }
    }

    invite = await Invite.create({
      email: request.input('email'),
      token: randomString.generate()
    })

    const mailBody = `You've been invited to join Chatroom: http://localhost:3000/invites/${invite.token}.`

    await Mail.raw(mailBody, (message) => {
      message
        .to(invite.email)
        .from('chimezie@adonismastery.com')
        .subject('Join Chatroom')
    })

    return response.json('Invite sent')
  }

  async show({ params, response }) {
    const invite = await Invite.findBy('token', params.token)

    if (!invite) {
      return response.status(404).json('Invalid token')
    }

    if (invite.accepted) {
      return response.json('Already a member')
    }

    return response.json(invite)
  }
}

module.exports = InviteController
