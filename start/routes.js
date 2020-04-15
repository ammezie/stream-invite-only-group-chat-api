'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/login', 'AuthController.login')
Route.get('/auth/user', 'AuthController.me').middleware('auth')
Route.post('/tokens', 'TokenController.generate').middleware('auth')
Route.post('/invites', 'InviteController.store').middleware('auth')
Route.get('/invites/:token', 'InviteController.show')
