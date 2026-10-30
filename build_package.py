import os
import shutil
import json
import csv
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = "Shubhlagn_Sarees"

# Ensure all subdirectories exist
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

print("Created directories successfully!")

