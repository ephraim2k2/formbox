import glob
import re

blue_avatar = 'background: rgba(59, 130, 246, 0.1); color: #3b82f6;'

files = [
    '/Users/mac/Desktop/formboxx/index.html',
    '/Users/mac/Desktop/formboxx/react-app/public/pages/index.html',
    '/Users/mac/Desktop/formboxx/react-app/dist/pages/index.html'
]

# Pattern matching the initial avatar div style in recent submissions
pattern = r'background:\s*rgba\(\s*\d+,\s*\d+,\s*\d+,\s*0\.1\);\s*color:\s*#[a-fA-F0-9]+;'

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the Recent Submissions section block
        recent_start = content.find('<!-- Recent Submissions -->')
        if recent_start != -1:
            recent_end = content.find('<!-- Create Form Modal Overlay -->', recent_start)
            if recent_end == -1:
                recent_end = len(content)

            recent_section = content[recent_start:recent_end]
            updated_section = re.sub(pattern, blue_avatar, recent_section)
            content = content[:recent_start] + updated_section + content[recent_end:]

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated recent submissions avatar colors in {filepath}")
    except Exception as e:
        print(f"Error updating {filepath}: {e}")
