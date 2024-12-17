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
exports.deleteUrl = exports.getUrl = exports.getAllUrl = exports.createUrl = void 0;
const shortUrl_1 = __importDefault(require("../model/shortUrl"));
// /src/controller/shortUrl.ts
const createUrl = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("The full URL is: " + request.body.fullUrl);
        const { fullUrl } = request.body;
        const urlFound = yield shortUrl_1.default.find({ fullUrl });
        if (urlFound.length > 0) {
            response.status(409);
            response.send(urlFound);
        }
        else {
            const shortUrl = yield shortUrl_1.default.create({ fullUrl });
            response.status(201).send(shortUrl);
        }
    }
    catch (error) {
        response.status(500).send({ message: "Something went wrong" });
    }
});
exports.createUrl = createUrl;
const getAllUrl = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrls = yield shortUrl_1.default.find({});
        if (shortUrls.length < 0) {
            response.status(404).send({ message: "Short Urls not found" });
        }
        else {
            response.status(200).send(shortUrls);
        }
    }
    catch (error) {
        response.status(500).send({ message: "Something went wrong" });
    }
});
exports.getAllUrl = getAllUrl;
const getUrl = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.default.findOne({ shortUrl: request.params.id });
        if (!shortUrl) {
            response.status(404).send({ message: "Full Url not found" });
        }
        else {
            shortUrl.clicks++;
            shortUrl.save();
            response.redirect(`${shortUrl.fullUrl}`);
        }
    }
    catch (error) {
        response.status(500).send({ message: "Something went wrong" });
    }
});
exports.getUrl = getUrl;
const deleteUrl = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.default.findByIdAndDelete({ _id: request.params.id });
        if (shortUrl) {
            response.status(204).send({ message: "Requested URL sucessfully deleted" });
        }
    }
    catch (error) {
        response.status(500).send({ message: "Something went wrong" });
    }
});
exports.deleteUrl = deleteUrl;
