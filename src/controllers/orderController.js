const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

const createOrder = async function (req, res) {
  let data = req.body;
  let userId = data.userId;
  let productId = data.productId;

  if (!userId) {
    return res.send({ msg: "Error 404.. UserId is requird filled" });
  } else if (!productId) {
    return res.send({ msg: "Error 404.. ProductId is requird filled" });
  }

  // handle edgecase of user validation

  let UserId = await userModel.findById(userId);
  if (!UserId) {
    return res.send({
      msg: "Error 404.. User validation failed! Please.. Enter valid UserId",
    });
  }

  // handle edgecase of product validation

  let ProductId = await productModel.findById(productId);
  if (!ProductId) {
    return res.send({
      msg: "Error 404.. Product validation failed! Please.. Enter valid ProductId",
    });
  }

  //Scenario 3

  let bal = 0;
  if (req.headers.isfreeappuser === "true") {
    data.amount = bal;
    data.isfreeappuser = req.headers.isfreeappuser;

    //Scenario 1

  } else if (UserId.balance >= ProductId.price) {
    await userModel.findByIdAndUpdate(
      { _id: userId },
      { $set: { balance: UserId.balance - ProductId.price } }
    );

    data.amount = ProductId.price;
    
 //Scenario 2

  } else {
    res.send({ msg: "Sorry.. You have a insufficient Balance" });
  }

  let savedData = await orderModel.create(data);
  res.send({ msg: savedData });
};

module.exports.createOrder = createOrder;
