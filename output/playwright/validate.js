async (page) => {
 const results = []; const errors = []; const failed = [];
 page.on('pageerror', e => errors.push(e.message));
 page.on('console', m => {if(m.type()==='error') errors.push(m.text());});
 page.on('requestfailed', r=>failed.push(r.url()));
 const check=(name,pass,detail)=>{results.push({name,pass,detail}); if(!pass) throw Error(name+': '+JSON.stringify(detail));};
 const cdp=await page.context().newCDPSession(page); await cdp.send('Debugger.enable'); await cdp.send('Accessibility.enable');
 await page.goto('http://127.0.0.1:8765/'); await page.evaluate(()=>localStorage.clear()); await page.emulateMedia({colorScheme:'light'}); await page.reload(); await page.evaluate(()=>document.fonts.ready);
 for(const width of [320,390,834,1024,1440]) for(const theme of ['light','dark']) {
   await page.setViewportSize({width,height:1000}); await page.locator('[data-theme-choice='+theme+']').click(); await page.evaluate(()=>scrollTo(0,0));
   const state=await page.evaluate(()=>({viewport:innerWidth,client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,theme:document.documentElement.dataset.theme,font:document.fonts.check('16px Inter'),projects:document.querySelectorAll('.project').length}));
   check(width+' '+theme,state.scroll<=state.client&&state.theme===theme&&state.font&&state.projects===3,state);
   await page.screenshot({path:'output/playwright/'+width+'-'+theme+'.png',fullPage:true});
 }
 for(const id of ['work','experience','skills','about','contact']) {
   await page.locator('.section-nav a[href="#'+id+'"]').click();
   const position=await page.locator('#'+id).evaluate(el=>({top:el.getBoundingClientRect().top,heading:el.querySelector('h2').getBoundingClientRect().bottom}));
   check('anchor '+id,(await page.evaluate(()=>location.hash))==='#'+id&&position.top>=0&&position.heading<1000,position);
 }
 await page.locator('.contact-action').click(); check('contact action',(await page.evaluate(()=>location.hash))==='#contact');
 await page.locator('[data-theme-choice=dark]').click(); await page.reload(); check('theme persistence',await page.evaluate(()=>document.documentElement.dataset.theme==='dark'));
 await page.evaluate(()=>localStorage.clear()); await page.reload(); await page.emulateMedia({colorScheme:'dark'}); await page.waitForTimeout(100); check('system dark',await page.evaluate(()=>document.documentElement.dataset.theme==='dark'));
 await page.emulateMedia({colorScheme:'light'}); await page.waitForTimeout(100); check('system changes',await page.evaluate(()=>document.documentElement.dataset.theme==='light'));
 await page.goto('http://127.0.0.1:8765/'); await page.keyboard.press('Tab'); check('skip focused',await page.locator('.skip-link').evaluate(el=>el===document.activeElement&&getComputedStyle(el).outlineStyle==='solid')); await page.keyboard.press('Enter'); check('skip target',await page.evaluate(()=>document.activeElement.id==='content'));
 await page.setViewportSize({width:1440,height:1100}); await page.evaluate(()=>scrollTo(0,300)); await page.waitForTimeout(100); check('sticky tall desktop',await page.locator('.profile').evaluate(el=>getComputedStyle(el).position==='sticky'));
 await page.setViewportSize({width:1440,height:700}); await page.waitForTimeout(100); check('short desktop natural flow',await page.locator('.profile').evaluate(el=>getComputedStyle(el).position!=='sticky'));
 await page.setViewportSize({width:320,height:800}); await page.addStyleTag({content:':root {font-size:32px !important}'}); check('200 percent text reflow',await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)); await page.screenshot({path:'output/playwright/text-zoom.png',fullPage:true});
 await page.reload();
 check('social and email placeholders',await page.evaluate(()=>document.querySelectorAll('.social-icon:disabled').length===2&&[...document.querySelectorAll('.social-icon')].every(el=>el.hasAttribute('aria-label')&&!el.hasAttribute('title')&&!el.textContent.trim())&&!document.querySelector('[href^="mailto:"]')&&document.querySelector('.email').textContent==='Rajib [at] email.com'&&!document.body.innerText.toLowerCase().includes('upwork')));
 const contrasts=[];
 for(const theme of ['light','dark']){
  await page.locator('[data-theme-choice='+theme+']').click();
  contrasts.push(await page.evaluate(()=>{const s=getComputedStyle(document.documentElement);const rgb=n=>s.getPropertyValue(n).trim(); const lum=h=>{let c=h.replace('#','').match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};const ratio=(a,b)=>{let x=lum(rgb(a)),y=lum(rgb(b));return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};return {theme:document.documentElement.dataset.theme,text:ratio('--text','--background'),secondary:ratio('--secondary','--background'),placeholder:ratio('--secondary','--placeholder'),link:ratio('--accent','--background'),button:ratio('--on-accent','--accent'),control:ratio('--control','--background')};}));
 }
 check('AA palette contrast',contrasts.every(c=>Math.min(c.text,c.secondary,c.placeholder,c.link,c.button)>=4.5&&c.control>=3),contrasts);
 const blocked=await page.context().browser().newContext(); await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError')}})}); const bp=await blocked.newPage(); await bp.goto('http://127.0.0.1:8765/'); await bp.locator('[data-theme-choice=dark]').click(); check('blocked storage',await bp.evaluate(()=>document.documentElement.dataset.theme==='dark')); await blocked.close();
 check('console errors',errors.length===0,errors); check('failed requests',failed.length===0,failed);
 await cdp.detach(); await page.setViewportSize({width:1440,height:1000}); await page.locator('[data-theme-choice=light]').click(); await page.evaluate(()=>scrollTo(0,0));
 return {results,contrasts,errors,failed};
}


