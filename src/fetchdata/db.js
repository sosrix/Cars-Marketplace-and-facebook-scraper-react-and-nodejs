var mysql = require("mysql");

function insertProduct(
  ProductID,
  ProductTitle,
  ProductDescr,
  ProductImg,
  ProductPrice,
  ProductLocation
) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "passwordHERE",
    database: "marketbase",
  });
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO carslisted (ProductID, ProductTitle, ProductDescr, ProductImg, ProductPrice, ProductLocation ) VALUES ?";

    var values = [
      [
        ProductID,
        ProductTitle,
        ProductDescr,
        ProductImg,
        ProductPrice,
        ProductLocation,
      ],
    ];

    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log(
        "Product has been inserted to the DATABASE succesfully: " +
          result.affectedRows
      );
    });
  });
}

module.exports = {
  insertProduct,
};
