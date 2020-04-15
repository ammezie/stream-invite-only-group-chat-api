'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InviteSchema extends Schema {
  up () {
    this.create('invites', (table) => {
      table.increments()
      table.string('email').notNullable().unique()
      table.string('token').notNullable()
      table.boolean('accepted').defaultTo('0')
      table.timestamps()
    })
  }

  down () {
    this.drop('invites')
  }
}

module.exports = InviteSchema
