const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

// GET /cards
module.exports.getCards = (_, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

// POST /cards
module.exports.createCard = (req, res, next) => {
  const owner = req.user._id; // grab _id
  const { name, link } = req.body;

  Card.create({
    name, link, owner, likes: [],
  })
    // return data to db
    .then((card) => res.status(201).send(card))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Incorrect data'));
      } else {
        next(new ServerError());
      }
    });
};

// DELETE /cards/:cardId
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Card not found'));
      }
      if (req.user._id === card.owner.toString()) {
        return card.remove()
          .then(() => {
            res.send({ message: 'Card has been deleted' });
          });
      }
      return next(new ForbiddenError('No rights for deleting'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Incorrect Id'));
      } else {
        next(new ServerError());
      }
    });
};

// PUT /cards/:cardId/likes
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((like) => {
      if (!like) {
        next(new NotFoundError('Card not found'));
      } res.send(like);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Incorrect Id'));
      }
      next(err);
    });
};

// DELETE /cards/:cardId/likes
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        throw new NotFoundError('Id not found');
      }
      res.send(like);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Incorrect Id'));
      }
      next(err);
    });
};
