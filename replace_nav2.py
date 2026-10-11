import os
import re

search_pattern = re.compile(r'<a[^>]*href="settings\.html"[^>]*class="nav-link[^"]*"[^>]*>Settings</a>')

replace_text = r'<a href="result.html" class="nav-link" style="text-decoration: none; color: inherit;">Results</a>'

def process_dir(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r') as file:
                content = file.read()
            
            new_content = search_pattern.sub(replace_text, content)
            
            if new_content != content:
                with open(filepath, 'w') as file:
                    file.write(new_content)
                print(f"Updated {filepath}")

process_dir('.')
process_dir('react-app/public/pages')
