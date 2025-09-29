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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// futejogos-data-script/generateImages.ts
var canvas_1 = require("canvas");
var promises_1 = require("fs/promises");
var path_1 = require("path");
// Caminho para ler os jogadores
var INPUT_PATH = '../futejogos-final/public/jogadores.json';
// Caminho para salvar as imagens geradas
var OUTPUT_DIR = '../futejogos-final/public/jogadores';
function gerarImagensDeCamisa() {
    return __awaiter(this, void 0, void 0, function () {
        var jogadoresRaw, jogadores, countGeradas, _i, jogadores_1, jogador, numeroCamisa, fileName, filePath, width, height, canvas, ctx, buffer, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Iniciando a fábrica de camisas...');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    // 1. Garante que a pasta de saída exista
                    return [4 /*yield*/, promises_1.default.mkdir(OUTPUT_DIR, { recursive: true })];
                case 2:
                    // 1. Garante que a pasta de saída exista
                    _a.sent();
                    return [4 /*yield*/, promises_1.default.readFile(INPUT_PATH, 'utf-8')];
                case 3:
                    jogadoresRaw = _a.sent();
                    jogadores = JSON.parse(jogadoresRaw);
                    if (jogadores.length === 0) {
                        console.warn('Nenhum jogador encontrado em jogadores.json.');
                        return [2 /*return*/];
                    }
                    countGeradas = 0;
                    _i = 0, jogadores_1 = jogadores;
                    _a.label = 4;
                case 4:
                    if (!(_i < jogadores_1.length)) return [3 /*break*/, 7];
                    jogador = jogadores_1[_i];
                    numeroCamisa = jogador.numeroCamisa || '?';
                    fileName = "".concat(jogador.id, ".png");
                    filePath = path_1.default.join(OUTPUT_DIR, fileName);
                    width = 256;
                    height = 256;
                    canvas = (0, canvas_1.createCanvas)(width, height);
                    ctx = canvas.getContext('2d');
                    // --- A ARTE DA CAMISA (Tema "Noite Europeia") ---
                    // Fundo da camisa (azul meia-noite)
                    ctx.fillStyle = '#0E111C';
                    ctx.fillRect(0, 0, width, height);
                    // Cor principal da camisa (cinza escuro)
                    ctx.fillStyle = '#1F2937'; // gray-800
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(width, 0);
                    ctx.lineTo(width, height);
                    ctx.lineTo(width * 0.55, height * 0.9);
                    ctx.lineTo(0, height);
                    ctx.closePath();
                    ctx.fill();
                    // Número da camisa
                    ctx.font = 'bold 100px Poppins, sans-serif'; // Usamos a mesma fonte do site
                    ctx.fillStyle = '#D1D5DB'; // Cor do texto (gray-300)
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(numeroCamisa.toString(), width / 2, height / 2);
                    buffer = canvas.toBuffer('image/png');
                    return [4 /*yield*/, promises_1.default.writeFile(filePath, buffer)];
                case 5:
                    _a.sent();
                    countGeradas++;
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    console.log("\nF\u00E1brica finalizada! ".concat(countGeradas, " imagens de camisas geradas em ").concat(OUTPUT_DIR));
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error('Ocorreu um erro na fábrica de camisas:', error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
gerarImagensDeCamisa();
