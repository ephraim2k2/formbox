import os
import re

def update_chart(filepath):
    if not os.path.exists(filepath):
        return
        
    with open(filepath, 'r') as f:
        content = f.read()
        
    # Replace labels
    old_labels = '''<div class="chart-labels">
                    <span>1 Apr</span>
                    <span>5 Apr</span>
                    <span>10 Apr</span>
                    <span>15 Apr</span>
                    <span>20 Apr</span>
                    <span>25 Apr</span>
                    <span>30 Apr</span>
                </div>'''
    
    new_labels = '''<div class="chart-labels" style="justify-content: space-around;">
                    <span>Admission</span>
                    <span>Registration</span>
                    <span>Job App</span>
                    <span>Scholarship</span>
                    <span>Survey</span>
                    <span>Feedback</span>
                    <span>Leave</span>
                </div>'''
    content = content.replace(old_labels, new_labels)
    
    # Replace logic
    old_logic = '''function renderChartData(daysCount = 30) {
            barsWrapper.innerHTML = '';

            const chartData = Array.from({ length: daysCount }, (_, i) => {
                const baseValue = 400 + Math.sin(i / 2.5) * 280 + Math.random() * 220; // Nice Metronic wave curve
                return {
                    day: `Day ${i + 1}`,
                    value: Math.floor(baseValue),
                    growth: (Math.random() * 8 - 3).toFixed(1)
                };
            });'''
            
    new_logic = '''function renderChartData(timeframe = '30D') {
            barsWrapper.innerHTML = '';

            const forms = ['Admission', 'Registration', 'Job App', 'Scholarship', 'Survey', 'Feedback', 'Leave'];
            const chartData = forms.map((formName, i) => {
                const baseValue = 1500 + Math.sin(i * 1.5) * 800 + Math.random() * 500;
                let multiplier = timeframe === '30D' ? 1 : timeframe === '7D' ? 0.25 : 3;
                return {
                    form: formName,
                    value: Math.floor(baseValue * multiplier),
                    growth: (Math.random() * 12 - 4).toFixed(1)
                };
            });'''
    content = content.replace(old_logic, new_logic)
    
    # Replace tooltip
    old_tooltip = '''document.getElementById('tooltipDate').innerText = dataPoint.day + ', April 2026';'''
    new_tooltip = '''document.getElementById('tooltipDate').innerText = dataPoint.form;'''
    content = content.replace(old_tooltip, new_tooltip)
    
    # Replace initial call
    content = content.replace('renderChartData(30);', "renderChartData('30D');")
    
    # Replace tab logic
    old_tab_logic = '''const days = tab.innerText === '7D' ? 7 : (tab.innerText === '90D' ? 45 : 30);
                renderChartData(days);'''
    new_tab_logic = '''renderChartData(tab.innerText);'''
    content = content.replace(old_tab_logic, new_tab_logic)
    
    with open(filepath, 'w') as f:
        f.write(content)
        
update_chart('/Users/mac/Desktop/formboxx/index.html')
update_chart('/Users/mac/Desktop/formboxx/react-app/public/pages/index.html')
