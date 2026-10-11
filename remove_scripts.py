import os
import re

directories = [
    'react-app/src/pages',
    'react-app/src/components'
]

script_pattern = re.compile(r'<script.*?>.*?</script>', re.DOTALL)

for directory in directories:
    for filename in os.listdir(directory):
        if filename.endswith('.jsx'):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r') as f:
                content = f.read()
            
            new_content = script_pattern.sub('', content)
            
            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Removed script tags from {filepath}")
