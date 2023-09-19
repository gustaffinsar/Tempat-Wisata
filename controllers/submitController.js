import { db } from "../database.js";

// export const submitController = (req, res) => {

//     const email = req.body.email;
//     const password = req.body.password;

//     db.query(`insert into admin (email, password) values('${email}', '${password}')`)
//     res.redirect('/adminpage')
// }

export const deleteController = (req, res) => {

    const id = req.params.id

    db.query(`delete from user where id = ${id}`)
    res.redirect('/data')
}

export const edittController = (req, res) => {

    const id = req.params.id
    const data = req.body
    console.log(data)

    db.query(`update user set nama = "${data.nama}", email = "${data.email}", password = "${data.password}" where id = ${id}`)
    res.redirect('/data')
}

export const deletestokController = (req, res) => {

    const id = req.params.id

    db.query(`delete from items where id = ${id}`)
    res.redirect('/ticket')
}

export const deletehistoryController = (req, res) => {

    const id = req.params.id

    db.query(`delete from pembukuan where id = ${id}`)
    res.redirect('/ticket')
}