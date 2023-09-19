import { db } from "../database.js"
import jwt from "jsonwebtoken";

const JWT_Secret = 'inikuncirahasia'

// export const loginadminController = (req, res) => {
//     return db.query('select * from admin', (err, result) => {
//         if (err) throw err
//         return res.render('loginadmin', {admin: result })
//     })
// }

export const LoginAdminController = (req, res) => {
    res.render('loginadmin')
}

export const dbloginAdminController = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    db.query(`insert into admin (email, password) values ("${email}","${password}")`)

    db.query(`select * from admin where email = "${email}" and password = "${password}"`, (err, result)=>{
        if(err){
            console.log(err)
            return res.redirect('/loginadmin')
        }

        const pengguna = result[0]
        if (!pengguna) return res.redirect('/loginadmin')

        const token = jwt.sign({
            name : pengguna.name,
            email : pengguna.email,
            password : pengguna.password
        }, JWT_Secret,{expiresIn: '6h'})
        req.session.penggunaToken = token;
        return res.redirect('/adminpage')
    })
}

export const LogoutAdminController = (req, res) => {
    req.session.penggunaToken = undefined
    return res.redirect('/')
}

export const CekAdminController = (req, res, next) => {
    if (!req.session.penggunaToken)
        return res.redirect('/loginadmin')

    jwt.verify(req.session.penggunaToken, JWT_Secret, (err, pengguna) => {
        if (err) {
            console.log(err)
            return res.redirect('/loginadmin')
        }
        req.pengguna = pengguna
        next()
    })
}

export const indexController = (req,res)=>{
    res.render("index")
}

export const aboutController = (req, res) => {
    res.render("about")
}

export const adminpageController = (req, res) => {
    res.render("adminpage")
}

export const borobudurController = (req, res) => {
    res.render("borobudur")
}

// export const detailController = (req, res) => {
//     res.render("detail")
// }

export const gwkController = (req, res) => {
    res.render("gwk")
}

export const homeController = (req, res) => {
    res.render("home")
}

export const jatimparkController = (req, res) => {
    res.render("jatimpark")
}

export const lokasiController = (req, res) => {
    res.render("lokasi")
}

// export const malioboroController = (req, res) => {
//     res.render("malioboro")
// }

export const museumController = (req, res) => {
    res.render("museum")
}

// export const paketController = (req, res) => {
//     res.render("paket")
// }

export const pandawaController = (req, res) => {
    res.render("pandawa")
}

export const tebingController = (req, res) => {
    res.render("tebing")
}

export const tempatController = (req, res) => {
    res.render("tempat")
}

// export const vipController = (req, res) => {
//     res.render("vip")
// }

export const dataController = (req, res) => {
    return db.query('select * from user', (err, result) => {
        if (err) throw err
        return res.render('data', {user: result })
    })
}

export const editController = (req, res) => {
    const id = req.params.id
    return db.query(`select * from user where id = ${id}`, (err, result) => {
        if (err) throw err
        return res.render('edit', {user: result[0] })
    })
}

export const ticketController = (req, res) => {
    db.query('select * from items', (err, items) => {
        if (err) console.log(err)

        db.query('select * from pembukuan order by create_time desc limit 5', (err, pembukuan) => {
            if (err) console.log(err)
            res.render("ticket", {
                pembukuan: pembukuan || [],
                items: items || [],
            })
        })
    })
}

// export const bookingController = (req, res) => {
//     db.query('select * from items', (err, items) => {
//         if (err) console.log(err)

//         db.query('select * from pembukuan order by create_time desc limit 5', (err, pembukuan) => {
//             if (err) console.log(err)
//             res.render("booking", {
//                 pembukuan: pembukuan || [],
//                 items: items || [],
//             })
//         })
//     })
// }

// export const tambahController = (req, res) => {
//     const data = req.body
//     db.query(`insert into items (name) values(?)`, [data.name], (err, result) => {
//         if (err) console.log(err)
//         res.redirect('/booking')
//     })
// }

// export const transaksiController = (req, res) => {
//     const data = req.body
//     db.query(`insert into pembukuan (type, item_id, amount) values(?,?,?)`, [data.type, data.item_id, data.amount], (err, result) => {
//         if (err) {
//             console.log(err)
//             res.redirect('/booking')
//             return
//         }
//         const qty = data.type === 'keluar' ? data.amount * -1 : data.amount
//         db.query(`update items set qty = qty + ? where id = ?`, [qty, data.item_id], (err, result) => {
//             if (err) console.log(err)
//             res.redirect('/booking')
//         });
//     })
// }






