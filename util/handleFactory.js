const AppError = require('./appError');
const catchAsync = require('./catchAsync');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('Doc not found', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('Doc not found', 404));
    }

    res.status(201).json({
      status: 'success',
      data: { doc },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { doc: newDoc },
    });
  });

exports.getOne = (Model, populateOpt) =>
  catchAsync(async (req, res, next) => {
    const modelId = req.params.id;

    let query = Model.findById(modelId);

    if (populateOpt) query = query.populate(populateOpt);

    const doc = await query;

    if (!doc) {
      return next(new AppError(`No Document found with this ID`, 404));
    }
    res.status(200).send({
      status: 'success',
      data: { doc },
    });
  });
