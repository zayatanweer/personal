
// by using middleware i handle edgecase of header validation for user and order

const midValid = function(req, res, next){
    let data = req.body
    let newData = req.headers.isfreeappuser
  
    data["isFreeAppUser"]= (newData)
    if(!newData) return res.send({ msg: "Error 404.. header is mandatory" });  
    next()
}

module.exports.midValid = midValid;
