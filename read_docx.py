import zipfile
import xml.etree.ElementTree as ET

def read_docx(path):
    try:
        with zipfile.ZipFile(path) as docx:
            tree = ET.fromstring(docx.read('word/document.xml'))
            namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            text = []
            for p in tree.findall('.//w:p', namespaces):
                p_text = ''.join(node.text for node in p.findall('.//w:t', namespaces) if node.text)
                text.append(p_text)
            return '\n'.join(text)
    except Exception as e:
        return f"Error: {e}"

content = read_docx(r'c:\Rishabh\ExpenseTracker\baseline\expense_tracker_blueprint.docx')
with open(r'c:\Rishabh\ExpenseTracker\docx_content.txt', 'w', encoding='utf-8') as f:
    f.write(content)
