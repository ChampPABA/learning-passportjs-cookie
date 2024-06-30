const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// ตั้งค่า GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8888/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // ตรวจสอบ user ถูกเก็บในฐานข้อมูลอยู่แล้วรึเปล่า
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        // ถ้า user ไม่มีอยู่ในฐานข้อมูล ให้สร้าง user ใหม่
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails[0].value,
              name: profile.displayName,
              googleId: profile.id,
              picture: profile.photos[0].value,
            },
          });
        } else {
          // อัปเดตรูปโปรไฟล์หากมีการเปลี่ยนแปลง
          user = await prisma.user.update({
            where: { googleId: profile.id },
            data: { picture: profile.photos[0].value },
          });
        }

        // สร้าง JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        done(null, { user, token });
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// route สำหรับการเริ่มการยืนยันตัวตนด้วย Google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// route Callback หลังจากยืนยันตัวตนเสร็จสิ้น
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    // ส่ง JWT ใน Cookie
    res.cookie("jwt", req.user.token, {
      httpOnly: true, // ป้องกันไม่ให้เกิด XSS คือ ห้ามเขียน JS เพื่อขโมย cookie
      secure: false, // ถ้า true จะเป็นการส่งผ่าน https
      maxAge: 30 * 24 * 60 * 60 * 1000, // อายุของ cookie sync กับ jwt จะดีมาก (Best Practice)
    }); // ถ้าทดสอบ set secure: false เดี๋ยวจะเคร่งเกิน
    res.redirect("http://localhost:5173"); // redirect ไปที่ front เดี๋ยวค่อยเอาไปใส่ใน env
  }
);

// route สำหรับตรวจสอบ JWT และส่งข้อมูล authUser กลับ
app.get("/auth/user", async (req, res) => {
  const accessToken = req.cookies.jwt;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    const authUser = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!authUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(authUser);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// route สำหรับ logout และลบ JWT cookie
app.post("/auth/logout", (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: false,
    maxAge: 0, // ตั้งค่าให้หมดอายุทันที
  });
  res.json({ message: "Logout successful" });
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
