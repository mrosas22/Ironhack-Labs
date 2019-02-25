const express        = require('express');
const router         = express.Router();
// Require user model
const Room           = require('../models/room');
const Review         = require('../models/review')


//Create reviews ====> //localhost:3000/reviews/add?id=5c6de4139681fb1757503f20
router.post('/rooms/:id/add-review', isLoggedIn, (req, res, next) =>{
  console.log('The review of the room is: ', req.body)
  const newPost = {
    user   : req.user._id,
    comment: req.body.comment,
    canBeChanged: false
  }
  Review.create(newPost)
    .then(review =>{
      Room.findById(req.params.id)
        .then(foundRoom =>{
          foundRoom.reviews.push(review._id)
          foundRoom.save()
            .then(() =>{
              res.redirect(`/rooms/${foundRoom._id}`);
            })
            .catch(error => next(error))
        })
        .catch(error => next(error))
    })
    .catch(error => console.log('Error while saving review: ', error))
})

//Edit reviews =====> //localhost:3000/reviews/5c705f7e04499d5ee0f276e3/edit?
router.get('/reviews/:id/edit', (req, res, next) =>{
  console.log('The review id is: ', req.params.id);
  Review.findById(req.params.id)
    .then((review) =>{
      res.render('reviews/reviews-edit', {review})
    })
    .catch(error => console.log('Error while editing the review: ', error))
})


function isLoggedIn(req, res, next){
  if(req.user){
    next();
  } else  {
    res.redirect('/login');
  }

}

module.exports = router;