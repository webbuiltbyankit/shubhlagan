import urllib.request
import re
import json

req = urllib.request.Request('https://shubhlagn.co.in', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Save full html to inspect
with open('shubhlagn_homepage.html', 'w') as f:
    f.write(html)

scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
print(f'Total script tags found: {len(scripts)}')

for i in [5, 7, 8, 9, 43]:
    if i < len(scripts):
        s = scripts[i]
        print(f'=== Script {i} (len {len(s)}) ===')
        print(s[:400])
        print('--- END PREVIEW ---')

