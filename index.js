import express, { urlencoded } from 'express';
import session from 'express-session';
import { bookingController, shopChartController, transaksiController } from './controllers/checkoutController.js';
import { aboutController, adminpageController, borobudurController, CekAdminController, dataController, dbloginAdminController, editController, gwkController, homeController, indexController, jatimparkController, LoginAdminController, LogoutAdminController, lokasiController, museumController, pandawaController, tebingController, tempatController, ticketController} from './controllers/indexController.js';
import { deleteController, deletehistoryController, deletestokController, edittController } from './controllers/submitController.js';
import { indeController, tambahController, tarikController } from './controllers/transaksiController.js';
import { CekUserController, dbLoginController, dbRegistrasiController, LoginController, LogoutController, RegistrasiController} from './controllers/userController.js';

const app = express();

app.use(urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.static('views/img'))
app.use(express.static('views/vid'))
app.use(session({
    secret: 'inikuncirahasia'
}));

app.set("view engine", "ejs")

// web
app.get("/about", aboutController);
app.get("/adminpage", CekAdminController, adminpageController);
app.get("/borobudur", borobudurController);
app.get("/data", CekAdminController, dataController);
// app.get("/detail", detailController);
app.get("/gwk", gwkController);
app.get("/home", CekUserController, homeController);
app.get("/", indexController);
app.get("/jatimpark", jatimparkController);
app.get("/lokasi", lokasiController);
// app.get("/malioboro", malioboroController);
app.get("/museum", museumController);
// app.get("/paket", paketController);
app.get("/pandawa", pandawaController);
app.get("/tebing", tebingController);
app.get("/tempat", tempatController);
// app.get("/vip", vipController);
app.get('/ticket', CekAdminController, ticketController)
// app.get('/booking', bookingController)
// app.post('/items/tambah', tambahController)
// app.post('/items/transaksi', transaksiController)


// admin
// app.post("/submit", submitController);
app.get("/delete/:id", deleteController);
app.get("/edit/:id", editController);
app.post("/edit/:id", edittController);
app.get("/loginadmin", LoginAdminController);
app.post("/loginadmin", dbloginAdminController);
app.get("/logout", LogoutAdminController);


// user
app.get("/registrasiuser", RegistrasiController);
app.post("/registrasiuser", dbRegistrasiController);
app.get("/loginuser", LoginController);
app.post("/loginuser", dbLoginController);
app.get("/logout", LogoutController);
 

// transaki
app.get ("/booking", CekUserController, shopChartController, bookingController);

// transaksi admin
app.get('/ticket', indeController);
app.post('/items/tambah', tambahController);
app.post('/items/tarik', tarikController);
app.get("/deleteStok/:id", deletestokController);
app.get("/deleteHistory/:id", deletehistoryController );
// app.get ("/updateItem/:id", updateItemController);

// checkout (Transaksi User)
app.post('/items/beli', transaksiController);

app.listen(3000, ()=>{
    console.log("app berjalan")
})