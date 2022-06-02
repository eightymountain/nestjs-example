# Nest.js + Fastify + TypeOrm + Ejs + Prisma + Redis

```text
test/
prisma/
public/
src/
├── core/
│   ├── decorators/
│   │   ├── *.decorator.ts
│   ├── exceptions/
│   │   ├── *.exception.ts
│   ├── filters/
│   │   ├── *.filter.ts
│   ├── guards/
│   │   ├── *.guard.ts
│   ├── interceptors/
│   │   ├── *.interceptor.ts
│   ├── middlewares/
│   │   ├── *.middleware.ts
│   ├── pipes/
│   │   ├── *.pipe.ts
│   ├── types/
│   │   └── *.type.ts
├── config/
│   ├── app/
│   │   ├── config.module.ts
│   │   ├── config.service.ts
│   │   └── config.ts
│   ├── database/
│   │   └── postgres
│   │       ├── config.module.ts
│   │       ├── config.service.ts
│   │       └── config.ts
│   └── redis/
│       ├── config.module.ts
│       ├── config.service.ts
│       └── config.ts
├── providers
│   ├── cache
│   │   └── redis
│   └── database
│       └── postgres
├── module/
│   └── user/
│       ├── dto
│       │   ├── get.users.dto.ts
│       │   ├── update.user.dto.ts
│       │   └── create.user.dto.ts
│       ├── entities(or model)
│       │   └── user.entity.ts(or model.ts)
│       ├── user.types.ts
│       ├── user.controller.ts
│       ├── user.service.ts
│       └── user.module.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```