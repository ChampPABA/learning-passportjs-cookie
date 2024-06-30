// ชื่อของ Cookie ที่เราจะใช้เก็บ JWT
const COOKIE_NAME = "jwt";

// ฟังก์ชันสำหรับการดึง JWT จาก Cookie **แกะไม่ได้ เพราะว่า มันมี httpOnly อยู่ทำให้ javascript ฝั่ง front แกะแบบนี้ไม่ได้ ต้องส่ง cookie ไปให้หลังบ้านแกะ
// ดังนั้นตัวนี้ getAccessToken เหมือน LocalStorage จะไม่ถูกเรียกใช้
export const getAccessToken = () => {
  const cookies = document.cookie.split(";");
  console.log(cookies);
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === COOKIE_NAME) {
      return value;
    }
  }
  return null;
};

// ฟังก์ชันสำหรับการลบ Cookie เมื่อต้องการ Logout
// ตัวนี้ก็ไม่ได้ใช้ เพราะมัน แก้ไข ด้วย javascript หน้าบ้านไม่ได้ ต้องไปให้หลังบ้านลบ cookie ให้
export const removeAccessToken = () => {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
};
