"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const response_1 = require("./src/middleware/response");
const errors_1 = require("./src/middleware/errors");
const routes_1 = require("./src/routes/v1/routes");
const body_parser_1 = __importDefault(require("body-parser"));
const swaggerUi = __importStar(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
const crypto_1 = __importDefault(require("crypto"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const initializeExpress = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // @ts-ignore
    app.use((req, res, next) => {
        const csrfToken = generateCSRFToken();
        res.cookie('XSRF-TOKEN', csrfToken);
        res.locals.csrfToken = csrfToken;
        next();
    });
    app.use((0, cors_1.default)());
    const allowedOrigins = [
        'changeverveacademy.com',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://sm-beta-changeverveacademy.com',
    ];
    app.use((0, cors_1.default)({
        origin: function (origin, callback) {
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true, // <-- Add this line
    }));
    const path = require('path');
    console.log(path.join(__dirname, 'public'));
    app.use('/static', express_1.default.static(path.join(__dirname, 'public')));
    app.use(express_1.default.json());
    // app.use(express.urlencoded())
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(response_1.addRespondToResponse);
    // Sentry.init({
    //     dsn: "https://0f9b603297a1473188c6584dd1858f0d@o4504661266333696.ingest.sentry.io/4504661284487168",
    //     integrations: [
    //         new Sentry.Integrations.Http({tracing: true}),
    //         new Tracing.Integrations.Express({app}),
    //     ],
    //     tracesSampleRate: 1.0,
    // });
    app.use(errors_1.handleError);
    (0, routes_1.attachPublicRoutes)(app);
    app.listen(5055, () => {
        console.log(`Server listening  5055`);
    });
});
const initializeApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield initializeExpress();
});
initializeApp();
function generateCSRFToken() {
    return crypto_1.default.randomBytes(100).toString('hex');
}
//# sourceMappingURL=index.js.map