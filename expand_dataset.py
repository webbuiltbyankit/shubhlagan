import os
import shutil
import json
import csv
import zipfile
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = "Shubhlagn_Sarees"

# Clean and rebuild directory tree
if os.path.exists(BASE_DIR):
    shutil.rmtree(BASE_DIR)

dirs = [
    f"{BASE_DIR}/profile/logo",
    f"{BASE_DIR}/products",
    f"{BASE_DIR}/images/original",
    f"{BASE_DIR}/images/products",
    f"{BASE_DIR}/images/collections",
    f"{BASE_DIR}/images/homepage_candidates",
    f"{BASE_DIR}/images/brand_assets",
    f"{BASE_DIR}/videos/thumbnails",
    f"{BASE_DIR}/videos/authorized_downloads",
    f"{BASE_DIR}/posts",
    f"{BASE_DIR}/reference",
    f"{BASE_DIR}/reports"
]

for d in dirs:
    os.makedirs(d, exist_ok=True)

print("Initialized clean directory tree.")

# Copy Logo
shutil.copy("profile_logo_900.jpg", f"{BASE_DIR}/profile/logo/shubhlagn_sarees_logo.jpg")
shutil.copy("profile_logo_900.jpg", f"{BASE_DIR}/images/brand_assets/shubhlagn_sarees_logo_900x900.jpg")

# 1. Load the First 25 Products (Video Showcase & Social Retail Drops)
with open("generate_core_assets.py") as f:
    core_text = f.read()

# We already have the 25 products from our previous verified run
products_p1 = json.load(open("download_log.json")) # we can load from products.json if it existed, or re-instantiate
# Let's read from the previously generated products.json
with open("extracted_shorts.json") as f:
    shorts_data = json.load(f)

# 2. Load the 17 Digital Storefront Products
digital_products_raw = json.load(open("detailed_storefront_products.json"))

# Let's build the unified 42 products catalog
# Products 1-25: Social & Video Showcase Products
# Products 26-42: Digital Storefront Catalog Products (Exact fabrics, MRP, Selling Price, SKUs, Dimensions)

# Load existing 25 products from generate_core_assets.py by running a small script or re-defining

