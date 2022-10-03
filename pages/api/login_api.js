import csrf from '../../utils/cerf';

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
let CryptoJS = require("crypto-js");
let jwt = require('jsonwebtoken');

export default async function login(req, res) {
    await csrf(req, res);

    if (req.method === 'POST') {

        async function compareUser() {
            return await prisma.user.findMany({
                where: {
                    password: CryptoJS.SHA256(password).toString(),
                    email: dict['email']
                },
                select: {
                    password: true,
                    email: true,
                    full_name: true,
                    class_name: true
                }
            });
        }

        let dict = req.body;
        let password = dict['password'];

        let user = false;
        try {
            const queryset = await compareUser();
            if (queryset.length === 1) {
                let tokenArgs = {
                    success: true,
                    name: queryset[0]['full_name'],
                    class_name: queryset[0]['class_name'],
                    email: queryset[0]['email']

                }
                let token = jwt.sign({tokenArgs}, 'RFC 3339 [RFC3339]',
                    function (err, token) {
                    return res.status(200).json({message: "valid", server_permit: token});
                }, { expiresIn: '1h' });
                user = true;
            } else {
                user = false;
            }
        } catch
            (err) {
            user = false;
        }
        if (user === false) {
            return res.status(200).json({message: "incorrect username or password"});
        }
        // RDKO3l6qNA2Q4&index=4
    } else {
        return res.status(200).json({});
    }

}