const router = require('express').Router()
const { Thought, Reaction, User } = require('../models')

//GET all thoughts
router.get('/thoughts', async function (req, res) {
  const thoughts = await Thought.find({}).populate('user').populate('reactions')
  res.json(thoughts)
})

//GET single thought by id
router.get('/thoughts/:id', async function (req, res) {
  const thought = await Thought.findById(req.params.id).populate('user').populate('reactions')
  res.json(thought)
})

//POST to create new thought (push crated thoughs id to assocaited user's thought array)
router.post('/thoughts', async function (req, res) {
  const thought = await Thought.create(req.body)
  await User.findByIdAndUpdate(req.body.user, { $push: { thoughts: thought._id } })
  res.json(thought)
})

//PUT to update a thought by id
router.put('/thoughts/:id', async function (req, res) {
  await Thought.findByIdAndUpdate(req.params.id, req.body)
  res.sendStatus(200)
})

//DELETE to remove a thought by its id
router.delete('/thoughts/:id', async function (req, res) {
  await Thought.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

//POST to create a reaction stored in a single thoughts reactions array
router.post('/thoughts/:thoughtsId/reactions', async function (req, res) {
  const reaction = await Reaction.create({
    reactionBody: req.body.reactionBody,
    user: req.body.user_id,
    thought: req.params.thoughtsId
  })
  await Thought.findByIdAndUpdate(req.params.thoughtsId, { $push: { reactions: reaction._id } })
  res.json(reaction)
})

//DELETE to pull and remove a reaction by the reactions reactionId value
router.delete('/thoughts/:thoughtsId/reactions/:reactionId', async function (req, res) {
  await Reaction.findByIdAndDelete(req.params.reactionId)
  await Thought.findByIdAndUpdate(req.params.thoughtsId, { $pull: { reactions: { reactionId: req.params.reactionId } } })
  res.sendStatus(200)
})
module.exports = router