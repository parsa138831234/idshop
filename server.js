const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.post('/submit', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'receipt', maxCount: 1 }
]), (req, res) => {
  const { name, email, dob, country } = req.body;
  const photoPath = req.files['photo'][0].path;
  const receiptPath = req.files['receipt'][0].path;

  const info = `
  سفارش جدید:
  --------------------------
  نام: ${name}
  ایمیل: ${email}
  تولد: ${dob}
  کشور: ${country}
  عکس: ${photoPath}
  رسید: ${receiptPath}
  `;

  console.log(info);
  // بعداً می‌تونیم اینجا EmailJS یا Nodemailer برای ارسال ایمیل اضافه کنیم.

  res.send('اطلاعات شما دریافت شد. کارت حداکثر تا دو روز دیگر به دستتان می‌رسد.');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});