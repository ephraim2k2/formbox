import os
import re

def create_result_page():
    with open('index.html', 'r') as f:
        content = f.read()
    
    # We want to replace everything from <!-- Header Content --> down to just before <script>
    
    # We will split on <!-- Header Content -->
    parts = content.split('<!-- Header Content -->')
    
    # We'll split the second part on <!-- Create Form Modal Overlay --> to keep the bottom intact
    # Actually wait, result page doesn't need Create Form Modal.
    # Let's split on <!-- Create Form Modal Overlay -->
    bottom_parts = parts[1].split('<!-- Create Form Modal Overlay -->')
    
    header_main_content = """
        <!-- Header Content -->
        <div class="header-content">
            <div class="welcome-section">
                <div class="welcome-text">
                    <h2>Manage results and communicate with candidates</h2>
                    <h1>Results & Messaging</h1>
                </div>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="main-content">
            
            <div class="categories-grid" style="grid-template-columns: 1fr 1fr;">
                
                <!-- Upload Results Card -->
                <div class="card" style="padding: 24px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
                        <div style="width: 40px; height: 40px; border-radius: 8px; background: rgba(59, 130, 246, 0.1); color: #3b82f6; display: flex; align-items: center; justify-content: center;">
                            <i data-lucide="upload-cloud"></i>
                        </div>
                        <div>
                            <h3 style="margin: 0; font-size: 16px; color: var(--text-dark);">Upload Results</h3>
                            <p style="margin: 4px 0 0 0; font-size: 13px; color: var(--text-light);">Upload candidate scores or admission status (CSV/Excel)</p>
                        </div>
                    </div>
                    
                    <div style="border: 2px dashed var(--border-color); border-radius: 12px; padding: 32px; text-align: center; background: rgba(0,0,0,0.01); cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='rgba(59,130,246,0.02)'" onmouseout="this.style.borderColor='var(--border-color)'; this.style.background='rgba(0,0,0,0.01)'">
                        <i data-lucide="file-spreadsheet" style="width: 32px; height: 32px; color: var(--text-light); margin-bottom: 12px;"></i>
                        <div style="font-size: 14px; font-weight: 500; color: var(--text-dark); margin-bottom: 4px;">Click to browse or drag and drop</div>
                        <div style="font-size: 12px; color: var(--text-light);">Supported formats: .csv, .xlsx, .xls</div>
                        
                        <input type="file" style="display: none;" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                    </div>
                    
                    <button class="btn-primary" style="width: 100%; margin-top: 24px; padding: 12px; justify-content: center;">
                        <i data-lucide="upload"></i> Process Results File
                    </button>
                </div>

                <!-- Messaging Card -->
                <div class="card" style="padding: 24px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
                        <div style="width: 40px; height: 40px; border-radius: 8px; background: rgba(16, 185, 129, 0.1); color: #10b981; display: flex; align-items: center; justify-content: center;">
                            <i data-lucide="mail"></i>
                        </div>
                        <div>
                            <h3 style="margin: 0; font-size: 16px; color: var(--text-dark);">Candidate Messaging</h3>
                            <p style="margin: 4px 0 0 0; font-size: 13px; color: var(--text-light);">Send bulk emails or SMS based on admission status</p>
                        </div>
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 13px; font-weight: 500; color: var(--text-dark); margin-bottom: 8px;">Filter Recipients</label>
                        <select class="form-input" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; outline: none;">
                            <option>All Candidates</option>
                            <option>Admitted Candidates</option>
                            <option>Not Admitted Candidates</option>
                            <option>Pending Results</option>
                        </select>
                    </div>

                    <div class="form-group" style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 13px; font-weight: 500; color: var(--text-dark); margin-bottom: 8px;">Subject</label>
                        <input type="text" class="form-input" placeholder="e.g. Admission Status Update" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; outline: none; box-sizing: border-box;">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 24px;">
                        <label style="display: block; font-size: 13px; font-weight: 500; color: var(--text-dark); margin-bottom: 8px;">Message Body</label>
                        <textarea class="form-input" placeholder="Type your message here... Use {{name}} to personalize." rows="5" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; outline: none; resize: vertical; box-sizing: border-box;"></textarea>
                    </div>

                    <button class="btn-primary" style="width: 100%; padding: 12px; justify-content: center; background: #10b981;">
                        <i data-lucide="send"></i> Send Messages
                    </button>
                </div>

            </div>

        </div>
    </div>
    
    <script>
"""
    
    new_bottom_script = """
        // Check local storage for dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-theme');
            document.addEventListener('DOMContentLoaded', () => {
                document.querySelector('.moon-icon').style.display = 'none';
                document.querySelector('.sun-icon').style.display = 'block';
            });
        }

        function toggleTheme() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
            document.querySelector('.moon-icon').style.display = isDark ? 'none' : 'block';
            document.querySelector('.sun-icon').style.display = isDark ? 'block' : 'none';
        }
        
        lucide.createIcons();
    </script>
</body>
</html>
"""
    
    new_html = parts[0] + header_main_content + new_bottom_script
    
    # Ensure active class is on the Results nav link
    # The original index.html has active on Dashboard. We will replace that.
    # Wait, the index.html nav links don't have a Results link! I should add it.
    
    nav_links_start = new_html.find('<div class="nav-links">')
    nav_links_end = new_html.find('</div>', nav_links_start)
    nav_links = new_html[nav_links_start:nav_links_end+6]
    
    new_nav_links = nav_links.replace('class="nav-link active"', 'class="nav-link"')
    new_nav_links = new_nav_links.replace('</div>', '    <a href="result.html" class="nav-link active" style="text-decoration: none;">Results</a>\n            </div>')
    
    new_html = new_html.replace(nav_links, new_nav_links)
    
    # We should also add Results link to index.html and other admin pages so they can navigate to it.
    
    with open('result.html', 'w') as f:
        f.write(new_html)
    
    print("Created result.html")

create_result_page()
