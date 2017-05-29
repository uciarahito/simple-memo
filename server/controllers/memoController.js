const Memo = require('../models/memo')
let Helpers = require('../helpers/helpers')
let methods = {}

methods.createMemo = (req, res) => {
  if (req.body.role === "admin" || req.body.role === "user") {
    let decoded = Helpers.checkToken(req.headers.token)
    console.log(decoded);
    let newMemo = new Memo({
      title: req.body.title,
      content: req.body.content,
      user: decoded.id
    })

    newMemo.save((err, record) => {
      if (err) res.json({err})
      console.log('Create memo success');
      console.log(record);
      res.send(record)
    })
  } else {
    res.send('You are not authorized')
  }
}

methods.getAllMemo = (req, res) => {
  if (req.body.role === "admin") {
    Memo.find({})
    .populate('user')
    .exec((err, records) => {
      console.log('get all memo success');
      console.log(records);
      res.send(records)
    })
  } else {
    res.send('You are not authorized')
  }
}

methods.getAllMemoByUser = (req, res) => {
  if (req.body.role === "admin" || req.body.role === "user") {
    let decoded = Helpers.checkToken(req.headers.token)
    Memo.find({})
    .populate('user')
    .exec((err, memos) => {
      console.log('get all memo success');
      console.log(memos);
      let pushData = []
      memos.forEach(memo => {
        console.log(memo.user._id);
        if (memo.user._id == decoded.id) {
          pushData.push(memo)
        }
      })
      res.send(pushData)
      // res.send(memos)
    })
  } else {
    res.send('You are not authorized')
  }
}

methods.getDetailMemo = (req, res) => {
  let decoded = Helpers.checkToken(req.headers.token)
  Memo.findById(req.params.id)
  .populate('user')
  .exec((err, record) => {
    if (record.user._id == decoded.id) {
      console.log('get detail memo success');
      console.log(record);
      res.send(record)
    } else {
      res.send('You are not authorized')
    }
  })
}

methods.editMemo = (req, res) => {
  console.log('mmmmmmmm');
  let decoded = Helpers.checkToken(req.headers.token)
  Memo.findById(req.params.id)
  .exec((err, record) => {
    console.log('get detail memo success');
    console.log(record);
    // console.log(record.user+' *** '+decoded.id);
    if (record.user == decoded.id) {
      Memo.updateOne({
        "_id": record._id
      }, {
        $set: {
          "title": req.body.title,
          "content": req.body.content,
          "user": decoded.id
        }
      })
      .exec((err, result) => {
        console.log('Success');
        res.send(record)
      })
    } else {
      res.send('You are not authorized')
    }
  })
}

methods.deleteMemo = (req, res) => {
  if (req.body.role === "user" || req.body.role === "admin") {
    let decoded = Helpers.checkToken(req.headers.token)
    Memo.findById(req.params.id)
    .populate('user')
    .exec((err, record) => {
      console.log('get detail memo success');
      console.log(record);
      if (record.user._id == decoded.id) {
        Memo.deleteOne({
          "_id": record._id
        })
        .exec((err, result) => {
          res.send(record)
        })
      } else {
        res.send('You are not authorized')
      }
    })
  } else {
    res.send('You are not authorized')
  }
}

module.exports = methods