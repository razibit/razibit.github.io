// Function to update all HTML files in subdirectories with responsive elements
// This is a utility script for development only

const fs = require('fs');
const path = require('path');

// Directories containing pages to update
const directories = [
  'publications',
  'projects',
  'blog',
  'cv',
  'education',
  'experience',
  'awards'
];

// HTML snippets to add
const mobileMenuButton = `
<div class="menu-toggle" id="mobile-menu">
    <span></span>
    <span></span>
    <span></span>
</div>`;

const viewportMeta = `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">`;
const responsiveScript = `<script src="/js/scripts.js" defer></script>`;

// Process each directory
directories.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  
  try {
    // Check if directory exists
    if (!fs.existsSync(dirPath)) {
      console.log(`Directory ${dir} doesn't exist, skipping`);
      return;
    }
    
    const files = fs.readdirSync(dirPath);
    
    // Process HTML files
    files.filter(file => file.endsWith('.html')).forEach(file => {
      const filePath = path.join(dirPath, file);
      console.log(`Processing ${filePath}`);
      
      let content = fs.readFileSync(filePath, 'utf8');
      
      // 1. Update viewport meta
      content = content.replace(/<meta name="viewport"[^>]*>/g, viewportMeta);
      
      // 2. Add mobile menu button if not present
      if (!content.includes('mobile-menu')) {
        content = content.replace(/<div class="logo">([\s\S]*?)<\/div>[\s\S]*?<nav/m, 
          `<div class="logo">$1</div>\n    ${mobileMenuButton}\n    <nav id="nav-menu"`);
      }
      
      // 3. Update script reference if needed
      if (content.includes('</body>')) {
        // Remove existing script references
        content = content.replace(/<script src="[^"]*scripts\.js"[^>]*><\/script>/g, '');
        
        // Add new script reference before closing body tag if it doesn't exist
        if (!content.includes('scripts.js')) {
          content = content.replace('</body>', `    ${responsiveScript}\n</body>`);
        }
      }
      
      // Write updated content back to file
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    });
  } catch (err) {
    console.error(`Error processing ${dir}: ${err.message}`);
  }
});

console.log('All pages updated with responsive elements!'); 