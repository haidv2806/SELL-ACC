import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Haidv2806",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let menuIMG = [];
// let rac =[];

// const result = await db.query('SELECT menuimg FROM menu', (err,res) =>{
//   if (err) {
//     console.error("Error executing query", err.stack);
//   } else {
//     menuIMG = res.rows;
//     console.log(menuIMG);
//     JSON.stringify(menuIMG);
//     rac = menuIMG.menuimg;
//     console.log(rac);
//   }
// })

async function checkIMG() {
  const result = await db.query("SELECT menuimg FROM menu");
  let menuIMG = [];
  let rac = [];
  result.rows.forEach((img) => {
    menuIMG.push(img.menuimg);
  });
  console.log(menuIMG);
  return menuIMG;
};




app.get("/", async (req, res) => {
  const menuIMG = await checkIMG();
  res.render("index.ejs", {
    menu_img: menuIMG,
  });
});
app.post("/add", async (req, res) =>{
 
})

app.post("/remove", async (req, res) =>{
  
})

app.post("/delete", async (req, res) =>{
 
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});