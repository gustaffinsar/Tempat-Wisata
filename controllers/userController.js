import jwt from "jsonwebtoken";
import { db } from "../database.js";

const JWT_Secret = 'inikuncirahasia'

export const RegistrasiController = (req, res) => {
    return res.render('registrasiuser')
}

export const dbRegistrasiController = (req, res) => {
    const nama = req.body.nama
    const email = req.body.email
    const password = req.body.password

    db.query(`insert into user (nama, email, password) values ("${nama}", "${email}", "${password}")`)
    res.redirect('/loginuser')
}

export const LoginController = (req, res) => {
    res.render('loginuser')
}

export const dbLoginController = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    db.query(`select * from user where email = "${email}" and password = "${password}"`, (err, result) => {
        if (err) {
            console.log(err)
            return res.redirect('/loginuser')
        }

        const pengguna = result[0]
        if (!pengguna) return res.redirect('/loginuser')

        const token = jwt.sign({
            nama: pengguna.nama,
            email: pengguna.email,
            password: pengguna.password
        }, JWT_Secret, { expiresIn: '6h' })

        req.session.penggunaToken = token;
        return res.redirect('/home')
    })
}

export const LogoutController = (req, res) => {
    req.session.penggunaToken = undefined
    return res.redirect('/')
}

export const CekUserController = (req, res, next) => {
    if (!req.session.penggunaToken)
        return res.redirect('/loginuser')

    jwt.verify(req.session.penggunaToken, JWT_Secret, (err, pengguna) => {
        if (err) {
            console.log(err)
            return res.redirect('/loginuser')
        }
        req.pengguna = pengguna
        next()
    })
}

