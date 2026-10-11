import os
import re

search_pattern = re.compile(
    r'<div class="user-avatar"[^>]*>(\s*<svg[^>]*>.*?<\/svg>\s*)<\/div>',
    re.DOTALL
)

replace_template = r'<a href="settings.html" class="user-avatar" style="text-decoration: none; color: inherit;">\1</a>'

def process_dir(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r') as file:
                content = file.read()
            
            new_content = search_pattern.sub(replace_template, content)
            
            if new_content != content:
                with open(filepath, 'w') as file:
                    file.write(new_content)
                print(f"Updated {filepath}")

process_dir('.')
process_dir('react-app/public/pages')
