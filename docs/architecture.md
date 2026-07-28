# สถาปัตยกรรมระบบ Admin Dashboard

เอกสารนี้อ้างอิงจากโค้ดปัจจุบันใน `frontend/`, `backend/`, `docker-compose.yml` และ migration `1752300000000-CreateInitialSchema.ts` โดยแสดงเฉพาะส่วนประกอบและความสัมพันธ์ที่พบในโปรเจกต์

## 1. ภาพรวมระบบ

Frontend เป็น Create React App ที่เรียก Backend ผ่าน Axios โดยค่าเริ่มต้นใช้ `http://localhost:3001/api` และส่ง cookie ด้วย `withCredentials: true` ส่วน `docker-compose.yml` ปัจจุบันประกอบด้วย Backend, PostgreSQL และ pgAdmin แต่ยังไม่มี Frontend service

```mermaid
flowchart LR
    User[ผู้ใช้ผ่าน Browser]

    subgraph Frontend[Frontend - React และ TypeScript]
        Router[React Router]
        Layout[AppLayout และ Outlet]
        Pages[Dashboard / Profile / Users / Roles / Products / Orders]
        FeatureAPI[Feature API modules]
        Axios[Axios apiClient<br/>withCredentials: true]

        Router --> Layout
        Layout --> Pages
        Pages --> FeatureAPI
        Layout --> FeatureAPI
        FeatureAPI --> Axios
    end

    subgraph Compose[Docker Compose ปัจจุบัน]
        Backend[Express Backend<br/>port 3001]
        Postgres[(PostgreSQL 16<br/>port 5432)]
        PgAdmin[pgAdmin<br/>port 5050]

        Backend -->|TypeORM| Postgres
        PgAdmin --> Postgres
    end

    User --> Router
    Axios -->|HTTP /api และ JWT cookie| Backend
    User -.->|จัดการฐานข้อมูล| PgAdmin
```

องค์ประกอบสำคัญ:

- Public routes คือ `/login` และ `/register`
- Routes ภายใต้ `AppLayout` คือ Dashboard, Profile, Users, Roles, Products และ Orders
- Backend เปิด API ภายใต้ `/api` และเปิดไฟล์อัปโหลดภายใต้ `/uploads`
- Feature API ของ frontend ติดต่อ `/auth`, `/user`, `/roles`, `/permissions`, `/products` และ `/orders`
- มี `frontend/Dockerfile` แต่ยังไม่ได้เพิ่ม Frontend เป็น service ใน `docker-compose.yml`

## 2. Authentication และ Permission

Frontend ปัจจุบันใช้ state ภายใน `AppLayout` เก็บ `CurrentUser` และยังไม่ได้ใช้ Redux เป็นแหล่งข้อมูล authentication หลัก เมื่อเปิด protected page ตัว `AppLayout` จะเรียก `GET /api/auth/me`; หาก request ล้มเหลวจะนำผู้ใช้ไป `/login`

```mermaid
flowchart TD
    OpenPage[ผู้ใช้เปิด Route]
    RouteType{Route อยู่ภายใต้ AppLayout หรือไม่}

    OpenPage --> RouteType
    RouteType -->|ไม่ใช่: /login หรือ /register| PublicPage[แสดง Public Page]
    RouteType -->|ใช่| LoadUser[AppLayout เรียก GET /api/auth/me]

    LoadUser --> Cookie[Axios ส่ง jwt cookie]
    Cookie --> AuthMiddleware[AuthenticatedMiddleware]
    AuthMiddleware --> Token{มี cookie และ JWT ถูกต้องหรือไม่}

    Token -->|ไม่มีหรือไม่ถูกต้อง| Unauthorized[ตอบ 401]
    Unauthorized --> LoginRedirect[AppLayout redirect ไป /login]

    Token -->|ถูกต้อง| FindUser[ค้นหา User พร้อม Role และ Permissions]
    FindUser --> UserFound{พบ User หรือไม่}
    UserFound -->|ไม่พบ| Unauthorized
    UserFound -->|พบ| CurrentUser[เก็บ CurrentUser ใน AppLayout]
    CurrentUser --> RenderPage[แสดง AppLayout และ Outlet]

    RenderPage --> ApiRequest[Page เรียก Protected API]
    ApiRequest --> ProtectedAuth[AuthenticatedMiddleware]
    ProtectedAuth --> PermissionCheck{Endpoint ใช้ PermissionMiddleware หรือไม่}

    PermissionCheck -->|ไม่ใช้: auth profile / logout / upload| Controller[ทำงานที่ Controller]
    PermissionCheck -->|ใช้| HttpMethod{HTTP method}

    HttpMethod -->|GET| ViewPermission{มี view_name หรือ edit_name หรือไม่}
    HttpMethod -->|POST / PATCH / DELETE| EditPermission{มี edit_name หรือไม่}

    ViewPermission -->|ไม่มี| Forbidden[ตอบ 403 Forbidden]
    EditPermission -->|ไม่มี| Forbidden
    ViewPermission -->|มี| Controller
    EditPermission -->|มี| Controller
```

ขอบเขต Permission ที่พบใน Backend:

| API group | PermissionMiddleware |
| --- | --- |
| `/api/user` | `users` |
| `/api/roles` | `roles` |
| `/api/permissions` | `permissions` |
| `/api/products` | `products` |
| `/api/orders` | `orders` |
| `/api/auth/me`, profile, password และ logout | ตรวจ authentication แต่ไม่ใช้ PermissionMiddleware |
| `/api/uploads` | ตรวจ authentication แต่ไม่ใช้ PermissionMiddleware |

