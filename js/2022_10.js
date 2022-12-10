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
function main() {
    const content = document.getElementById('content');
    const vis = new Splotch(content, 40, 6);
    vis.drawColor = 'green';
    const dataElem = document.getElementById('data');
    const runButton = document.getElementById('run');
    const display = document.getElementById('display');
    if (!display)
        return;
    if (!runButton)
        return;
    runButton.onclick = run;
    function run() {
        return __awaiter(this, void 0, void 0, function* () {
            vis.clear();
            if (display)
                display.innerText = `X Value: 1`;
            const text = dataElem.value;
            if (!text)
                return;
            const lines = text.trim().split('\n').map(line => line.trim());
            let x = 1;
            let c = 0;
            function cycle() {
                return __awaiter(this, void 0, void 0, function* () {
                    const solid = Math.abs(c % 40 - x) <= 1;
                    if (solid) {
                        vis.rect(c % 40, Math.floor(c / 40), 1, 1);
                    }
                    c++;
                    yield new Promise(res => setTimeout(res, 50));
                });
            }
            for (const line of lines) {
                if (line === 'noop') {
                    yield cycle();
                }
                else {
                    yield cycle();
                    yield cycle();
                    x += +line.split(' ')[1];
                    if (display)
                        display.innerText = `X Value: ${x}`;
                }
            }
        });
    }
}
window.onload = main;
