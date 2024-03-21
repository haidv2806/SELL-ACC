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

async function checkMENU() {
  const result = await db.query("SELECT *  FROM menu");
  let menuIMG = [];
  let menuNAME =[];
  let menuPRICE = [];
  let menuREALPRICE = [];
  result.rows.forEach((img) => {
    menuIMG.push(img.menuimg);
  });
  result.rows.forEach((name) => {
    menuNAME.push(name.menuname);
  });
  result.rows.forEach((price) => {
    menuPRICE.push(price.menuprice);
  });
  result.rows.forEach((realprice) => {
    menuREALPRICE.push(realprice.menurealprice);
  });
  return [menuIMG, menuNAME, menuPRICE, menuREALPRICE];
};




app.get("/", async (req, res) => {
  const [menuIMG,,,] = await checkMENU();
  const [,menuNAME,,] = await checkMENU();
  const [,,menuPRICE,] = await checkMENU();
  const [,,,menuREALPRICE] = await checkMENU();
  res.render("index.ejs", {
    menu_img: menuIMG,
    menu_name: menuNAME,
    menu_price: menuPRICE,
    menu_realprice: menuREALPRICE,
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