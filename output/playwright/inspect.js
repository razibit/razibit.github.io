async (page) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:'output/playwright/desktop-light.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'output/playwright/mobile-light.png',fullPage:true});
  console.log(await page.evaluate(()=>({height:document.documentElement.scrollHeight,width:document.documentElement.scrollWidth,font:document.fonts.check('16px Inter')})));
}
