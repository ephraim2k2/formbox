import os
import re

directories = [
    'react-app/src/pages',
    'react-app/src/components'
]

comment_pattern = re.compile(r'<!--(.*?)-->', re.DOTALL)

for directory in directories:
    for filename in os.listdir(directory):
        if filename.endswith('.jsx'):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r') as f:
                content = f.read()
            
            new_content = comment_pattern.sub(r'{/*\1*/}', content)
            
            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Fixed comments in {filepath}")
