
function main(){
    const content = document.getElementById('content');
    const vis = new Splotch(content, 40, 6);
    vis.drawColor = 'green';
    const dataElem = document.getElementById('data') as HTMLInputElement;
    const runButton = document.getElementById('run');
    const display = document.getElementById('display');
    if(!display) return;
    if(!runButton) return;
    runButton.onclick = run;
    async function run(){
        vis.clear();
        if(display) display.innerText = `X Value: 1`;
        const text = dataElem.value;
        if(!text) return;
        const lines = text.trim().split('\n').map(line => line.trim());
        let x = 1;
        let c = 0;
        async function cycle(){
            const solid = Math.abs(c % 40 - x) <= 1;
            if(solid){
                vis.rect(c % 40, Math.floor(c / 40), 1, 1);
            }
            c++;
            await new Promise(res => setTimeout(res,  50));
        }
        for (const line of lines) {
            if(line === 'noop'){
                await cycle();
            }
            else{
                await cycle();
                await cycle();
                x += +line.split(' ')[1];
                if(display) display.innerText = `X Value: ${x}`;
            }
        }
    }
}

window.onload = main;