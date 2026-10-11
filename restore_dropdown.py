import os
import re

nav_html = """<div class="nav-links">
                <a href="index.html" class="nav-link" style="text-decoration: none; color: inherit;">Dashboard</a>
                <a href="forms.html" class="nav-link" style="text-decoration: none; color: inherit;">Forms</a>
                
                <div class="nav-dropdown">
                    <div class="nav-link" id="nav-applications" style="display: flex; align-items: center; gap: 4px;">Applications <i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i></div>
                    <div class="nav-dropdown-content">
                        <a href="completed-applications.html" class="mega-menu-item">
                            <div class="mega-icon-box" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">
                                <i data-lucide="check-circle" style="width: 18px; height: 18px;"></i>
                            </div>
                            <div class="mega-text-box">
                                <div class="mega-title">Completed Applications</div>
                                <div class="mega-subtitle">Successfully submitted forms</div>
                            </div>
                        </a>
                        <a href="incomplete-applications.html" class="mega-menu-item">
                            <div class="mega-icon-box" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;">
                                <i data-lucide="clock" style="width: 18px; height: 18px;"></i>
                            </div>
                            <div class="mega-text-box">
                                <div class="mega-title">Incomplete Applications</div>
                                <div class="mega-subtitle">Forms saved as drafts</div>
                            </div>
                        </a>
                        <a href="#" class="mega-menu-item">
                            <div class="mega-icon-box" style="background: rgba(239, 68, 68, 0.1); color: #ef4444;">
                                <i data-lucide="x-circle" style="width: 18px; height: 18px;"></i>
                            </div>
                            <div class="mega-text-box">
                                <div class="mega-title">Abandoned Applications</div>
                                <div class="mega-subtitle">Users who dropped off</div>
                            </div>
                        </a>
                    </div>
                </div>

                <a href="requery.html" class="nav-link" style="text-decoration: none; color: inherit;">Payments</a>
                <a href="announcements.html" class="nav-link" style="text-decoration: none; color: inherit;">Announcement</a>
                <a href="result.html" class="nav-link" style="text-decoration: none; color: inherit;">Results</a>
            </div>"""

def process_dir(directory):
    # Regex to find <div class="nav-links"> ... </div>
    # It must correctly balance or use a non-greedy match that goes up to the next sibling
    # Since we know the next sibling is usually <div class="user-actions">, we can use that to anchor
    pattern = re.compile(r'<div class="nav-links">.*?</div>\s*<div class="user-actions">', re.DOTALL)
    
    for filename in os.listdir(directory):
        # candidate pages shouldn't have the admin nav
        if filename in ["candidate-dashboard.html", "applicant-profile.html", "exam-slip.html"]:
            continue
            
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r') as file:
                content = file.read()
            
            # replace the matched block with our new nav_html + the anchored user-actions
            new_content = pattern.sub(nav_html + '\n            \n            <div class="user-actions">', content)
            
            if new_content != content:
                with open(filepath, 'w') as file:
                    file.write(new_content)
                print(f"Restored nav dropdown in {filepath}")

process_dir('.')
process_dir('react-app/public/pages')
