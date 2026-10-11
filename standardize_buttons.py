import os
import re

def process_html_file(filepath):
    with open(filepath, 'r') as file:
        content = file.read()
    
    original_content = content
    
    # 1. Replace btn-export with btn-primary and remove inline background styles from it
    content = re.sub(
        r'<button class="btn-export"[^>]*>',
        lambda m: m.group(0).replace('btn-export', 'btn-primary').replace('style="background: #0052cc;"', '').replace('style="background: #10b981;"', ''),
        content
    )
    
    # 2. Replace btn-save with btn-primary
    content = re.sub(
        r'<button class="btn-save"[^>]*>',
        lambda m: m.group(0).replace('btn-save', 'btn-primary'),
        content
    )
    
    # 3. Replace btn-send with btn-primary
    content = re.sub(
        r'<button class="btn-send"[^>]*>',
        lambda m: m.group(0).replace('btn-send', 'btn-primary'),
        content
    )
    
    # 4. Replace btn-draft with btn-secondary
    content = re.sub(
        r'<button class="btn-draft"[^>]*>',
        lambda m: m.group(0).replace('btn-draft', 'btn-secondary'),
        content
    )

    # 5. Fix result.html buttons
    # In result.html, I added inline styles to btn-primary: `style="width: 100%; margin-top: 24px; padding: 12px; justify-content: center;"`
    # Let's remove the inline background and padding overrides on btn-primary globally to enforce the index.html pill style
    # Wait, width: 100% and justify-content: center are layout properties, but padding and background override the pill style
    content = re.sub(
        r'<button class="btn-primary"([^>]*)>',
        lambda m: '<button class="btn-primary"' + re.sub(r'style="([^"]*)"', lambda s: 'style="' + s.group(1).replace('background: #10b981;', '').replace('padding: 12px;', '') + '"', m.group(1)) + '>',
        content
    )
    # Clean up empty styles
    content = content.replace('style=" "', '')
    content = content.replace('style="width: 100%; margin-top: 24px;  justify-content: center;"', 'style="width: 100%; margin-top: 24px; justify-content: center;"')
    content = content.replace('style="width: 100%;  justify-content: center; "', 'style="width: 100%; justify-content: center;"')
    
    if content != original_content:
        with open(filepath, 'w') as file:
            file.write(content)
        print(f"Updated main buttons in {filepath}")

# Iterate over all html files in current dir and react-app/public/pages
dirs = ['.', 'react-app/public/pages']
for d in dirs:
    for filename in os.listdir(d):
        if filename.endswith(".html"):
            process_html_file(os.path.join(d, filename))
