import os

def fix_search_box(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
        
    original = content
    
    # 1. Fix the icon selector so it applies to the Lucide SVG
    content = content.replace('.search-box i {', '.search-box i, .search-box svg {')
    
    # 2. Add box-sizing to input to prevent it from overflowing the container due to padding
    # Only add if it doesn't already have box-sizing in that block
    if '.search-box input {' in content:
        # split by '.search-box input {' and add box-sizing if not present
        parts = content.split('.search-box input {')
        if len(parts) > 1:
            for i in range(1, len(parts)):
                block_end = parts[i].find('}')
                if block_end != -1:
                    block = parts[i][:block_end]
                    if 'box-sizing: border-box;' not in block:
                        # insert right after the opening brace
                        parts[i] = '\n            box-sizing: border-box;' + parts[i]
            
            content = '.search-box input {'.join(parts)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed search-box in {filepath}")

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root: continue
    for file in files:
        if file.endswith('.html'):
            fix_search_box(os.path.join(root, file))
