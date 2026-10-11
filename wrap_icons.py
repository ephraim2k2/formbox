import os
import re

def wrap_icons(filepath):
    if not os.path.exists(filepath):
        return
        
    with open(filepath, 'r') as f:
        content = f.read()
        
    # Replace the four icons with wrapped versions
    # 1. file-text
    content = content.replace(
        '<i data-lucide="file-text" class="cat-icon" style="width: 20px; height: 20px;"></i>',
        '<div style="width: 44px; height: 44px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center;"><i data-lucide="file-text" class="cat-icon" style="width: 20px; height: 20px; color: #64748b;"></i></div>'
    )
    
    # 2. users
    content = content.replace(
        '<i data-lucide="users" class="cat-icon" style="width: 20px; height: 20px; color: #60a5fa;"></i>',
        '<div style="width: 44px; height: 44px; border-radius: 50%; background: #eff6ff; display: flex; align-items: center; justify-content: center;"><i data-lucide="users" class="cat-icon" style="width: 20px; height: 20px; color: #3b82f6;"></i></div>'
    )
    
    # 3. banknote
    # Note: banknote spans multiple lines in the original file
    content = re.sub(
        r'<i data-lucide="banknote" class="cat-icon"\s+style="width: 20px; height: 20px; color: #34d399;"></i>',
        '<div style="width: 44px; height: 44px; border-radius: 50%; background: #ecfdf5; display: flex; align-items: center; justify-content: center;"><i data-lucide="banknote" class="cat-icon" style="width: 20px; height: 20px; color: #10b981;"></i></div>',
        content
    )
    
    # 4. clock
    content = content.replace(
        '<i data-lucide="clock" class="cat-icon" style="width: 20px; height: 20px; color: #f87171;"></i>',
        '<div style="width: 44px; height: 44px; border-radius: 50%; background: #fef2f2; display: flex; align-items: center; justify-content: center;"><i data-lucide="clock" class="cat-icon" style="width: 20px; height: 20px; color: #ef4444;"></i></div>'
    )
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {filepath}")

wrap_icons('/Users/mac/Desktop/formboxx/index.html')
wrap_icons('/Users/mac/Desktop/formboxx/react-app/public/pages/index.html')

