const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

const apiRouter = require("./routes/router");
app.use("/api", apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
