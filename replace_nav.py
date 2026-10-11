import os
import re

# Match <a href="settings.html" class="nav-link...">Settings</a> or similar variations
# But only inside the <nav class="navbar"> ... </nav> block!
# Or we can just search for `<a href="settings.html" class="nav-link"[^>]*>Settings</a>`
# and replace with `<a href="result.html" class="nav-link"...>Results</a>`

search_pattern_1 = re.compile(
    r'<a href="settings\.html"\s+class="nav-link"\s+style="text-decoration:\s*none;\s*color:\s*inherit;">Settings</a>'
)
search_pattern_2 = re.compile(
    r'<a href="settings\.html"\s+class="nav-link active"\s+style="text-decoration:\s*none;">Settings</a>'
)

replace_1 = r'<a href="result.html" class="nav-link" style="text-decoration: none; color: inherit;">Results</a>'
replace_2 = r'<a href="result.html" class="nav-link active" style="text-decoration: none;">Results</a>'

def process_dir(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r') as file:
                content = file.read()
            
            new_content = search_pattern_1.sub(replace_1, content)
            new_content = search_pattern_2.sub(replace_2, new_content)
            
            if new_content != content:
                with open(filepath, 'w') as file:
                    file.write(new_content)
                print(f"Updated {filepath}")

process_dir('.')
process_dir('react-app/public/pages')
