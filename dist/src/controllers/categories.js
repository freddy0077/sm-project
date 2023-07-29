"use strict";
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
exports.deleteCategory = exports.updateCategory = exports.addCategory = exports.getCategory = exports.getCategories = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const CategoryHandlers_1 = __importDefault(require("../data/category/CategoryHandlers"));
exports.getCategories = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const categoryHandler = yield CategoryHandlers_1.default.create(data);
    console.log("Body", req.params);
    // const {name} = req.params
    const categories = yield categoryHandler.getAll({});
    res.respond({
        data: categories
    });
}));
exports.getCategory = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const categoryHandler = yield CategoryHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing category id").status(400);
        throw new Error('Missing category id');
    }
    const category = yield categoryHandler.get({ id });
    res.respond({ category });
}));
exports.addCategory = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryData = req.body;
    if (!categoryData) {
        res.status(400).send("Missing category data");
        throw new Error('Missing category data');
    }
    const data = yield DataProvider_1.default.create();
    const categoryHandler = yield CategoryHandlers_1.default.create(data);
    const scope = yield categoryHandler.insert(categoryData);
    res.respond({ scope });
}));
exports.updateCategory = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const categoryHandler = yield CategoryHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing category id or update data").status(400);
        throw new Error('Missing category id or update data');
    }
    const scope = yield categoryHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ scope });
}));
exports.deleteCategory = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const categoryHandler = yield CategoryHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing category id").status(400);
        throw new Error('Missing category id');
    }
    yield categoryHandler.deleteCategory({ id });
    res.respond({ message: 'Category deleted successfully' });
}));
//# sourceMappingURL=categories.js.map