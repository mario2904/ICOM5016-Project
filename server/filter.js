exports.image = function (req, file, cb) {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  if (!file.mimetype.includes('image'))
    cb(new Error('Error: Not an imge file.'))

  // To accept the file pass `true`, like so:
  else
    cb(null, true);

  // You can always pass an error if something goes wrong:
  // cb(new Error('I don\'t have a clue!'))
}
