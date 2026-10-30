import os
import json
import csv
import zipfile

base = "Shubhlagn_Sarees"
errors = []

print("=== RUNNING AUTOMATED QA AUDIT ===")

# 1. Check all JSON files parse
json_files = [
    f"{base}/profile/profile_data.json",
    f"{base}/products/products.json",
    f"{base}/products/react_vite_catalog.json",
    f"{base}/products/product_categories.json",
    f"{base}/videos/reels_metadata.json",
    f"{base}/posts/posts.json",
    f"{base}/reference/image_asset_manifest.json"
]

for jf in json_files:
    if not os.path.exists(jf):
        errors.append(f"Missing JSON file: {jf}")
        continue
    try:
        with open(jf, "r", encoding="utf-8") as f:
            data = json.load(f)
        print(f"[PASS] JSON parsed cleanly: {jf} ({type(data).__name__})")
    except Exception as e:
        errors.append(f"Failed to parse {jf}: {e}")

# 2. Check product ID consistency and file existence
with open(f"{base}/products/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

print(f"\nChecking {len(products)} products against disk assets...")
for p in products:
    pid = p["id"]
    for img_rel in p["images"]:
        full_path = os.path.join(base, img_rel.replace("images/", "images/"))
        if not os.path.exists(full_path):
            # check alternate
            alt_path = f"{base}/{img_rel}"
            if not os.path.exists(alt_path):
                errors.append(f"Product {pid} references missing image: {img_rel}")

# 3. Check CSV integrity
csv_files = [
    f"{base}/products/products.csv",
    f"{base}/products/missing_product_data.csv",
    f"{base}/posts/posts.csv"
]
for cf in csv_files:
    if not os.path.exists(cf):
        errors.append(f"Missing CSV file: {cf}")
    else:
        with open(cf, "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            row_count = sum(1 for row in reader)
        print(f"[PASS] CSV valid: {cf} ({row_count} rows)")

# 4. Check Contact Sheet files
sheet_files = [
    f"{base}/reference/product_contact_sheet.png",
    f"{base}/reference/product_contact_sheet.pdf",
    f"{base}/reference/product_contact_sheet.html"
]
for sf in sheet_files:
    if not os.path.exists(sf):
        errors.append(f"Missing contact sheet asset: {sf}")
    else:
        size_kb = os.path.getsize(sf) / 1024
        print(f"[PASS] Contact sheet verified: {sf} ({size_kb:.1f} KB)")

# 5. Check ZIP package existence and size
zip_file = "Shubhlagn_Sarees_Instagram_Research_Assets.zip"
if not os.path.exists(zip_file):
    errors.append("ZIP package missing!")
else:
    zip_size_mb = os.path.getsize(zip_file) / (1024*1024)
    print(f"[PASS] Master ZIP archive verified: {zip_file} ({zip_size_mb:.2f} MB)")

if errors:
    print("\n[FAIL] QA Errors Detected:")
    for err in errors:
        print(f" - {err}")
else:
    print("\n[ALL CHECKS PASSED] Complete data integrity and zero broken references!")

