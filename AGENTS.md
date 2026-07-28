# แนวทางการทำงานใน Repository

## แผนผังโปรเจกต์

- Repository นี้ประกอบด้วยโปรเจกต์ Node.js สองโปรเจกต์ที่แยกจากกัน โดยไม่มี `package.json` หรือการตั้งค่า workspace ที่ root
- `frontend/` เป็นแอปพลิเคชัน Create React App ที่เขียนด้วย React และ TypeScript
- `backend/` เป็น API ที่ใช้ Express, TypeORM, PostgreSQL และ TypeScript
- `docker-compose.yml` ใช้เริ่ม PostgreSQL, pgAdmin และ backend service
- API client ของ frontend ใช้ `http://localhost:3001/api` เป็นค่าเริ่มต้น และสามารถเปลี่ยนผ่าน `REACT_APP_API_URL`

## ขอบเขตของ Package และ TypeScript

- ใช้ `npm` และ lockfile ภายในโปรเจกต์ที่กำลังแก้ไข
- รันคำสั่ง frontend จาก `frontend/` โดยตั้งใจใช้ TypeScript 4.9.x เพราะ `react-scripts@5` ต้องใช้ toolchain รุ่นนี้
- รันคำสั่ง backend จาก `backend/` ซึ่งใช้ TypeScript toolchain รุ่นใหม่ของตัวเอง
- ห้ามติดตั้ง TypeScript เพียงรุ่นเดียวที่ root เพื่อแทน TypeScript ของทั้งสองโปรเจกต์
- ห้ามสร้าง root workspace หรือเปลี่ยน package manager เว้นแต่งานจะระบุให้ทำ migration ดังกล่าวอย่างชัดเจน

## คำสั่งที่ใช้บ่อย

### Frontend

- ติดตั้ง dependencies: `npm ci`
- เริ่มโหมดพัฒนา: `npm start`
- สร้าง production build: `npm run build`
- รัน test แบบไม่เปิด watch mode: `npm test -- --watchAll=false`

### Backend

- ติดตั้ง dependencies: `npm ci`
- เริ่มโหมดพัฒนา: `npm run dev`
- สร้าง TypeScript build: `npm run build`
- ตรวจ lint: `npm run lint`
- แสดง migration ที่รอดำเนินการ: `npm run migration:show`

ขณะนี้คำสั่ง `npm test` ของ backend เป็นเพียง placeholder ที่จะล้มเหลวเสมอ ห้ามรายงานว่า backend test ผ่านจนกว่าจะเพิ่ม test runner ที่ใช้งานได้จริง

## กฎในการแก้ไข

- ตรวจสอบ working tree ปัจจุบันก่อนแก้ไข และรักษาการเปลี่ยนแปลงอื่นของผู้ใช้ที่ไม่เกี่ยวข้อง
- จำกัดการแก้ไขให้อยู่ในขอบเขตพฤติกรรมที่ผู้ใช้ร้องขอ และหลีกเลี่ยงการ refactor ส่วนอื่นโดยไม่จำเป็น
- ห้าม commit `.env`, credentials, access token, database dump, `dist/` ที่สร้างขึ้น หรือโฟลเดอร์ dependencies
- เมื่อแก้ API endpoint ให้ตรวจสอบ route path, request body, response shape, authentication cookie/header, พฤติกรรม CORS และฟังก์ชัน API ฝั่ง frontend ที่เกี่ยวข้องร่วมกัน
- ทำให้ controller มีขนาดเล็กเท่าที่เหมาะสม วาง validation ไว้ที่ขอบเขตการรับ request และอย่าใส่ persistence logic ใน React component
- เลือกใช้ TypeScript type ที่ชัดเจน หลีกเลี่ยง `any`, non-null assertion และการ cast type แบบกว้าง เว้นแต่มีคำอธิบายด้านความปลอดภัย
- รักษารูปแบบ import และ module convention ที่แต่ละโปรเจกต์ใช้อยู่

## สิ่งที่ต้องตรวจสอบหลังแก้ไข

- แก้เฉพาะ frontend: รัน `npm run build` ใน `frontend/` และรัน frontend test ที่เกี่ยวข้องหากมี
- แก้เฉพาะ backend: รัน `npm run build` และ `npm run lint` ใน `backend/`
- แก้ API contract หรือแก้ทั้ง full stack: ตรวจสอบ build ทั้งสองฝั่ง และทดลอง request ที่ได้รับผลกระทบด้วยตนเองหรือผ่าน Postman collection
- แก้โครงสร้างฐานข้อมูล: ต้องมี migration และตรวจสอบเนื้อหาก่อนรัน
- หากไม่สามารถรันการตรวจสอบใดได้ ให้ระบุสาเหตุที่ชัดเจนแทนการกล่าวอ้างว่าตรวจสอบสำเร็จ

## รายการตรวจสอบสำหรับการ Review

- ยืนยันว่ามีการจัดการ error โดยไม่เปิดเผย secret หรือ stack trace ให้ client
- ยืนยันว่า protected route ตรวจ authentication และ permission ที่ backend ไม่ใช่ตรวจเฉพาะใน UI
- ยืนยันว่า frontend รองรับสถานะ loading, ไม่มีข้อมูล, สำเร็จ และล้มเหลว
- ยืนยันว่า configuration ใหม่มีเอกสารกำกับ และมีค่าเริ่มต้นที่ปลอดภัยหรือตัวอย่าง environment variable
