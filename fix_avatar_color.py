import os

def process_dir(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r') as file:
                content = file.read()
            
            # Remove color: inherit; from the anchor tag
            new_content = content.replace('<a href="settings.html" class="user-avatar" style="text-decoration: none; color: inherit;">', '<a href="settings.html" class="user-avatar" style="text-decoration: none; color: white;">')
            
            if new_content != content:
                with open(filepath, 'w') as file:
                    file.write(new_content)
                print(f"Fixed avatar color in {filepath}")

process_dir('.')
process_dir('react-app/public/pages')
