const router = require('express').Router()
const { User } = require('../models')

//GET all users
router.get('/users', async function (req, res) {
  const users = await User.find({}).populate('thoughts')
  res.json(users)
})

//GET a single user by id and populated thought and friend data
router.get('/users/:id', async function (req, res) {
  const user = await User.findById(req.params.id).populate('thoughts')
  res.json(user)
})

//POST a new user
router.post('/users', async function (req, res) {
  const user = await User.create(req.body)
  res.json(user)
})
//PUT to update a user by id
router.put('/users/:id', async function (req, res) {
  await User.findByIdAndUpdate(req.params.id, req.body)
  res.sendStatus(200)
})

//DELETE to remove user by id
router.delete('/users/:id', async function (req, res) {
  await User.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})
//POST to add new friend to user's freinds list
router.post('/users/:userId/friends/:friendId', async function (req, res) {
  await User.findByIdAndUpdate(req.params.userId, {$addToSet: { friends: req.params.friendId } })
  res.sendStatus(200)
})

//DELETE to reoed a friend from user's friends list
router.delete('/users/:userId/friends/:friendId', async function (req, res) {
  await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } })
  res.sendStatus(200)
})

module.exports = router