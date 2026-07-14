# Database migrations

Migration เริ่มต้นอยู่ที่ `src/migrations/1752300000000-CreateInitialSchema.ts` และครอบคลุม entities ทุกตัวใน `src/entities` รวมทั้ง foreign keys และตาราง `role_permission` สำหรับ Many-to-Many relation

## ใช้งานครั้งแรก

เริ่ม PostgreSQL จากโฟลเดอร์ root ของโปรเจกต์:

```powershell
docker compose up -d postgres
```

จากนั้นเข้า backend และรัน migration:

```powershell
cd backend
npm run migration:run
```

ระบบจะสร้างตาราง `migrations` เพื่อบันทึกว่า migration ใดถูกรันไปแล้ว จึงสามารถเรียก `migration:run` ซ้ำได้อย่างปลอดภัย

## คำสั่งที่ใช้บ่อย

```powershell
# ดูสถานะ migration
npm run migration:show

# รัน migration ที่ยังไม่เคยรัน
npm run migration:run

# ย้อน migration ล่าสุด (มีผลลบ schema/data ที่ migration นั้นสร้าง)
npm run migration:revert

# สร้าง migration จากความต่างระหว่าง entities กับฐานข้อมูล
npm run migration:generate
```

หลังแก้ entity ให้เปลี่ยนชื่อไฟล์และชื่อ class ของ migration ที่ generate จาก `AutoMigration` เป็นชื่อที่สื่อความหมาย แล้วตรวจสอบทั้ง `up()` และ `down()` ก่อนรันทุกครั้ง

## Production

หลัง build แล้วให้รัน migration จาก JavaScript ที่ compile แล้ว:

```powershell
npm run build
node ./node_modules/typeorm/cli.js migration:run -d dist/configs/data-source.js
```

โปรเจกต์ตั้ง `synchronize: false` แล้ว เพื่อไม่ให้ TypeORM แก้ schema อัตโนมัตินอก migration
