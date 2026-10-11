import os
import glob
import re

def expand_layout(directory):
    html_files = glob.glob(os.path.join(directory, '*.html'))
    
    for file in html_files:
        with open(file, 'r') as f:
            content = f.read()
            
        # Replace max-width: 1200px and 1100px with 100%
        content = re.sub(r'max-width:\s*1200px;', 'max-width: 100%;', content)
        content = re.sub(r'max-width:\s*1100px;', 'max-width: 100%;', content)
            
        with open(file, 'w') as f:
            f.write(content)
            
    print(f"Expanded layouts in {directory}")

expand_layout('/Users/mac/Desktop/formboxx')
expand_layout('/Users/mac/Desktop/formboxx/react-app/public/pages')

# Also modify styles.css
styles_file = '/Users/mac/Desktop/formboxx/styles.css'
with open(styles_file, 'r') as f:
    styles_content = f.read()

styles_content = re.sub(r'max-width:\s*1440px;', 'max-width: 100%;', styles_content)

with open(styles_file, 'w') as f:
    f.write(styles_content)

print("Expanded styles.css")
