import os
import re

# Match from <div class="nav-links"> to the start of <div class="user-actions">
search_pattern = re.compile(r'<div class="nav-links">.*?<div class="user-actions">', re.DOTALL)

# The new flattened nav block
replacement = r'''<div class="nav-links">
                <a href="index.html" class="nav-link" style="text-decoration: none; color: inherit;">Dashboard</a>
                <a href="forms.html" class="nav-link" style="text-decoration: none; color: inherit;">Forms</a>
                <a href="completed-applications.html" class="nav-link" style="text-decoration: none; color: inherit;">Applications</a>
                <a href="requery.html" class="nav-link" style="text-decoration: none; color: inherit;">Payments</a>
                <a href="announcements.html" class="nav-link" style="text-decoration: none; color: inherit;">Announcement</a>
                <a href="result.html" class="nav-link" style="text-decoration: none; color: inherit;">Results</a>
            </div>

            <div class="user-actions">'''

def process_dir(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            
            with open(filepath, 'r') as file:
                content = file.read()
            
            # Use regex sub
            new_content = search_pattern.sub(replacement, content)
            
            if new_content != content:
                with open(filepath, 'w') as file:
                    file.write(new_content)
                print(f"Updated {filepath}")

process_dir('.')
process_dir('react-app/public/pages')
