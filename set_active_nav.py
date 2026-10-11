import os
import re

def process_dir(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            
            with open(filepath, 'r') as file:
                content = file.read()
            
            # Map of which links are active on which pages
            active_map = {
                'index.html': 'index.html',
                'forms.html': 'forms.html',
                'completed-applications.html': 'nav-applications',
                'incomplete-applications.html': 'nav-applications', # Both fall under Applications dropdown
                'requery.html': 'requery.html',
                'announcements.html': 'announcements.html',
                'result.html': 'result.html',
                # Candidate pages
                'candidate-dashboard.html': 'candidate-dashboard.html',
                'applicant-profile.html': 'applicant-profile.html',
            }
            
            link_to_activate = active_map.get(filename)
            
            if link_to_activate:
                # First ensure NO link has active class to avoid duplicates
                content = content.replace('class="nav-link active"', 'class="nav-link"')
                
                if link_to_activate == 'nav-applications':
                    # Set the Applications div to active
                    search_str = '<div class="nav-link" id="nav-applications"'
                    replace_str = '<div class="nav-link active" id="nav-applications"'
                    content = content.replace(search_str, replace_str)
                else:
                    # Normal anchor link
                    search_str = f'<a href="{link_to_activate}" class="nav-link"'
                    replace_str = f'<a href="{link_to_activate}" class="nav-link active"'
                    content = content.replace(search_str, replace_str)
                    
                    search_style = f'<a href="{link_to_activate}" class="nav-link active" style="text-decoration: none; color: inherit;">'
                    replace_style = f'<a href="{link_to_activate}" class="nav-link active" style="text-decoration: none;">'
                    content = content.replace(search_style, replace_style)
                
                with open(filepath, 'w') as file:
                    file.write(content)
                print(f"Set active link for {filepath}")

process_dir('.')
process_dir('react-app/public/pages')
