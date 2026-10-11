import os
import re
import glob

def fix_html_files(directory):
    html_files = glob.glob(os.path.join(directory, '*.html'))
    
    # Pattern to match <div class="welcome-text"> followed by optional whitespace, then <h2...</h2>, optional whitespace, then <h1...</h1>
    pattern = re.compile(
        r'(<div class="welcome-text">\s*)'
        r'(<h2.*?>.*?</h2>\s*)'
        r'(<h1.*?>.*?</h1>)',
        re.DOTALL
    )
    
    # Also want to remove the inline styles in result.html that I added earlier
    h1_style_pattern = re.compile(r'<h1 style="margin-bottom: 4px;">')
    h2_style_pattern = re.compile(r'<h2 style="margin-bottom: 30px; font-size: 15px; color: var(--text-light);">')
    
    for file in html_files:
        with open(file, 'r') as f:
            content = f.read()
            
        # First, remove inline styles from result.html if they exist
        content = h1_style_pattern.sub('<h1>', content)
        content = h2_style_pattern.sub('<h2>', content)
        
        # Then, swap h2 and h1 order if h2 is before h1
        def swap_func(match):
            prefix = match.group(1)
            h2_part = match.group(2)
            h1_part = match.group(3)
            # Find the whitespace at the end of h2_part to keep indentation correct
            # Actually, just swap them with a newline between
            h2_clean = h2_part.strip()
            h1_clean = h1_part.strip()
            return f"{prefix}{h1_clean}\n                    {h2_clean}"

        new_content = pattern.sub(swap_func, content)
        
        if new_content != content:
            with open(file, 'w') as f:
                f.write(new_content)
            print(f"Fixed {file}")

fix_html_files('/Users/mac/Desktop/formboxx')
fix_html_files('/Users/mac/Desktop/formboxx/react-app/public/pages')
