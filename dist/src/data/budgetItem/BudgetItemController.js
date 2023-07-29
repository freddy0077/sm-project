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
exports.create = exports.deleteBudgetItem = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const BudgetItemData_1 = __importDefault(require("./BudgetItemData"));
const get = (budgetItems) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return budgetItems.get(input);
});
exports.get = get;
const getAll = (budgetItems) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return budgetItems.getAll(input);
});
exports.getAll = getAll;
const update = (budgetItems) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return budgetItems.update(input);
});
exports.update = update;
const insert = (budgetItems) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return budgetItems.insert(input);
});
exports.insert = insert;
const deleteBudgetItem = (budgetItems) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return budgetItems.deleteBudgetItem(input);
});
exports.deleteBudgetItem = deleteBudgetItem;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const budgetItems = yield BudgetItemData_1.default.create(data);
        return {
            get: (0, exports.get)(budgetItems),
            getAll: (0, exports.getAll)(budgetItems),
            update: (0, exports.update)(budgetItems),
            insert: (0, exports.insert)(budgetItems),
            deleteBudgetItem: (0, exports.deleteBudgetItem)(budgetItems),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=BudgetItemController.js.map