สำหรับชื่อ permission นั้น GET ยอมรับ `view_<name>` หรือ `edit_<name>` ส่วน method อื่นต้องมี `edit_<name>` เช่น `view_users` และ `edit_users`

## 3. Backend Request Flow

Request ทุกตัวผ่าน middleware ระดับแอปก่อนเข้าสู่ `/api` router ส่วน controller บางกลุ่มเรียก service และบางกลุ่มเรียก TypeORM repository โดยตรงตามโค้ดปัจจุบัน

```mermaid
flowchart TD
    Request[HTTP Request]
    Morgan[morgan]
    Json[express.json]
    CookieParser[cookie-parser]
    Cors[CORS พร้อม credentials]

    Request --> Morgan --> Json --> CookieParser --> Cors
    Cors --> PathType{Request path}

    PathType -->|/uploads/*| StaticFiles[express.static uploads]
    PathType -->|/api/*| ApiRouter[apiRouter]
    PathType -->|path อื่น| Fallback[ตอบ ไม่มี api ที่ระบุ]

    ApiRouter --> RouteGroup{Route group}
    RouteGroup --> AuthRoutes[Auth routes]
    RouteGroup --> ResourceRoutes[User / Role / Permission / Product / Order routes]
    RouteGroup --> UploadRoute[Upload route]

    AuthRoutes --> AuthRequired{เป็น register หรือ login หรือไม่}
    AuthRequired -->|ใช่| AuthController[Auth Controller]
    AuthRequired -->|ไม่ใช่| AuthMiddleware[AuthenticatedMiddleware]
    AuthMiddleware --> AuthController

    ResourceRoutes --> ResourceAuth[AuthenticatedMiddleware]
    ResourceAuth --> PermissionMiddleware[PermissionMiddleware]
    PermissionMiddleware --> ResourceController[Resource Controller]

    UploadRoute --> UploadAuth[AuthenticatedMiddleware]
    UploadAuth --> UploadController[Upload Controller]

    AuthController --> AuthService[Auth Service]
    AuthService --> Repository[TypeORM Repository]

    ResourceController -->|User operation บางส่วน| UserService[User Service]
    UserService --> Repository
    ResourceController -->|List users, Roles, Permissions, Products, Orders| Repository

    Repository --> Database[(PostgreSQL)]

    AuthController -. error .-> ErrorHandler[errorHandler]
    ResourceController -. error .-> ErrorHandler
    UploadController -. error .-> ErrorHandler
    ErrorHandler --> ErrorResponse[HTTP Error Response]
```

เส้นทางหลักที่ประกาศใน `apiRouter`:

```text
/api/auth
/api/user
/api/roles
/api/permissions
/api/products
/api/orders
/api/uploads
```

## 4. Database ER Diagram

แผนภาพนี้อ้างอิงจาก TypeORM entities และ initial migration โดยตรง

```mermaid
erDiagram
    ROLE o|--o{ USER : "กำหนดให้ผู้ใช้"
    ROLE ||--o{ ROLE_PERMISSION : "เชื่อม permission"
    PERMISSION ||--o{ ROLE_PERMISSION : "เชื่อม role"
    ORDER_RECORD o|--o{ ORDER_ITEM : "มีรายการ"

    USER {
        int id PK
        varchar firstName
        varchar lastName
        boolean isActive
        varchar email UK
        varchar password
        int role_id FK
    }

    ROLE {
        int id PK
        varchar name
    }

    PERMISSION {
        int id PK
        varchar name
    }

    ROLE_PERMISSION {
        int role_id PK, FK
        int permission_id PK, FK
    }

    PRODUCT {
        int id PK
        varchar title
        text description
        varchar image
        numeric price
    }

    ORDER_RECORD {
        int id PK
        varchar first_name
        varchar last_name
        varchar email
        timestamp created_at
    }

    ORDER_ITEM {
        int id PK
        varchar product_title
        varchar price
        varchar quantity
        int order_id FK
    }
```

ข้อสังเกตจาก schema ปัจจุบัน:

- ตารางจริงของ `ORDER_RECORD` ใช้ชื่อ `order`; ในแผนภาพเปลี่ยนชื่อ node เพื่อให้อ่านง่ายและหลีกเลี่ยงคำสงวน
- `user.role_id` เป็น nullable ใน initial migration ผู้ใช้จึงอาจยังไม่มี Role
- Role และ Permission เชื่อมแบบ many-to-many ผ่านตาราง `role_permission`
- Order และ OrderItem เชื่อมแบบ one-to-many โดย `order_item.order_id`
- Product ยังไม่มี foreign key เชื่อมกับ OrderItem; OrderItem เก็บ `product_title`, `price` และ `quantity` ของตัวเอง
- `order_item.price` และ `order_item.quantity` ถูกกำหนดเป็น `varchar` ใน entity และ migration ปัจจุบัน

## ไฟล์ต้นทางที่ใช้ตรวจสอบ

- `frontend/src/App.tsx`
- `frontend/src/shared/layout/AppLayout.tsx`
- `frontend/src/shared/api/client.ts`
- `frontend/src/features/*/api.ts`
- `backend/src/index.ts`
- `backend/src/routes/*.ts`
- `backend/src/middleware/*.ts`
- `backend/src/controller/*.ts`
- `backend/src/services/*.ts`
- `backend/src/entities/*.ts`
- `backend/src/migrations/1752300000000-CreateInitialSchema.ts`
- `backend/src/configs/data-source.ts`
- `docker-compose.yml`
