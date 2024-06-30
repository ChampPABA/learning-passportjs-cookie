การทำงานของโปรเจกต์:
User เข้าหน้าเว็บ: User เข้ามาที่หน้าแรกของแอปพลิเคชัน
User กดปุ่ม login ด้วย Google: User กดปุ่ม "Login with Google" และ browser จะรีไดเรกต์ไปที่หน้า OAuth ของ Google
Google OAuth: User ทำการอนุญาตให้เข้าถึงข้อมูลของ Google
Callback URL: Google รีไดเรกต์กลับไปที่ URL callback บนเซิร์ฟเวอร์ของคุณ
Server ตรวจสอบข้อมูลผู้ใช้: เซิร์ฟเวอร์ตรวจสอบข้อมูลผู้ใช้ ถ้ายังไม่มีในฐานข้อมูลจะทำการสร้างใหม่ และสร้าง JWT ส่งกลับไปในรูปแบบ cookie
Frontend ดึงข้อมูลผู้ใช้: Frontend ใช้ Redux Toolkit เพื่อดึงข้อมูลผู้ใช้จากเซิร์ฟเวอร์และเก็บไว้ใน Redux store
แสดงข้อมูลผู้ใช้: ข้อมูลผู้ใช้จะถูกแสดงผลบนหน้าเว็บ
User กดปุ่ม Logout: User กดปุ่ม "Logout" และคำขอจะถูกส่งไปยังเซิร์ฟเวอร์เพื่อลบ cookie JWT

Flow: https://app.diagrams.net/#G1-HLtpAuJp9HSNJyYTc5Q04WavszhV9m8#%7B%22pageId%22%3A%22IHpg0ln0ENqTyYSeXSjx%22%7D
