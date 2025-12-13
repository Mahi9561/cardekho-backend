# Cardekho Backend - AI Guide

**Stack & layout**
- Express 5 + TypeScript + Sequelize/MySQL; legacy mysql2 connector used for startup health check in [src/index.ts](src/index.ts) via [src/config/db.ts](src/config/db.ts) alongside Sequelize instance in [src/models/index.ts](src/models/index.ts).
- Strict 3-layer flow: controllers → services → models. Controllers must never touch DB directly; always call services returning `{ statuscode, response, data }`.

**Request handling pattern**
- Pipeline in controllers: enforce `Content-Type: application/json` with `contentTypeHeaderCheck` → parse via `parseJsonRequestBody` → validate using `validateWithSchema` from [src/utils/input-validator.ts](src/utils/input-validator.ts) and a `validate` schema (see [src/utils/validation-schema/brand-schema.ts](src/utils/validation-schema/brand-schema.ts)).
- On validation failure throw `ClientInputError` (400); `NotFoundError` available for missing resources. Errors bubble to the global handler in [src/index.ts](src/index.ts).

**Auth & routing**
- Public routes mounted first at `/auth` in [src/routes/index.route.ts](src/routes/index.route.ts); all subsequent routes are guarded by `authMiddleware` (JWT `Authorization: Bearer <token>`, fallback secret "mysecretkey" if `JWT_SECRET` unset) from [src/middleware/authMiddleware.ts](src/middleware/authMiddleware.ts).
- Add new routers under [src/routes/](src/routes/) and mount after middleware if protected.

**Service contracts**
- Services return `{ statuscode, response: { message, data? }, data? }`; controllers should `res.status(statuscode).json(serviceResult.response || serviceResult)`.
- Example: [src/service/cars/cars.service.ts](src/service/cars/cars.service.ts) uses `sequelize.query` with `QueryTypes.SELECT` for JOINed car/brand/model/variant data.

**Models & schema**
- Models define `Attributes` + `Input` (Optional PK) interfaces; map camelCase properties to PascalCase DB columns via `field:` (see [src/models/brands.ts](src/models/brands.ts)). `timestamps: false`; audit fields stored explicitly.
- When adding models, register them in [src/models/index.ts](src/models/index.ts) and align column casing.

**Error handling**
- Global error middleware logs and responds with `status/statusCode` and `message`. Services/validators should throw typed errors; avoid sending raw error objects.

**Dev workflow**
- `npm run dev` (nodemon + ts-node), `npm run build` (tsc to dist), `npm start` (run compiled). Ensure `DB_HOST/DB_USER/DB_PASSWORD/DB_NAME/JWT_SECRET` are set; startup exits if DB envs missing.

**Feature template**
- Add schema under [src/utils/validation-schema/](src/utils/validation-schema/), interfaces under [src/utils/interface/](src/utils/interface/), service under [src/service/](src/service/), controller under [src/controllers/](src/controllers/), and route under [src/routes/](src/routes/). Keep auth placement consistent: public before `authMiddleware`, protected after.

**Gotchas**
- JSON bodies only: requests failing `contentTypeHeaderCheck` should be rejected before validation.
- Column casing matters; forgetting `field:` causes runtime column errors.
- JWT secret defaults to a weak hardcoded value; override with env in all non-local contexts.
