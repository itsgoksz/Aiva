import os

replacements = {
    "Hair & Care": "Hair & Care",
    "Hair &amp; Care": "Hair &amp; Care",
    "Hair and Care": "Hair and Care",
    "hair & care": "hair & care",
    "hair and care": "hair and care"
}

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        for old, new in replacements.items():
            new_content = new_content.replace(old, new)
            
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
    except Exception as e:
        pass

for root, dirs, files in os.walk("/Users/gokulgautham/Aiva"):
    # skip common hidden/dependency dirs
    dirs[:] = [d for d in dirs if d not in ('.git', 'node_modules', 'venv', '__pycache__', '.next', '.pytest_cache')]
    for file in files:
        if file.endswith(('.ts', '.tsx', '.py', '.html', '.css', '.md', '.json')):
            replace_in_file(os.path.join(root, file))
