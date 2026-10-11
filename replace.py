import os

search_string = '<div class="user-avatar">'
replace_string = '<div class="user-avatar" onclick="window.location.href=\'settings.html\'" style="cursor: pointer;">'

def process_dir(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r') as file:
                content = file.read()
            
            if search_string in content:
                new_content = content.replace(search_string, replace_string)
                with open(filepath, 'w') as file:
                    file.write(new_content)
                print(f"Updated {filepath}")

process_dir('.')
process_dir('react-app/public/pages')
