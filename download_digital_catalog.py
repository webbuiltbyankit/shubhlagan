import urllib.request
import json
import os

with open('all_17_digital_catalog_products.json') as f:
    products = json.load(f)

os.makedirs('downloaded_assets/digital_catalog', exist_ok=True)

download_results = []

for idx, p in enumerate(products):
    pid = f"SHL-{26 + idx:04d}"
    imgs = p.get('image_urls', [])
    print(f"Downloading images for {pid}: {p['title']} ({len(imgs)} images)...")
    
    local_images = []
    for img_idx, url in enumerate(imgs):
        suffix = "main" if img_idx == 0 else f"gallery_{img_idx+1:02d}"
        local_filename = f"{pid}_{suffix}.jpg"
        local_path = f"downloaded_assets/digital_catalog/{local_filename}"
        
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=15) as resp:
                content = resp.read()
                with open(local_path, 'wb') as out:
                    out.write(content)
                local_images.append(local_path)
                print(f"  Saved {local_filename} ({len(content)} bytes)")
        except Exception as e:
            print(f"  Error downloading {url}: {e}")
            
    download_results.append({
        'id': pid,
        'title': p['title'],
        'local_images': local_images
    })

with open('digital_download_results.json', 'w') as f:
    json.dump(download_results, f, indent=2)

print("Finished downloading all digital catalog images!")

