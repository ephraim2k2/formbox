import os
import glob
import re

def remove_emojis_from_dir(directory):
    html_files = glob.glob(os.path.join(directory, '*.html'))
    
    # Emojis found in the project
    emojis = ['📝', '🎫', '👋', '📜', '📢', '📑', '🔄', '📄', '🎓', '📍', '🔐']
    
    for file in html_files:
        # Skip index.html
        if os.path.basename(file) == 'index.html':
            continue
            
        with open(file, 'r') as f:
            content = f.read()
            
        # Specific cleanup for the wave span
        content = content.replace('<span class="wave">👋</span>', '')
        # It might also have spaces around the emoji inside the span, but the previous replace should catch the exact string.
        # Just in case:
        content = re.sub(r'<span class="wave">\s*👋\s*</span>', '', content)
            
        for emoji in emojis:
            content = content.replace(f' {emoji}', '') # Try to remove preceding space if present
            content = content.replace(emoji, '')
            
        with open(file, 'w') as f:
            f.write(content)
        print(f"Cleaned {file}")

remove_emojis_from_dir('/Users/mac/Desktop/formboxx')
remove_emojis_from_dir('/Users/mac/Desktop/formboxx/react-app/public/pages')
