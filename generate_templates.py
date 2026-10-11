import re

with open("forms.html", "r") as f:
    content = f.read()

# Replace Title
content = content.replace("<title>Forms Library </title>", "<title>Templates Library</title>")
content = content.replace("Manage school application forms", "Browse and use pre-built form templates")
content = content.replace("Forms Library 📝", "Templates Library 📑")

# Remove table wrapper completely
content = re.sub(r'<div class="table-wrapper">.*?<div class="pagination-container"[^>]*>.*?</div>\s*</div>', "", content, flags=re.DOTALL)

# Remove toggle view buttons
content = re.sub(r'<div class="view-toggle"[^>]*>.*?</div>', "", content, flags=re.DOTALL)

# Make cards view visible by default
content = content.replace('id="cardsWrapper" style="display: none; padding-top: 10px;"', 'id="cardsWrapper" style="display: block; padding-top: 10px;"')

# Build the templates HTML
template_cards = """                <div class="cards-grid">
                    <!-- Template 1 -->
                    <div class="form-card card">
                        <div class="card-header">
                            <span class="status-badge" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">
                                <i data-lucide="star" style="width: 12px; height: 12px;"></i> Popular
                            </span>
                        </div>
                        <h3 class="card-title">Standard Admission Form</h3>
                        <p class="card-subtitle">General templates for new intakes.</p>
                        
                        <div class="card-stats" style="margin-top: 12px;">
                            <div class="stat-item">
                                <span class="stat-label">Fields</span>
                                <span class="stat-value" style="color: #0052cc;">24</span>
                            </div>
                        </div>
                        
                        <div class="card-actions" style="margin-top: 16px;">
                            <button class="btn-primary" style="flex: 1; border: none; cursor: pointer; border-radius: 8px;" onclick="openCreateFormModal()"><i data-lucide="copy" style="width: 14px; height: 14px;"></i> Use Template</button>
                        </div>
                    </div>
                    
                    <!-- Template 2 -->
                    <div class="form-card card">
                        <div class="card-header">
                            <span class="status-badge" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;">
                                <i data-lucide="briefcase" style="width: 12px; height: 12px;"></i> HR
                            </span>
                        </div>
                        <h3 class="card-title">Staff Recruitment</h3>
                        <p class="card-subtitle">Standardized fields for job applicants.</p>
                        
                        <div class="card-stats" style="margin-top: 12px;">
                            <div class="stat-item">
                                <span class="stat-label">Fields</span>
                                <span class="stat-value" style="color: #0052cc;">18</span>
                            </div>
                        </div>
                        
                        <div class="card-actions" style="margin-top: 16px;">
                            <button class="btn-primary" style="flex: 1; border: none; cursor: pointer; border-radius: 8px;" onclick="openCreateFormModal()"><i data-lucide="copy" style="width: 14px; height: 14px;"></i> Use Template</button>
                        </div>
                    </div>

                    <!-- Template 3 -->
                    <div class="form-card card">
                        <div class="card-header">
                            <span class="status-badge" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6;">
                                <i data-lucide="users" style="width: 12px; height: 12px;"></i> Survey
                            </span>
                        </div>
                        <h3 class="card-title">Parent Feedback Survey</h3>
                        <p class="card-subtitle">End-of-term feedback collection.</p>
                        
                        <div class="card-stats" style="margin-top: 12px;">
                            <div class="stat-item">
                                <span class="stat-label">Fields</span>
                                <span class="stat-value" style="color: #0052cc;">10</span>
                            </div>
                        </div>
                        
                        <div class="card-actions" style="margin-top: 16px;">
                            <button class="btn-primary" style="flex: 1; border: none; cursor: pointer; border-radius: 8px;" onclick="openCreateFormModal()"><i data-lucide="copy" style="width: 14px; height: 14px;"></i> Use Template</button>
                        </div>
                    </div>
                </div>"""

# Replace the existing cards grid with the new templates
content = re.sub(r'<div class="cards-grid">.*?</div>\s*</div>\s*<!-- Pagination for Cards View -->', template_cards, content, flags=re.DOTALL)
content = re.sub(r'<!-- Pagination for Cards View -->.*?</div>\s*</div>', '</div>', content, flags=re.DOTALL)

with open("templates.html", "w") as f:
    f.write(content)
print("templates.html generated successfully!")
