import os
import glob
import re

def remove_abandoned_menu(directory):
    html_files = glob.glob(os.path.join(directory, '*.html'))
    
    # Pattern to match the specific mega-menu-item for Abandoned Applications
    pattern = re.compile(
        r'\s*<a href="#" class="mega-menu-item">\s*<div class="mega-icon-box"[^>]*>\s*<i data-lucide="x-circle"[^>]*></i>\s*</div>\s*<div class="mega-text-box">\s*<div class="mega-title">Abandoned Applications</div>\s*<div class="mega-subtitle">[^<]*</div>\s*</div>\s*</a>',
        re.DOTALL
    )
    
    for file in html_files:
        with open(file, 'r') as f:
            content = f.read()
            
        new_content = pattern.sub('', content)
        
        if new_content != content:
            with open(file, 'w') as f:
                f.write(new_content)
            print(f"Updated {file}")

remove_abandoned_menu('/Users/mac/Desktop/formboxx')
remove_abandoned_menu('/Users/mac/Desktop/formboxx/react-app/public/pages')
