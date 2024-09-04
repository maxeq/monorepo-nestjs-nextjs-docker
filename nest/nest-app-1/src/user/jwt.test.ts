const jwt = require("jsonwebtoken");
const token = jwt.sign({ id: "1" }, "asdoasjd9348739", { expiresIn: "1h" });
console.log(token);
