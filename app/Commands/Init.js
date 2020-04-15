'use strict'

const { Command } = require('@adonisjs/ace')
const { StreamChat } = require('stream-chat')
const User = use('App/Models/User')
const Env = use('Env')
const Database = use('Database')

class Init extends Command {
  static get signature () {
    return 'init'
  }

  static get description () {
    return 'Initialize channel with admin user'
  }

  async handle (args, options) {
    const user = await User.findOrCreate(
      { username: 'mezie' },
      {
        username: 'mezie',
        email: 'chimezie@adonismastery.com',
        password: 'password',
        is_admin: true
      }
    )

    const client = new StreamChat(
      Env.get('STREAM_API_KEY'),
      Env.get('STREAM_API_SECRET')
    )

    // create the user on Stream Chat with an admin role
    await client.updateUsers([
      {
        id: user.username,
        role: 'admin'
      }
    ])

    // create channel by admin user
    const channel = await client.channel('messaging', 'Chatroom', {
      created_by: { id: user.username }
    })

    // then add the new user as a member
    await channel.addMembers([user.username])

    this.success('Channel initialized')

    // Without the following line, the command will not exit!
    Database.close()
  }
}

module.exports = Init
