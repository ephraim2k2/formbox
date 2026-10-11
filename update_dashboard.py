import sys

with open('candidate-dashboard.html', 'r') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if '<!-- Overview Card -->' in line:
        start_idx = i
    if '<!-- Create Form Modal Overlay -->' in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    new_content = """            <div class="categories-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-bottom: 24px;">
                <!-- Submitted Forms -->
                <div class="category-card">
                    <div class="cat-header">
                        <div class="cat-title">Submitted Forms</div>
                        <i data-lucide="check-circle" class="cat-icon" style="width: 20px; height: 20px; color: #10b981;"></i>
                    </div>
                    <div>
                        <div class="cat-amount">2</div>
                    </div>
                </div>

                <!-- Draft Applications -->
                <div class="category-card">
                    <div class="cat-header">
                        <div class="cat-title">Draft Applications</div>
                        <i data-lucide="edit-3" class="cat-icon" style="width: 20px; height: 20px; color: #f59e0b;"></i>
                    </div>
                    <div>
                        <div class="cat-amount">1</div>
                    </div>
                </div>

                <!-- Payments Made -->
                <div class="category-card">
                    <div class="cat-header">
                        <div class="cat-title">Payments Made</div>
                        <i data-lucide="credit-card" class="cat-icon" style="width: 20px; height: 20px; color: #3b82f6;"></i>
                    </div>
                    <div>
                        <div class="cat-amount">₦15,000</div>
                    </div>
                </div>

                <!-- Notifications -->
                <div class="category-card">
                    <div class="cat-header">
                        <div class="cat-title">Notifications</div>
                        <i data-lucide="bell" class="cat-icon" style="width: 20px; height: 20px; color: #8b5cf6;"></i>
                    </div>
                    <div>
                        <div class="cat-amount">3<span style="font-size: 13px;"> New</span></div>
                    </div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
                <!-- Active Application Status -->
                <div class="card recent-card">
                    <div class="card-header">
                        <div class="card-title">My Applications</div>
                        <a href="applicant-profile.html" class="view-all">View Profile</a>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 16px;">
                        <div style="border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; align-items: center; gap: 16px;">
                                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(59, 130, 246, 0.1); color: #3b82f6; display: flex; align-items: center; justify-content: center;">
                                    <i data-lucide="file-text" style="width: 24px; height: 24px;"></i>
                                </div>
                                <div>
                                    <div style="font-size: 15px; font-weight: 600; color: var(--text-dark);">2026 Academic Session Admission</div>
                                    <div style="font-size: 12px; color: var(--text-light); margin-top: 4px;">Submitted: Oct 08, 2026</div>
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <span style="background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                                    <i data-lucide="check-circle" style="width: 14px; height: 14px;"></i> Under Review
                                </span>
                            </div>
                        </div>
                        
                        <div style="border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; align-items: center; gap: 16px;">
                                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(245, 158, 11, 0.1); color: #f59e0b; display: flex; align-items: center; justify-content: center;">
                                    <i data-lucide="edit" style="width: 24px; height: 24px;"></i>
                                </div>
                                <div>
                                    <div style="font-size: 15px; font-weight: 600; color: var(--text-dark);">Hostel Accommodation Request</div>
                                    <div style="font-size: 12px; color: var(--text-light); margin-top: 4px;">Last saved: 2 days ago</div>
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <button class="btn-primary" style="padding: 6px 16px; font-size: 12px; border: none; border-radius: 8px;">Continue</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Upcoming Deadlines & Activity -->
                <div class="card investment-card">
                    <div class="card-header">
                        <div class="card-title">Recent Activity</div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 16px;">
                        <div style="display: flex; gap: 12px;">
                            <div style="display: flex; flex-direction: column; align-items: center;">
                                <div style="width: 10px; height: 10px; border-radius: 50%; background: #3b82f6; margin-top: 4px;"></div>
                                <div style="width: 2px; height: 100%; background: var(--border-color); flex: 1; margin-top: 4px;"></div>
                            </div>
                            <div style="padding-bottom: 16px;">
                                <div style="font-size: 13px; font-weight: 600; color: var(--text-dark);">Application Submitted</div>
                                <div style="font-size: 11px; color: var(--text-light); margin-top: 2px;">Oct 08, 2026 - 10:30 AM</div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 12px;">
                            <div style="display: flex; flex-direction: column; align-items: center;">
                                <div style="width: 10px; height: 10px; border-radius: 50%; background: #10b981; margin-top: 4px;"></div>
                                <div style="width: 2px; height: 100%; background: var(--border-color); flex: 1; margin-top: 4px;"></div>
                            </div>
                            <div style="padding-bottom: 16px;">
                                <div style="font-size: 13px; font-weight: 600; color: var(--text-dark);">Payment Confirmed</div>
                                <div style="font-size: 11px; color: var(--text-light); margin-top: 2px;">Oct 08, 2026 - 10:15 AM</div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 12px;">
                            <div style="display: flex; flex-direction: column; align-items: center;">
                                <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--border-color); margin-top: 4px;"></div>
                            </div>
                            <div>
                                <div style="font-size: 13px; font-weight: 600; color: var(--text-dark);">Account Created</div>
                                <div style="font-size: 11px; color: var(--text-light); margin-top: 2px;">Oct 01, 2026</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    
"""
    # end_idx is where <!-- Create Form Modal Overlay --> is.
    # so we replace from start_idx up to end_idx - 3 (to cover the two closing divs)
    
    out_lines = lines[:start_idx] + [new_content] + lines[end_idx:]
    with open('candidate-dashboard.html', 'w') as f:
        f.writelines(out_lines)
    print("Done")
else:
    print("Not found", start_idx, end_idx)
