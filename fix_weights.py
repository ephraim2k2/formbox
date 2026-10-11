import re

with open("styles.css", "r") as f:
    content = f.read()

content = content.replace("family=Inter:wght@400;500;600;700", "family=Inter:wght@300;400;500;600;700")

# Map weights
replacements = {
    r"font-weight:\s*700\s*;": "font-weight: 500;",
    r"font-weight:\s*600\s*;": "font-weight: 400;",
    r"font-weight:\s*500\s*;": "font-weight: 400;",
    r"font-weight:\s*400\s*;": "font-weight: 300;",
    r"font-weight:\s*bold\s*;": "font-weight: 500;"
}

for pattern, repl in replacements.items():
    content = re.sub(pattern, repl, content)

with open("styles.css", "w") as f:
    f.write(content)
