import os
import re

filepath = 'react-app/src/pages/Settings.jsx'

with open(filepath, 'r') as f:
    content = f.read()

# Replace Settings with SettingsIcon in the import list
content = re.sub(r'\bSettings\b(.*?from\s+[\'"]lucide-react[\'"])', r'Settings as SettingsIcon\1', content)

# Replace <Settings ... /> or <Settings> with <SettingsIcon ... />
content = re.sub(r'<Settings(\s|>)', r'<SettingsIcon\1', content)
content = re.sub(r'</Settings>', r'</SettingsIcon>', content)

with open(filepath, 'w') as f:
    f.write(content)
print("Fixed Settings icon conflict")
