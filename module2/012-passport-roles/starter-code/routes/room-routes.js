const express        = require('express');
const router         = express.Router();
// Require user model
// const User           = require('../models/user');
const Room           = require('../models/room');
const Review         = require('../models/review');
const multer         = require('multer') 
//Add cloud storage middleware
const uploadCloud    = require('../config/upload-setup/cloudinary')

router.get('/', (req, res, next) =>{
  Room.find()
    .then((rooms) =>{
      res.render('rooms/room-list', {rooms});
    })
    .catch((error) =>{
      console.log(error)
    })
  })
//Create routes
router.get("/add", isLoggedIn, (req, res) => {
  res.render("rooms/create-room");
});

router.post('/add', uploadCloud.single('imageUrl'), (req, res, next) => {
  const { name, description } = req.body;
  const imageUrl = req.file.secure_url;
  const owner    = req.user._id;
  const newRoom = new Room ({name, description, imageUrl, owner})
  newRoom.save()
    .then(movie => {
      res.redirect('/rooms');
    })
    .catch(error => {
      console.log(error);
    })
});

//From Library-project
router.get('/rooms', (req, res, next) => {
  Room.find().populate('owner')
  .then(roomsFromDB => {
    roomsFromDB.forEach(oneRoom => {
      // if there's a user in a session:
      if(req.user && oneRoom.owner){
        if(oneRoom.owner.equals(req.user._id)){
          oneRoom.isOwner = true;
        }
      }
    })
    res.render('room-pages/room-list', { roomsFromDB })
  })
})

//Details route =====> localhost:3000/rooms/5c6b88be561f7043c47ad7aa
router.get('/:id', isLoggedIn, (req, res, next) => {
  let roomId = req.params.id;
  if (!/^[0-9a-fA-F]{24}$/.test(roomId)) { 
    return res.status(404).render('not-found');
  }
  Room.findOne({'_id': roomId}).populate('owner')
  .populate({path:'reviews', populate: {path: 'user'}})
    .then(room => {
      if (!room) {
          return res.status(404).render('not-found');
      }
      if(req.user && room.owner){
        if(room.owner.equals(req.user._id)){
          room.isOwner = true;
        }
      }
      //Go through all reviews and check which are created by current user
      Promise.all(room.reviews.filter(singleReview =>{
        if(singleReview.user._id.equals(req.user._id)){
          singleReview.canBeChanged = true;
        }
        return singleReview;
      }))
        .then(() =>{
          res.render("rooms/room-detail", { room })
        })
        .catch(error => next (error))
    })
    .catch (error => next (error))
});

//Edit route =====> //localhost:3000/rooms/5c6b88be561f7043c47ad7aa/edit
router.get('/:id/edit', (req, res, next) => {
  Room.findOne({_id: req.params.id})
    .then((room) => {
      res.render("rooms/room-edit", {room});
    })
    .catch((error) => {
      console.log(error);
    })
});

//POST /rooms/5c6b88be561f7043c47ad7aa/edit 
router.post('/:id/edit', uploadCloud.single('imageUrl'), (req, res, next) => {
  const {name, description} = req.body;
  // console.log('the image file is: ', req.file)
  Room.findByIdAndUpdate(req.params.id, {
    name        : name,
    description : description,
    imageUrl    : req.file.secure_url,
    owner       : req.user._id
  })
    .then((room) =>{
      res.redirect(`/rooms/${req.params.id}`);
    })
    .catch((error) =>{
      console.log(error);
    })
})

//Delete route =====> //localhost:3000/rooms/5c6b88be561f7043c47ad7aa/delete
router.post('/:id/delete', (req, res, next) =>{
  console.log('The deleted room is: ', req.params.id)
  Room.findByIdAndDelete({'_id': req.params.id})
    .then(room =>{
      res.redirect('/rooms')
    })
    .catch(error => console.log('error while deleting the room: ', error))
})

//Create reviews ====> //localhost:3000/rooms/reviews/add?id=5c6de4139681fb1757503f20
// router.post('/reviews/add/:id', isLoggedIn, (req, res, next) =>{
//   console.log('The review of the room is: ', req.body)
//   const newPost = {
//     user   : req.user._id,
//     comment: req.body.comment,
//     canBeChanged: false
//   }
//   Review.create(newPost)
//     .then(review =>{
//       Room.findById(req.params.id)
//         .then(foundRoom =>{
//           foundRoom.reviews.push(review._id)
//           foundRoom.save()
//             .then(() =>{
//               res.redirect(`/rooms/${foundRoom._id}`);
//             })
//             .catch(error => next(error))
//         })
//         .catch(error => next(error))
//     })
//     .catch(error => console.log('Error while saving review: ', error))
// })

function isLoggedIn(req, res, next){
  if(req.user){
    next();
  } else  {
    res.redirect('/login');
  }

}

module.exports = router;



