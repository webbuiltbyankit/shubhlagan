import os
import json
import re

# Load digital products
with open("detailed_storefront_products.json") as f:
    digital_raw = json.load(f)

# Fabric parser helper
def extract_fabric_details(desc):
    if not desc:
        return {}
    clean = re.sub(r'<[^>]+>', ' ', desc).strip()
    fabric_m = re.search(r'Premium Fabric:\s*([^.]+)\.', clean)
    style_m = re.search(r'Stylish Design:\s*([^.]+)\.', clean)
    occasion_m = re.search(r'Versatile Wear:\s*([^.]+)\.', clean)
    care_m = re.search(r'Care Instructions:\s*([^.]+)\.', clean)
    return {
        "fabric_clean": fabric_m.group(1).strip() if fabric_m else None,
        "style_clean": style_m.group(1).strip() if style_m else None,
        "occasion_clean": occasion_m.group(1).strip() if occasion_m else None,
        "care_clean": care_m.group(1).strip() if care_m else "Dry Clean Only recommended"
    }

print("Loaded digital products:", len(digital_raw))
for i, p in enumerate(digital_raw):
    det = extract_fabric_details(p.get("description", ""))
    print(f"[{i+1}] {p['title']} | Fabric: {det.get('fabric_clean')}")

