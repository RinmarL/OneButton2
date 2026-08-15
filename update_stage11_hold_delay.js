const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf-8');

const oldHoldAnim = `                const updateHoldLamp = () => {
                    if (!stageState.pressingBtn || stageState.cond5 || stageState.cleared) return;
                    const elapsed = Date.now() - stageState.holdStartTime;
                    const progress = Math.min(elapsed / 3000, 1.0);
                    
                    // 赤 (239, 68, 68) ➔ オレンジ ➔ 緑 (34, 197, 94) へ滑らかに遷移
                    const r = Math.round(239 + (34 - 239) * progress);
                    const g = Math.round(68 + (197 - 68) * progress);
                    const b = Math.round(68 + (94 - 68) * progress);
                    const led5 = UI.leds[4];
                    if (led5) {
                        led5.style.backgroundColor = \`rgb(\${r}, \${g}, \${b})\`;
                        led5.style.boxShadow = \`0 0 \${Math.round(progress * 15)}px rgb(\${r}, \${g}, \${b})\`;
                    }
                    
                    if (progress >= 1.0) {
                        stageState.cond5 = true;
                        UI.setLED(4, 'green');
                        if (led5) {
                            led5.style.backgroundColor = '';
                            led5.style.boxShadow = '';
                        }
                        AudioSys.sfx.thud();
                        stageState.checkAll();
                    } else {
                        stageState.holdAnim = requestAnimationFrame(updateHoldLamp);
                    }
                };`;

const newHoldAnim = `                const updateHoldLamp = () => {
                    if (!stageState.pressingBtn || stageState.cond5 || stageState.cleared) return;
                    const elapsed = Date.now() - stageState.holdStartTime;
                    const delay = 500; // 0.5秒の猶予
                    const totalTime = 3000;
                    
                    if (elapsed < delay) {
                        // 最初の0.5秒間は赤色のまま維持
                        stageState.holdAnim = requestAnimationFrame(updateHoldLamp);
                        return;
                    }
                    
                    const progress = Math.min((elapsed - delay) / (totalTime - delay), 1.0);
                    
                    // 0.5秒後から赤 ➔ オレンジ ➔ 緑 へ滑らかにじわーっと遷移
                    const r = Math.round(239 + (34 - 239) * progress);
                    const g = Math.round(68 + (197 - 68) * progress);
                    const b = Math.round(68 + (94 - 68) * progress);
                    const led5 = UI.leds[4];
                    if (led5) {
                        led5.style.backgroundColor = \`rgb(\${r}, \${g}, \${b})\`;
                        led5.style.boxShadow = \`0 0 \${Math.round(progress * 15)}px rgb(\${r}, \${g}, \${b})\`;
                    }
                    
                    if (progress >= 1.0) {
                        stageState.cond5 = true;
                        UI.setLED(4, 'green');
                        if (led5) {
                            led5.style.backgroundColor = '';
                            led5.style.boxShadow = '';
                        }
                        AudioSys.sfx.thud();
                        stageState.checkAll();
                    } else {
                        stageState.holdAnim = requestAnimationFrame(updateHoldLamp);
                    }
                };`;

content = content.replace(oldHoldAnim, newHoldAnim);

fs.writeFileSync('index.html', content, 'utf-8');
console.log('Stage 11 hold lamp 0.5s delay implemented successfully!');
