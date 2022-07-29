const User = require("../../database/models/User");
const customError = require("../../utils/customError");
const Product = require("../../database/models/Product");

const getUserProducts = async (req, res, next) => {
  const { userId } = req;

  try {
    const { products } = await User.findById(userId).populate({
      path: "marks",
      model: Product,
    });

    const count = await User.countDocuments();

    res.status(200).json({
      products,
      totalLocations: Math.ceil(count + 1),
    });
  } catch {
    const error = customError(
      400,
      "Bad request",
      "Wrong parameters to get Data"
    );
    next(error);
  }
};

const deleteProducts = async (req, res, next) => {
  const { userId } = req;
  const { productId } = req.params;

  const product = await Product.findByIdAndDelete(productId);
  if (product) {
    const updatedCollection = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { marks: productId },
      },
      { new: true }
    );

    if (updatedCollection) {
      res.status(200).json({ deleted_location: product });
    }
  } else {
    const error = customError(404, "Bad request", "Product Not Found");
    next(error);
  }
};

module.exports = { getUserProducts, deleteProducts };
