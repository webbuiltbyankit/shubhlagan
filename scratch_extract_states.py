import re
import json

with open('shubhlagn_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Match window.__SERVER_APP_STATE__ = { ... }
m = re.search(r'window\.__SERVER_APP_STATE__\s*=\s*(\{.*?\});?\s*(?:window\.|<\/script>)', html, re.DOTALL)
if m:
    try:
        data = json.loads(m.group(1))
        with open('server_app_state.json', 'w', encoding='utf-8') as out:
            json.dump(data, out, indent=2)
        print('Saved server_app_state.json successfully!')
        print('Keys in server_app_state:', list(data.keys()))
    except Exception as e:
        print('Error parsing server_app_state JSON:', e)
else:
    print('window.__SERVER_APP_STATE__ regex did not match, trying alternative extraction')

m2 = re.search(r'window\.__PRELOADED_STATE__\s*=\s*(\{.*?\});?\s*(?:window\.|<\/script>)', html, re.DOTALL)
if m2:
    try:
        data2 = json.loads(m2.group(1))
        with open('preloaded_state.json', 'w', encoding='utf-8') as out:
            json.dump(data2, out, indent=2)
        print('Saved preloaded_state.json successfully!')
        print('Keys in preloaded_state:', list(data2.keys()))
    except Exception as e:
        print('Error parsing preloaded_state JSON:', e)

