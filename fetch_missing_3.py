import urllib.request
import re

urls = [
    ('SHL-0027', 'https://shubhlagn.co.in/Cream-Fandy-Saree-For-Women/catalogue/r0N1SSXv9iJ3/04SzKfXU'),
    ('SHL-0028', 'https://shubhlagn.co.in/Red-Fandy-Saree-For-Women/catalogue/ShtCwUphR-kE/YWzllk8L'),
    ('SHL-0029', 'https://shubhlagn.co.in/Multicolor-Chinon-Saree-For-Women/catalogue/FLS3JyJrqrsB/vVPRFlSf')
]

for pid, u in urls:
    req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
        matches = re.findall(r'https://d1311wbk6unapo\.cloudfront\.net[^\s"\'<>]*cat_img[^\s"\'<>]*\.jpg', html)
        unique_matches = []
        for m in matches:
            clean = m.split('\\')[0].split('"')[0]
            if clean not in unique_matches:
                unique_matches.append(clean)
        print(f"PID: {pid} found {len(unique_matches)} images:")
        for idx, img_url in enumerate(unique_matches[:2]):
            print(f"  {img_url}")
            suffix = "main" if idx == 0 else f"gallery_{idx+1:02d}"
            save_path = f"downloaded_assets/digital_catalog/{pid}_{suffix}.jpg"
            img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(img_req, timeout=10) as r:
                with open(save_path, 'wb') as f:
                    f.write(r.read())
            print(f"  Saved {save_path}")
    except Exception as e:
        print(f"Error for {pid}: {e}")

