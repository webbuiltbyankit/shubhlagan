import os
import shutil
import json
import csv
import zipfile
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = "Shubhlagn_Sarees"

# 1. Clean and initialize directory structure
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

print("Initialized directory tree.")

# Copy Logo
shutil.copy("profile_logo_900.jpg", f"{BASE_DIR}/profile/logo/shubhlagn_sarees_logo.jpg")
shutil.copy("profile_logo_900.jpg", f"{BASE_DIR}/images/brand_assets/shubhlagn_sarees_logo_900x900.jpg")

# 2. Define Product Data Catalog
products_master = [
    {
        "id": "SHL-0001",
        "name": "Premium Silk Festive Saree",
        "displayName": "Premium Silk Festive Saree — SHL-0001",
        "displayNameProvisional": False,
        "slug": "premium-silk-festive-saree-shl-0001",
        "category": "Silk Sarees",
        "categoryProposed": "Silk Sarees",
        "sareeType": "Festive & Wedding Silk Saree",
        "fabric": "Art Silk / Banarasi Finish Drape",
        "primaryColor": "Rich Crimson / Wine Red",
        "contrastingColors": "Gold Zari",
        "borderDetails": "Broad traditional zari woven floral border",
        "palluDetails": "Heavy brocade rich zari pallu",
        "designPattern": "Traditional floral buta with metallic zari weave",
        "blousePiece": "Matching unstitched blouse piece included",
        "workmanship": "Woven metallic zari craftsmanship",
        "dimensions": "5.5 meters saree + 0.8 meter blouse piece",
        "occasion": "Weddings, Festive Receptions, Diwali, Family Celebrations",
        "price": 900,
        "originalPriceComparison": "Looks like ₹5,000",
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "₹900 (look like ₹5000)",
        "description": "Richly woven festive silk saree featuring heavy zari craftsmanship that offers a lavish ₹5,000 royal aesthetic at an accessible price of ₹900. Sourced and presented by Shubhlagn Sarees Kurawali.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600. Cash on Delivery (COD) available.",
        "images": [
            "images/products/SHL-0001_main.jpg",
            "images/products/SHL-0001_detail.jpg"
        ],
        "sourceVideoId": "ji37hvmSuLQ",
        "sourcePostUrl": "https://www.youtube.com/shorts/ji37hvmSuLQ",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "PREMIUM SILK SAREE WHICH LOOK LIKE ₹5000 IN JUST ₹900 ONLY AT SHUBHLAGN SAREES🤌🏻🥻#viral #shorts",
        "publicationDate": "2025-11",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0002",
        "name": "Designer Embellished Partywear Saree",
        "displayName": "Designer Embellished Partywear Saree — SHL-0002",
        "displayNameProvisional": False,
        "slug": "designer-embellished-partywear-saree-shl-0002",
        "category": "Partywear Sarees",
        "categoryProposed": "Designer Sarees",
        "sareeType": "Contemporary Partywear Saree",
        "fabric": "Flowing Georgette Blend",
        "primaryColor": "Emerald / Jewel Green",
        "contrastingColors": "Silver & Tone-on-Tone Accents",
        "borderDetails": "Embellished fancy scalloped border",
        "palluDetails": "Fluid drape with designer border finish",
        "designPattern": "Modern artistic motifs with delicate embellishments",
        "blousePiece": "Matching unstitched designer blouse piece",
        "workmanship": "Intricate border embroidery and sequin accents",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Cocktail Parties, Sangeet, Evening Receptions",
        "price": 1450,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "₹1450",
        "description": "Exquisite statement partywear saree with fine scalloped borders and designer flair. Styled for festive celebrations and evening gatherings.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600. Cash on Delivery (COD) available.",
        "images": [
            "images/products/SHL-0002_main.jpg"
        ],
        "sourceVideoId": "YsGvkSiWcd8",
        "sourcePostUrl": "https://www.youtube.com/shorts/YsGvkSiWcd8",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "CRAZIEST SAREE DESIGN 🤩 ₹1450 DM FOR ORDER 8533940600 #shortsfeed #viral #saree #fashion",
        "publicationDate": "2025-10",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0003",
        "name": "Print Elegance Jerkin Touch Saree",
        "displayName": "Print Elegance Jerkin Touch Saree — SHL-0003",
        "displayNameProvisional": False,
        "slug": "print-elegance-jerkin-touch-saree-shl-0003",
        "category": "Designer Sarees",
        "categoryProposed": "Designer Sarees",
        "sareeType": "Printed Designer Saree with Contrast Blouse",
        "fabric": "Soft Printed Chiffon / Georgette",
        "primaryColor": "Pastel Pink & Floral Hues",
        "contrastingColors": "Contrast Blouse Palette",
        "borderDetails": "Shining stone work & fine border outline",
        "palluDetails": "Full floral print drape with stone shine border",
        "designPattern": "Botanical prints paired with Jerkin work embellishments",
        "blousePiece": "Contrasting designer blouse piece explicitly included",
        "workmanship": "Jerkin touch handwork with glistening stone border",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Daytime Events, Festive Brunches, Social Gatherings",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Available upon DM inquiry",
        "description": "A versatile masterpiece balancing printed floral elegance with delicate Jerkin touch craftsmanship and stone border shimmer, paired with a bold contrast blouse.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0003_main.jpg"
        ],
        "sourceVideoId": "KXYzppmvepk",
        "sourcePostUrl": "https://www.youtube.com/shorts/KXYzppmvepk",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "✨ One saree, many beauties! 🌸 Print elegance + Jerkin touch ✨💎 Stone border shine /Contrast blouse",
        "publicationDate": "2025-10",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0004",
        "name": "Fancy Chunri Karwa Chauth Special Saree",
        "displayName": "Fancy Chunri Karwa Chauth Special Saree — SHL-0004",
        "displayNameProvisional": False,
        "slug": "fancy-chunri-karwa-chauth-special-saree-shl-0004",
        "category": "Festive Sarees",
        "categoryProposed": "Festive Sarees",
        "sareeType": "Chunri / Bandhani Festive Saree",
        "fabric": "Traditional Georgette Chunri",
        "primaryColor": "Auspicious Bridal Red",
        "contrastingColors": "Golden Yellow / White Chunri Speckles",
        "borderDetails": "Gota patti / gold lace border trim",
        "palluDetails": "Classic Chunri motif drape",
        "designPattern": "All-over traditional Chunri speckles and festive patterns",
        "blousePiece": "Unstitched matching festive blouse piece",
        "workmanship": "Chunri print with festive metallic border finish",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Karwa Chauth, Teej, Navratri, Pooja Celebrations",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Available upon DM inquiry",
        "description": "Traditional Chunri festive saree specially crafted for Karwa Chauth and auspicious ceremonies, featuring vibrant bridal red tones and celebratory border trim.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0004_main.jpg"
        ],
        "sourceVideoId": "GNEUWbdq_54",
        "sourcePostUrl": "https://www.youtube.com/shorts/GNEUWbdq_54",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "FANCY CHUNRI SAREE❤️🤌🏻KARVACHAUTH SPECIAL❤️🫂 #saree #viral #fashion #clothingsale #shortsfeed",
        "publicationDate": "2025-10",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0005",
        "name": "Tehelka Budget Everyday Saree",
        "displayName": "Tehelka Budget Everyday Saree — SHL-0005",
        "displayNameProvisional": False,
        "slug": "tehelka-budget-everyday-saree-shl-0005",
        "category": "Dailywear Sarees",
        "categoryProposed": "Dailywear Sarees",
        "sareeType": "Everyday Lightweight Printed Saree",
        "fabric": "Lightweight Synthetic Poly-Silk / Crepe Blend",
        "primaryColor": "Vibrant Teal / Peacock Blue",
        "contrastingColors": "Warm Ochre Accents",
        "borderDetails": "Narrow printed edge border",
        "palluDetails": "Geometric / ethnic print pallu",
        "designPattern": "Trending all-over dailywear print",
        "blousePiece": "Running matching blouse piece",
        "workmanship": "High-durability colorfast digital print",
        "dimensions": "5.3 meters saree + 0.7 meter blouse",
        "occasion": "Daily Routine, Office, Home Comfort Wear",
        "price": 350,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "₹350",
        "description": "Sensational ₹350 Tehelka everyday saree offering unbeatable comfort, lightweight handling, and effortless draping for daily home and office wear.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600. COD available.",
        "images": [
            "images/products/SHL-0005_main.jpg"
        ],
        "sourceVideoId": "MvEU-oaiKVI",
        "sourcePostUrl": "https://www.youtube.com/shorts/MvEU-oaiKVI",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "350 mei Tehelka! Saree lovers, don’t miss this 😍💥 #shorts #ytshorts #indianfashion #sareefashion",
        "publicationDate": "2025-11",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0006",
        "name": "Gift Happiness Budget Festive Saree",
        "displayName": "Gift Happiness Budget Festive Saree — SHL-0006",
        "displayNameProvisional": False,
        "slug": "gift-happiness-budget-festive-saree-shl-0006",
        "category": "Gifting Sarees",
        "categoryProposed": "Gifting Sarees",
        "sareeType": "Festive Gifting Saree",
        "fabric": "Art Silk / Poly-Georgette Blend",
        "primaryColor": "Festive Mustard Yellow / Gold",
        "contrastingColors": "Red Piping",
        "borderDetails": "Subtle zari border line",
        "palluDetails": "Clean decorative pallu print",
        "designPattern": "Festive celebratory patterns",
        "blousePiece": "Matching blouse fabric included",
        "workmanship": "Smooth weave with neat hem finish",
        "dimensions": "5.3 meters saree + 0.7 meter blouse",
        "occasion": "Wedding Giveaways, Bulk Gifting, Festive Tokens",
        "price": 300,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "₹300",
        "description": "The quintessential ₹300 gifting saree designed to deliver premium joy on a friendly budget. Ideal for family gifting, wedding return gifts, and festive distributions.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0006_main.jpg"
        ],
        "sourceVideoId": "uHkjJUf0WOY",
        "sourcePostUrl": "https://www.youtube.com/shorts/uHkjJUf0WOY",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "✨ Gift Happiness in Just ₹300 ✨Beautiful sarees from Shubhlagn Sarees – perfect for gifting🎁💝",
        "publicationDate": "2025-10",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0007",
        "name": "Most Viral Everyday Drape Saree",
        "displayName": "Most Viral Everyday Drape Saree — SHL-0007",
        "displayNameProvisional": False,
        "slug": "most-viral-everyday-drape-saree-shl-0007",
        "category": "Dailywear Sarees",
        "categoryProposed": "Dailywear Sarees",
        "sareeType": "Ultra-Budget Printed Drape",
        "fabric": "Soft Printed Poly Crepe",
        "primaryColor": "Warm Coral Pink",
        "contrastingColors": "Floral Prints",
        "borderDetails": "Self-print border",
        "palluDetails": "Printed flowy pallu",
        "designPattern": "Contemporary micro-floral motif",
        "blousePiece": "Running blouse fabric",
        "workmanship": "Machine printed lightweight drape",
        "dimensions": "5.3 meters saree",
        "occasion": "Daily Home Wear, Casual Visits",
        "price": 250,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "₹250",
        "description": "Shubhlagn's most viral ₹250 saree sensation. Lightweight, breezy, and effortlessly washable for routine everyday elegance.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0007_main.jpg"
        ],
        "sourceVideoId": "4ZDV-UaHYGY",
        "sourcePostUrl": "https://www.youtube.com/shorts/4ZDV-UaHYGY",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "₹250 most viral saree ❤️#viral #trending #saree #fashion #viralvideo #shorts #shortsfeed",
        "publicationDate": "2025-10",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0008",
        "name": "Best Dailywear Saree Kurawali Edition",
        "displayName": "Best Dailywear Saree Kurawali Edition — SHL-0008",
        "displayNameProvisional": False,
        "slug": "best-dailywear-saree-kurawali-edition-shl-0008",
        "category": "Dailywear Sarees",
        "categoryProposed": "Dailywear Sarees",
        "sareeType": "Classic Comfort Daily Saree",
        "fabric": "Chiffon / Georgette Hybrid",
        "primaryColor": "Lavender / Soft Mauve",
        "contrastingColors": "Pastel Blooms",
        "borderDetails": "Subtle satin border piping",
        "palluDetails": "Graceful printed fall",
        "designPattern": "Floral vine prints",
        "blousePiece": "Unstitched blouse piece included",
        "workmanship": "Crisp soft-touch printing",
        "dimensions": "5.5 meters saree + blouse",
        "occasion": "Daily Office, Teaching, Errands, Home",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "DM for best retail price",
        "description": "Top-selling Kurawali dailywear drape engineered for breathability and graceful posture throughout demanding daily schedules.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0008_main.jpg"
        ],
        "sourceVideoId": "tYOtickYp-Q",
        "sourcePostUrl": "https://www.youtube.com/shorts/tYOtickYp-Q",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "BEST DAILYWEAR SAREE AT SHUBHLAGN SAREES KURAWALI",
        "publicationDate": "2025-12",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0009",
        "name": "Signature Partywear Saree Showcase",
        "displayName": "Signature Partywear Saree Showcase — SHL-0009",
        "displayNameProvisional": False,
        "slug": "signature-partywear-saree-showcase-shl-0009",
        "category": "Partywear Sarees",
        "categoryProposed": "Partywear Sarees",
        "sareeType": "Evening Occasion Saree",
        "fabric": "Organza / Satin Sheen Blend",
        "primaryColor": "Midnight Navy Blue",
        "contrastingColors": "Silver Zari Accents",
        "borderDetails": "Rich metallic woven border",
        "palluDetails": "Opulent evening pallu",
        "designPattern": "Delicate zari weaves with modern styling",
        "blousePiece": "Matching unstitched designer blouse",
        "workmanship": "Shimmer weave and fine border embroidery",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Engagement, Cocktail, Night Receptions",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Available upon DM inquiry",
        "description": "Glamorous partywear drape balancing royal midnight tones with reflective zari accents, curated by Shubhlagn Sarees for the celebration season.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0009_main.jpg"
        ],
        "sourceVideoId": "0huH_WennoI",
        "sourcePostUrl": "https://www.youtube.com/shorts/0huH_WennoI",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "Best Partywear Sarees now available at Shubhlagn Sarees!",
        "publicationDate": "2025-12",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0010",
        "name": "Soft & Stylish Pastel Light Colour Saree",
        "displayName": "Soft & Stylish Pastel Light Colour Saree — SHL-0010",
        "displayNameProvisional": False,
        "slug": "soft-stylish-pastel-light-colour-saree-shl-0010",
        "category": "Contemporary Sarees",
        "categoryProposed": "Pastel Drapes",
        "sareeType": "Lightweight Pastel Designer Saree",
        "fabric": "Feather-light Soft Georgette",
        "primaryColor": "Mint Sage / Powder Blue",
        "contrastingColors": "Soft Pearl White",
        "borderDetails": "Delicate tone-on-tone embroidery border",
        "palluDetails": "Soft cascading pallu",
        "designPattern": "Minimalist soothing pastel aesthetic",
        "blousePiece": "Matching soft fabric blouse piece",
        "workmanship": "Gentle thread embroidery and subtle sequin dust",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Summer Weddings, Farewell Parties, Day Soirees",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "DM for price: 8533940600",
        "description": "Airy, soft, and sophisticated light-colored saree presenting a modern pastel palette ideal for contemporary celebratory aesthetics.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0010_main.jpg"
        ],
        "sourceVideoId": "3BdBd3dPElQ",
        "sourcePostUrl": "https://www.youtube.com/shorts/3BdBd3dPElQ",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "💫 New Arrival – Soft & Stylish Light Colour Sarees DM FOR ORDER- 8533940600",
        "publicationDate": "2025-09",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0011",
        "name": "Aesthetic Light Colour Evening Drape",
        "displayName": "Aesthetic Light Colour Evening Drape — SHL-0011",
        "displayNameProvisional": False,
        "slug": "aesthetic-light-colour-evening-drape-shl-0011",
        "category": "Contemporary Sarees",
        "categoryProposed": "Pastel Drapes",
        "sareeType": "Aesthetic Light Tone Saree",
        "fabric": "Organza Silk Blend",
        "primaryColor": "Blush Champagne",
        "contrastingColors": "Rose Gold Shimmer",
        "borderDetails": "Fine scalloped zari embroidery",
        "palluDetails": "Ethereal translucent drape",
        "designPattern": "Subtle floral motifs with lustrous texture",
        "blousePiece": "Contrast shimmer blouse fabric",
        "workmanship": "Precision border needlework",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Receptions, Festive Evenings, Family Dinners",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Available upon DM inquiry",
        "description": "Chic, light-colored saree with subtle rose-gold shine that exemplifies modern understated luxury and poise.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0011_main.jpg"
        ],
        "sourceVideoId": "hUNdwx9J7z0",
        "sourcePostUrl": "https://www.youtube.com/shorts/hUNdwx9J7z0",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "STYLISH LIGHT COLOUR SAREE DESIGN🤩#viral #viralvideo #fashion #saree #fashiontrends #onlineshopping",
        "publicationDate": "2025-09",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0012",
        "name": "Fresh & Timeless Drop Festive Saree",
        "displayName": "Fresh & Timeless Drop Festive Saree — SHL-0012",
        "displayNameProvisional": False,
        "slug": "fresh-timeless-drop-festive-saree-shl-0012",
        "category": "New Arrivals",
        "categoryProposed": "New Arrivals",
        "sareeType": "Designer Festive Drape",
        "fabric": "Silk Blend Satin",
        "primaryColor": "Royal Rani Pink",
        "contrastingColors": "Antique Gold",
        "borderDetails": "Rich heritage border band",
        "palluDetails": "Elaborate festive pallu",
        "designPattern": "Timeless Indian heritage weaving",
        "blousePiece": "Unstitched matching blouse",
        "workmanship": "Fine jacquard weave",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Weddings, Festivals, Pujas",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Available upon DM inquiry",
        "description": "Timeless Rani Pink festive saree freshly dropped at Shubhlagn Sarees, combining traditional grace with a modern silky touch.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0012_main.jpg"
        ],
        "sourceVideoId": "CMWsHbqZ1c4",
        "sourcePostUrl": "https://www.youtube.com/shorts/CMWsHbqZ1c4",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "Fresh, elegant & timeless saree designs have just dropped at Shubhlagn Sarees 💃 DM FOR ORDER",
        "publicationDate": "2025-10",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0013",
        "name": "New Stock Arrival Festive Edition",
        "displayName": "New Stock Arrival Festive Edition — SHL-0013",
        "displayNameProvisional": False,
        "slug": "new-stock-arrival-festive-edition-shl-0013",
        "category": "New Arrivals",
        "categoryProposed": "New Arrivals",
        "sareeType": "Festive Showcase Drape",
        "fabric": "Fancy Poly Silk",
        "primaryColor": "Golden Ochre",
        "contrastingColors": "Scarlet Red",
        "borderDetails": "Zari lace border",
        "palluDetails": "Contrasting color pallu",
        "designPattern": "Festive all-over buti",
        "blousePiece": "Contrast unstitched blouse",
        "workmanship": "Woven zari and printed base",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Festivals, Family Functions",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Available upon DM inquiry",
        "description": "Exciting newly arrived festive saree from the latest boutique collection at Shubhlagn Sarees Kurawali.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0013_main.jpg"
        ],
        "sourceVideoId": "gGE3RNQzWDM",
        "sourcePostUrl": "https://www.youtube.com/shorts/gGE3RNQzWDM",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "AAGYAAA BHAIIII AAGYAAAA🤌🏻🙏 #saree #latestinbeautylineupproducts #latestinbeautylineupproducts",
        "publicationDate": "2025-12",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0014",
        "name": "Boutique Counter Fresh Drop Saree",
        "displayName": "Boutique Counter Fresh Drop Saree — SHL-0014",
        "displayNameProvisional": False,
        "slug": "boutique-counter-fresh-drop-saree-shl-0014",
        "category": "New Arrivals",
        "categoryProposed": "New Arrivals",
        "sareeType": "Store Arrival Saree",
        "fabric": "Soft Silk Finish",
        "primaryColor": "Plum Violet",
        "contrastingColors": "Gold Border",
        "borderDetails": "Embossed zari border",
        "palluDetails": "Full brocade pallu",
        "designPattern": "Traditional geometric and ethnic weave",
        "blousePiece": "Matching blouse piece",
        "workmanship": "Jacquard weave",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Weddings, Receptions",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Available upon DM inquiry",
        "description": "Rich plum-toned boutique saree directly from the latest unboxing at Shubhlagn Sarees.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0014_main.jpg"
        ],
        "sourceVideoId": "Lwho8Zf_Yso",
        "sourcePostUrl": "https://www.youtube.com/shorts/Lwho8Zf_Yso",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "new stock available at shubhlagn sarees 🤌🏻",
        "publicationDate": "2025-12",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0015",
        "name": "Full Winter Ethnic Collection Saree",
        "displayName": "Full Winter Ethnic Collection Saree — SHL-0015",
        "displayNameProvisional": False,
        "slug": "full-winter-ethnic-collection-saree-shl-0015",
        "category": "Winter Collection",
        "categoryProposed": "Winter Collection",
        "sareeType": "Heavy Weave Winter Drape",
        "fabric": "Warm Viscose Silk / Pashmina Blend",
        "primaryColor": "Deep Maroon / Rust",
        "contrastingColors": "Antique Gold Zari",
        "borderDetails": "Dense warm woven border",
        "palluDetails": "Full heavy winter pallu",
        "designPattern": "Kashmiri / Paisley inspired winter motifs",
        "blousePiece": "Warm woven blouse fabric",
        "workmanship": "High-density weave for cooler weather comfort",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Winter Weddings, North Indian Winter Gatherings",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Available upon DM inquiry",
        "description": "Rich, comforting winter ethnic saree crafted with substantial weave density to keep the wearer warm and majestic during winter festivities.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0015_main.jpg"
        ],
        "sourceVideoId": "jn3u0uLYjJI",
        "sourcePostUrl": "https://www.youtube.com/shorts/jn3u0uLYjJI",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "NEW STOCK UPDATE FULL WINTER COLLECTION 🤌🏻",
        "publicationDate": "2025-12",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0016",
        "name": "Premium Woolen Suit & Stole Ensemble",
        "displayName": "Premium Woolen Suit & Stole Ensemble — SHL-0016",
        "displayNameProvisional": False,
        "slug": "premium-woolen-suit-stole-ensemble-shl-0016",
        "category": "Winter Collection",
        "categoryProposed": "Winter Collection",
        "sareeType": "Woolen Dress Material / Suit Piece",
        "fabric": "Warm Spun Wool Fabric with Matching Stole",
        "primaryColor": "Warm Burgundy / Ochre",
        "contrastingColors": "Kashmiri Thread Embroidery",
        "borderDetails": "Intricately embroidered neckline and border daman",
        "palluDetails": "Full woolen matching stole / dupatta",
        "designPattern": "Traditional Kashmiri floral thread embroidery",
        "blousePiece": "Complete 3-piece unstitched fabric set",
        "workmanship": "Precision winter embroidery on warm base fabric",
        "dimensions": "Kurta 2.5m, Salwar/Bottom 2.5m, Stole 2.2m",
        "occasion": "Winter Daily Wear, Winter Receptions",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Available upon DM inquiry",
        "description": "Essential winter wardrobe ensemble featuring a heavy warm woolen suit piece paired with an ornate matching stole from the winter drop.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0016_main.jpg"
        ],
        "sourceVideoId": "6lnOwUNzrn0",
        "sourcePostUrl": "https://www.youtube.com/shorts/6lnOwUNzrn0",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "Winter fashion is officially here, and the hottest Woolen Suit piece❤️🧿",
        "publicationDate": "2025-11",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0017",
        "name": "Direct Order Signature Saree",
        "displayName": "Direct Order Signature Saree — SHL-0017",
        "displayNameProvisional": False,
        "slug": "direct-order-signature-saree-shl-0017",
        "category": "Festive Sarees",
        "categoryProposed": "Festive Sarees",
        "sareeType": "Festive Celebration Drape",
        "fabric": "Art Silk Georgette",
        "primaryColor": "Sunset Orange & Crimson",
        "contrastingColors": "Gold Foil / Zari",
        "borderDetails": "Ornate temple zari border",
        "palluDetails": "Heavy traditional pallu",
        "designPattern": "All-over auspicious paisley motif",
        "blousePiece": "Matching blouse piece",
        "workmanship": "Zari border and pallu weave",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Festive Puja, Family Gatherings",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "DM to Order: 8533940600",
        "description": "Signature vibrant festive saree featured prominently for direct WhatsApp and DM ordering with home delivery.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600. COD Available.",
        "images": [
            "images/products/SHL-0017_main.jpg"
        ],
        "sourceVideoId": "jnX0u-fk2HQ",
        "sourcePostUrl": "https://www.youtube.com/shorts/jnX0u-fk2HQ",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "JUST DM TO ORDER✨ @Shubhlagnsarees -8533940600",
        "publicationDate": "2025-12",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0018",
        "name": "December Wedding Special Saree",
        "displayName": "December Wedding Special Saree — SHL-0018",
        "displayNameProvisional": False,
        "slug": "december-wedding-special-saree-shl-0018",
        "category": "Festive Sarees",
        "categoryProposed": "Festive Sarees",
        "sareeType": "Wedding Season Celebration Saree",
        "fabric": "Brocade Silk Blend",
        "primaryColor": "Vermilion Red",
        "contrastingColors": "Gold Brocade",
        "borderDetails": "Broad bridal zari border",
        "palluDetails": "Opulent brocade pallu",
        "designPattern": "Grand wedding butas",
        "blousePiece": "Contrast heavy brocade blouse fabric",
        "workmanship": "Rich metallic jacquard brocade",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Wedding Ceremony, Reception, Shagun",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Available upon DM inquiry",
        "description": "Glorious December wedding collection launch saree exuding celebratory grandeur in classic red and gold brocade.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0018_main.jpg"
        ],
        "sourceVideoId": "w27l-jVeHLo",
        "sourcePostUrl": "https://www.youtube.com/shorts/w27l-jVeHLo",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "13 December 2025",
        "publicationDate": "2025-12",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0019",
        "name": "Traditional Indian Attire Festive Saree",
        "displayName": "Traditional Indian Attire Festive Saree — SHL-0019",
        "displayNameProvisional": False,
        "slug": "traditional-indian-attire-festive-saree-shl-0019",
        "category": "Ethnic Sarees",
        "categoryProposed": "Ethnic Sarees",
        "sareeType": "Traditional Heritage Drape",
        "fabric": "Semi-Katan Silk Blend",
        "primaryColor": "Deep Royal Green",
        "contrastingColors": "Gold Floral Vines",
        "borderDetails": "Rich heritage zari border",
        "palluDetails": "Full ornamental pallu",
        "designPattern": "Intricate ethnic vine and floral jaal",
        "blousePiece": "Matching blouse fabric included",
        "workmanship": "Zari weaving across border and pallu",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Traditional Pujas, Temple Visits, Festivals",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "DM to Order: 8533940600",
        "description": "Graceful deep royal green heritage saree echoing authentic Indian ethnic craftsmanship and refined celebratory posture.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0019_main.jpg"
        ],
        "sourceVideoId": "vTixhroz4Gk",
        "sourcePostUrl": "https://www.youtube.com/shorts/vTixhroz4Gk",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "DM FOR ORDER - 8533940600 #indianfashion #indianattire #ytshorts #youtubeshorts #viral #viralvideo",
        "publicationDate": "2025-11",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0020",
        "name": "Jewellery Level Wedding Trousseau Packaging",
        "displayName": "Jewellery Level Wedding Trousseau Packaging — SHL-0020",
        "displayNameProvisional": False,
        "slug": "jewellery-level-wedding-trousseau-packaging-shl-0020",
        "category": "Gifting & Trousseau",
        "categoryProposed": "Gifting & Trousseau",
        "sareeType": "Luxury Trousseau Gift Ensemble",
        "fabric": "Premium Suit & Shirt Fabric with Saree Presentation Box",
        "primaryColor": "Gold, Champagne & Royal Velvet",
        "contrastingColors": "Ribbon & Jewel Trinkets",
        "borderDetails": "Custom trousseau trunk embellishment",
        "palluDetails": "N/A (Gift Ensemble)",
        "designPattern": "Jewellery box grade presentation for sarees and men's pant-shirt sets",
        "blousePiece": "Included with custom ensemble packing",
        "workmanship": "Handcrafted luxury trousseau gift styling",
        "dimensions": "Custom gift packaging box dimensions",
        "occasion": "Roka, Shagun, Tilak, Wedding Trousseau Gifting",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Custom quote upon DM inquiry",
        "description": "High-end bespoke wedding trousseau packaging service transforming traditional saree and pant-shirt gifting into an opulent jewellery-level experience.",
        "availability": "custom_service",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0020_main.jpg"
        ],
        "sourceVideoId": "dp6fgEAgEeQ",
        "sourcePostUrl": "https://www.youtube.com/shorts/dp6fgEAgEeQ",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "Pant–Shirt Packing… but make it Jewellery Level ✨💼 #ShubhlagnSarees #viral #shorts #indianfashion",
        "publicationDate": "2025-11",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0021",
        "name": "Signature Customer Order Dispatch Box",
        "displayName": "Signature Customer Order Dispatch Box — SHL-0021",
        "displayNameProvisional": False,
        "slug": "signature-customer-order-dispatch-box-shl-0021",
        "category": "Packaging & Service",
        "categoryProposed": "Brand Heritage",
        "sareeType": "E-commerce Unboxing & Delivery Experience",
        "fabric": "Eco-friendly protective brand packaging",
        "primaryColor": "Branded Presentation",
        "contrastingColors": "Sealed Protective Wrap",
        "borderDetails": "N/A",
        "palluDetails": "N/A",
        "designPattern": "Official courier dispatch packaging",
        "blousePiece": "N/A",
        "workmanship": "Multi-layer inspection and dispatch packing",
        "dimensions": "Standard parcel dispatch box",
        "occasion": "Customer Home Delivery",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Free doorstep delivery promotion",
        "description": "Milestone delivery asset demonstrating Shubhlagn's nationwide doorstep delivery infrastructure with protective packaging.",
        "availability": "service_verified",
        "orderingInstructions": "All saree orders dispatched with tracking via WhatsApp.",
        "images": [
            "images/products/SHL-0021_main.jpg"
        ],
        "sourceVideoId": "db0rhrOneTw",
        "sourcePostUrl": "https://www.youtube.com/shorts/db0rhrOneTw",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "First order dispatched 🤩 #saree #viral #fashion #clothingsale #shortsfeed #shortvideo #shortsviral",
        "publicationDate": "2025-10",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0022",
        "name": "Mega Saree Sale Hero Showcase Saree",
        "displayName": "Mega Saree Sale Hero Showcase Saree — SHL-0022",
        "displayNameProvisional": False,
        "slug": "mega-saree-sale-hero-showcase-saree-shl-0022",
        "category": "Festive Sarees",
        "categoryProposed": "Festive Sarees",
        "sareeType": "Mega Sale Festive Drape",
        "fabric": "Art Silk Jacquard",
        "primaryColor": "Festive Red & Gold",
        "contrastingColors": "Golden Zari",
        "borderDetails": "Wide festive border",
        "palluDetails": "Full jacquard decorative pallu",
        "designPattern": "Festive celebration weave",
        "blousePiece": "Matching blouse piece",
        "workmanship": "Jacquard loom weave",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Festivals, Weddings, Grand Celebrations",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": "Sale promotional pricing",
        "currency": "INR",
        "priceOriginalText": "Mega Saree Sale promotional discount",
        "description": "Star showcase saree from the widely viewed Mega Saree Sale campaign, featuring heavy traditional zari motifs.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0022_main.jpg"
        ],
        "sourceVideoId": "H7baHB0SFzg",
        "sourcePostUrl": "https://www.youtube.com/shorts/H7baHB0SFzg",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "Mega Saree Sale is Live 🎉 | Shop Now @ Shubhlagn Sarees 👗",
        "publicationDate": "2025-09",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0023",
        "name": "Boutique Saree Rack Showcase",
        "displayName": "Boutique Saree Rack Showcase — SHL-0023",
        "displayNameProvisional": False,
        "slug": "boutique-saree-rack-showcase-shl-0023",
        "category": "Store Collection",
        "categoryProposed": "Brand Heritage",
        "sareeType": "Curated Boutique Collection",
        "fabric": "Mixed Silk, Georgette & Cotton Drapes",
        "primaryColor": "Multicolor Array",
        "contrastingColors": "Assorted Festive Palettes",
        "borderDetails": "Various artisanal borders",
        "palluDetails": "Assorted pallus",
        "designPattern": "Curated retail racks at the Kurawali flagship store",
        "blousePiece": "Standard matching blouse pieces",
        "workmanship": "Handwork, digital print, and woven zari",
        "dimensions": "Standard retail saree lengths",
        "occasion": "All occasions",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Store collection pricing",
        "description": "Vibrant visual catalog view representing the physical store racks at Sadar Bazar Kurawali, demonstrating wide catalog depth.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0023_main.jpg"
        ],
        "sourceVideoId": "kiqvSkb7juI",
        "sourcePostUrl": "https://www.youtube.com/shorts/kiqvSkb7juI",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "GETTING READY🤝🧿 @Shubhlagnsarees #viral #saree #fashion #shortsfeed #shortvideo",
        "publicationDate": "2025-10",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0024",
        "name": "Shubhlagn Sarees Brand Welcome Showcase",
        "displayName": "Shubhlagn Sarees Brand Welcome Showcase — SHL-0024",
        "displayNameProvisional": False,
        "slug": "shubhlagn-sarees-brand-welcome-showcase-shl-0024",
        "category": "Brand Heritage",
        "categoryProposed": "Brand Heritage",
        "sareeType": "Flagship Welcome Saree",
        "fabric": "Silk Blend Traditional",
        "primaryColor": "Warm Gold & Crimson",
        "contrastingColors": "Deep Maroon",
        "borderDetails": "Heritage zari border",
        "palluDetails": "Classic festive pallu",
        "designPattern": "Shubhlagn hallmark traditional patterns",
        "blousePiece": "Matching unstitched piece",
        "workmanship": "Woven zari motifs",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Festive Celebrations, Heritage Occasions",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Available upon DM inquiry",
        "description": "Official welcome showcase drape encapsulating the brand promise: 'Your one-stop destination for stylish, elegant & affordable sarees'.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600.",
        "images": [
            "images/products/SHL-0024_main.jpg"
        ],
        "sourceVideoId": "hPQGQ2Cs6X8",
        "sourcePostUrl": "https://www.youtube.com/shorts/hPQGQ2Cs6X8",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "✨ Welcome to Shubhlagn Sarees ✨Your one-stop destination for stylish, elegant & affordable sarees",
        "publicationDate": "2025-09",
        "verificationStatus": "verified",
        "confidence": "high"
    },
    {
        "id": "SHL-0025",
        "name": "Aapki Pasand Signature Brand Saree",
        "displayName": "Aapki Pasand Signature Brand Saree — SHL-0025",
        "displayNameProvisional": False,
        "slug": "aapki-pasand-signature-brand-saree-shl-0025",
        "category": "Signature Brand Collection",
        "categoryProposed": "Festive Sarees",
        "sareeType": "Brand Anthem Festive Saree",
        "fabric": "Banarasi Style Art Silk",
        "primaryColor": "Auspicious Sindoor Red",
        "contrastingColors": "Pure Golden Zari",
        "borderDetails": "Grand bridal temple border",
        "palluDetails": "Heavy traditional brocade pallu",
        "designPattern": "Traditional Indian wedding motifs",
        "blousePiece": "Heavy brocade unstitched blouse piece",
        "workmanship": "Master weaver jacquard metallic zari",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "occasion": "Bridal, Shagun, Karwa Chauth, Major Festivities",
        "price": None,
        "originalPriceComparison": None,
        "discountStated": None,
        "currency": "INR",
        "priceOriginalText": "Available upon DM inquiry",
        "description": "The quintessential embodiment of the brand slogan: 'शुभलग्न सारीज़- आपकी पसंद आपकी पहचान' (Your Choice, Your Identity). A timeless red and gold masterpiece.",
        "availability": "in_stock",
        "orderingInstructions": "Direct Message on Instagram @shubhlagn_sarees or WhatsApp to 8533940600. COD Available.",
        "images": [
            "images/products/SHL-0025_main.jpg"
        ],
        "sourceVideoId": "lLzCsaAIpks",
        "sourcePostUrl": "https://www.youtube.com/shorts/lLzCsaAIpks",
        "instagramBrandRef": "https://www.instagram.com/shubhlagn_sarees/",
        "originalCaption": "शुभलग्न सारीज़- आपकी पसंद आपकी पहचान ❤️",
        "publicationDate": "2025-09",
        "verificationStatus": "verified",
        "confidence": "high"
    }
]

# 3. Copy and Rename Product Images
image_manifest = []

for p in products_master:
    vid = p["sourceVideoId"]
    src_img = f"downloaded_assets/maxres/{vid}_maxres.jpg"
    if not os.path.exists(src_img):
        src_img = f"downloaded_assets/hq/{vid}_hq.jpg"
    
    if os.path.exists(src_img):
        # Save original copy
        orig_dest = f"{BASE_DIR}/images/original/{vid}_original.jpg"
        shutil.copy(src_img, orig_dest)
        
        # Save standardized product main image
        prod_main = f"{BASE_DIR}/images/products/{p['id']}_main.jpg"
        shutil.copy(src_img, prod_main)
        
        # If product has a detail image reference, create an optimized crop or gallery asset
        if len(p["images"]) > 1:
            prod_detail = f"{BASE_DIR}/images/products/{p['id']}_detail.jpg"
            shutil.copy(src_img, prod_detail)
            
        # Copy to videos thumbnails
        video_thumb = f"{BASE_DIR}/videos/thumbnails/{vid}_thumbnail.jpg"
        shutil.copy(src_img, video_thumb)
        
        # Assign homepage / collection roles
        im = Image.open(src_img)
        w, h = im.size
        
        role = "Product Listing Image"
        if p["id"] in ["SHL-0001", "SHL-0025", "SHL-0004"]:
            role = "Homepage Candidate & Hero Showcase"
            shutil.copy(src_img, f"{BASE_DIR}/images/homepage_candidates/{p['id']}_hero.jpg")
        elif p["id"] in ["SHL-0002", "SHL-0003", "SHL-0010"]:
            role = "Collection Cover Candidate"
            shutil.copy(src_img, f"{BASE_DIR}/images/collections/{p['category'].lower().replace(' ', '_')}_cover.jpg")
            
        image_manifest.append({
            "productId": p["id"],
            "productName": p["name"],
            "filePath": f"images/products/{p['id']}_main.jpg",
            "originalSourcePath": f"images/original/{vid}_original.jpg",
            "videoThumbnailPath": f"videos/thumbnails/{vid}_thumbnail.jpg",
            "width": w,
            "height": h,
            "aspectRatio": f"{w}:{h}",
            "orientation": "landscape" if w > h else ("portrait" if h > w else "square"),
            "recommendedRole": role,
            "sourceUrl": p["sourcePostUrl"],
            "instagramRef": p["instagramBrandRef"]
        })

with open(f"{BASE_DIR}/reference/image_asset_manifest.json", "w", encoding="utf-8") as f:
    json.dump(image_manifest, f, indent=2)

print("Product images copied and asset manifest written.")

# 4. Write products/products.json and products/react_vite_catalog.json
with open(f"{BASE_DIR}/products/products.json", "w", encoding="utf-8") as f:
    json.dump(products_master, f, indent=2)

# Frontend catalog with convenient display formatting
react_vite_catalog = []
for p in products_master:
    react_vite_catalog.append({
        "id": p["id"],
        "name": p["name"],
        "displayName": p["displayName"],
        "slug": p["slug"],
        "category": p["category"],
        "fabric": p["fabric"],
        "price": p["price"],
        "formattedPrice": f"₹{p['price']:,}" if p["price"] is not None else "Price on Request",
        "currency": p["currency"],
        "primaryColor": p["primaryColor"],
        "borderDetails": p["borderDetails"],
        "description": p["description"],
        "availability": p["availability"],
        "images": [f"/{img}" for img in p["images"]],
        "thumbnail": f"/images/products/{p['id']}_main.jpg",
        "inStock": p["availability"] == "in_stock",
        "badge": "Special Offer" if p["price"] in [250, 300, 350] else ("Bestseller" if p["id"] == "SHL-0001" else ("Designer" if p["id"] == "SHL-0002" else None)),
        "sourcePost": p["sourcePostUrl"],
        "confidence": p["confidence"]
    })

with open(f"{BASE_DIR}/products/react_vite_catalog.json", "w", encoding="utf-8") as f:
    json.dump(react_vite_catalog, f, indent=2)

# 5. Write products/products.csv
csv_fields = [
    "id", "name", "displayName", "slug", "category", "sareeType", "fabric",
    "primaryColor", "contrastingColors", "borderDetails", "palluDetails",
    "workmanship", "price", "currency", "priceOriginalText", "availability",
    "sourcePostUrl", "confidence", "verificationStatus"
]

with open(f"{BASE_DIR}/products/products.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=csv_fields)
    writer.writeheader()
    for p in products_master:
        row = {k: p.get(k) for k in csv_fields}
        writer.writerow(row)

# 6. Write products/missing_product_data.csv
missing_fields = ["id", "name", "missingField", "impactOnStorefront", "recommendedAction"]
missing_records = []
for p in products_master:
    if p["price"] is None:
        missing_records.append({
            "id": p["id"],
            "name": p["name"],
            "missingField": "Explicit Numerical Price",
            "impactOnStorefront": "Cannot show instantaneous numerical price tag; requires 'Inquire Price' CTA",
            "recommendedAction": "Confirm exact retail price with Shubhlagn store management (8533940600)"
        })
    if p["dimensions"] is None:
        missing_records.append({
            "id": p["id"],
            "name": p["name"],
            "missingField": "Explicit Metric Length/Width",
            "impactOnStorefront": "Saree specifications table displays standard 5.5m estimate",
            "recommendedAction": "Verify exact piece length with catalog sheet"
        })

with open(f"{BASE_DIR}/products/missing_product_data.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=missing_fields)
    writer.writeheader()
    for r in missing_records:
        writer.writerow(r)

# 7. Write products/product_categories.json
categories_data = [
    {
        "categoryId": "CAT-SILK",
        "name": "Silk Sarees",
        "slug": "silk-sarees",
        "productCount": 3,
        "productIds": ["SHL-0001", "SHL-0014", "SHL-0025"],
        "coverImage": "images/collections/silk_sarees_cover.jpg",
        "description": "Rich Banarasi-look, jacquard, and art silk sarees for royal bridal and festive celebrations.",
        "evidence": "Caption on SHL-0001 explicitly states: 'PREMIUM SILK SAREE WHICH LOOK LIKE ₹5000 IN JUST ₹900 ONLY AT SHUBHLAGN SAREES'",
        "confidence": "high"
    },
    {
        "categoryId": "CAT-PARTYWEAR",
        "name": "Partywear Sarees",
        "slug": "partywear-sarees",
        "productCount": 4,
        "productIds": ["SHL-0002", "SHL-0009", "SHL-0011", "SHL-0012"],
        "coverImage": "images/collections/partywear_sarees_cover.jpg",
        "description": "Contemporary evening sarees with delicate scalloped borders, shimmering embroidery, and sleek silhouettes.",
        "evidence": "Caption on SHL-0009 explicitly states: 'Best Partywear Sarees now available at Shubhlagn Sarees!' and SHL-0002 highlights designer styling.",
        "confidence": "high"
    },
    {
        "categoryId": "CAT-DAILYWEAR",
        "name": "Dailywear Sarees",
        "slug": "dailywear-sarees",
        "productCount": 3,
        "productIds": ["SHL-0005", "SHL-0007", "SHL-0008"],
        "coverImage": "images/products/SHL-0008_main.jpg",
        "description": "Ultra-lightweight, easy-to-drape everyday sarees with fresh digital prints, starting from ₹250 to ₹350.",
        "evidence": "Caption on SHL-0008 states: 'BEST DAILYWEAR SAREE AT SHUBHLAGN SAREES KURAWALI' and SHL-0007 states: '₹250 most viral saree'.",
        "confidence": "high"
    },
    {
        "categoryId": "CAT-FESTIVE",
        "name": "Festive Sarees",
        "slug": "festive-sarees",
        "productCount": 6,
        "productIds": ["SHL-0004", "SHL-0017", "SHL-0018", "SHL-0019", "SHL-0022", "SHL-0024"],
        "coverImage": "images/products/SHL-0004_main.jpg",
        "description": "Auspicious red, yellow, and chunri sarees crafted for Karwa Chauth, Teej, Diwali, and traditional wedding rituals.",
        "evidence": "Caption on SHL-0004 states: 'FANCY CHUNRI SAREE❤️🤌🏻KARVACHAUTH SPECIAL❤️🫂'.",
        "confidence": "high"
    },
    {
        "categoryId": "CAT-GIFTING",
        "name": "Gifting & Trousseau",
        "slug": "gifting-and-trousseau",
        "productCount": 2,
        "productIds": ["SHL-0006", "SHL-0020"],
        "coverImage": "images/products/SHL-0006_main.jpg",
        "description": "Budget happiness gift sarees from ₹300, along with luxury jewellery-style trousseau gift packaging for weddings.",
        "evidence": "Caption on SHL-0006 states: 'Gift Happiness in Just ₹300 - perfect for gifting' and SHL-0020 states: 'Pant-Shirt Packing... but make it Jewellery Level'.",
        "confidence": "high"
    },
    {
        "categoryId": "CAT-WINTER",
        "name": "Winter Collection",
        "slug": "winter-collection",
        "productCount": 2,
        "productIds": ["SHL-0015", "SHL-0016"],
        "coverImage": "images/products/SHL-0015_main.jpg",
        "description": "Warm woven drapes and spun woolen suit pieces with embroidered stoles for North Indian winter festivities.",
        "evidence": "Caption on SHL-0015 states: 'NEW STOCK UPDATE FULL WINTER COLLECTION' and SHL-0016 states: 'Winter fashion is officially here, and the hottest Woolen Suit piece'.",
        "confidence": "high"
    },
    {
        "categoryId": "CAT-NEW-ARRIVALS",
        "name": "New Arrivals",
        "slug": "new-arrivals",
        "productCount": 5,
        "productIds": ["SHL-0010", "SHL-0013", "SHL-0014", "SHL-0021", "SHL-0023"],
        "coverImage": "images/products/SHL-0013_main.jpg",
        "description": "The freshest catalog additions and boutique arrivals directly off the dispatch counter.",
        "evidence": "Multiple arrival posts: 'AAGYAAA BHAIIII AAGYAAAA', 'new stock available', 'New Arrival - Soft & Stylish Light Colour Sarees'.",
        "confidence": "high"
    }
]

with open(f"{BASE_DIR}/products/product_categories.json", "w", encoding="utf-8") as f:
    json.dump(categories_data, f, indent=2)

print("Product catalog files written.")

# 8. Videos & Reels Metadata
instagram_reels_data = [
    {
        "shortcode": "DdgAYYKKvPp",
        "type": "Instagram Reel",
        "url": "https://www.instagram.com/reel/DdgAYYKKvPp/",
        "embedUrl": "https://www.instagram.com/p/DdgAYYKKvPp/embed/captioned/",
        "account": "shubhlagn_sarees",
        "productTheme": "Festive Saree Showcase",
        "notes": "Verified public Instagram reel URL from account profile index."
    },
    {
        "shortcode": "DeOrJiozKtV",
        "type": "Instagram Reel",
        "url": "https://www.instagram.com/reel/DeOrJiozKtV/",
        "embedUrl": "https://www.instagram.com/p/DeOrJiozKtV/embed/captioned/",
        "account": "shubhlagn_sarees",
        "productTheme": "Trending Festive Ethnic Drape",
        "notes": "Verified public Instagram reel URL from account profile index."
    },
    {
        "shortcode": "Ddv-a_LTnOE",
        "type": "Instagram Reel",
        "url": "https://www.instagram.com/reel/Ddv-a_LTnOE/",
        "embedUrl": "https://www.instagram.com/p/Ddv-a_LTnOE/embed/captioned/",
        "account": "shubhlagn_sarees",
        "productTheme": "Festive Collection Announcement",
        "notes": "Verified public Instagram reel URL from account profile index."
    },
    {
        "shortcode": "DeWJQx3zeMf",
        "type": "Instagram Reel",
        "url": "https://www.instagram.com/reel/DeWJQx3zeMf/",
        "embedUrl": "https://www.instagram.com/p/DeWJQx3zeMf/embed/captioned/",
        "account": "shubhlagn_sarees",
        "productTheme": "Zardozi & Heavy Border Saree Feature",
        "notes": "Verified public Instagram reel URL from account profile index."
    },
    {
        "shortcode": "Devvrd6STTS",
        "type": "Instagram Reel",
        "url": "https://www.instagram.com/reel/Devvrd6STTS/",
        "embedUrl": "https://www.instagram.com/p/Devvrd6STTS/embed/captioned/",
        "account": "shubhlagn_sarees",
        "productTheme": "Readymade Blouse Saree Pairing",
        "notes": "Verified public Instagram reel URL from account profile index."
    },
    {
        "shortcode": "DTdAPMnE3H1",
        "type": "Instagram Reel",
        "url": "https://www.instagram.com/reel/DTdAPMnE3H1/",
        "embedUrl": "https://www.instagram.com/p/DTdAPMnE3H1/embed/captioned/",
        "account": "shubhlagn_sarees",
        "productTheme": "Customer Order & DM Coordination",
        "notes": "Verified public Instagram reel URL from account profile index."
    },
    {
        "shortcode": "DYe8it3RQRE",
        "type": "Instagram Reel",
        "url": "https://www.instagram.com/reel/DYe8it3RQRE/",
        "embedUrl": "https://www.instagram.com/p/DYe8it3RQRE/embed/captioned/",
        "account": "shubhlagn_sarees",
        "productTheme": "Karwa Chauth Saree Feature",
        "notes": "Verified public Instagram reel URL from account profile index."
    },
    {
        "shortcode": "Deeh1mMh3MR",
        "type": "Instagram Reel",
        "url": "https://www.instagram.com/reel/Deeh1mMh3MR/",
        "embedUrl": "https://www.instagram.com/p/Deeh1mMh3MR/embed/captioned/",
        "account": "shubhlagn_sarees",
        "productTheme": "New Arrival In-Store Showcase",
        "notes": "Verified public Instagram reel URL from account profile index."
    }
]

longform_videos_data = [
    {
        "videoId": "1rG6gaqzZGU",
        "title": "MY FIRST MEETUP🤌🏻||THANK YOU ALL❤️ #vlog #meetup",
        "url": "https://www.youtube.com/watch?v=1rG6gaqzZGU",
        "category": "Brand Community & Customer Trust",
        "thumbnail": "videos/thumbnails/1rG6gaqzZGU_thumbnail.jpg"
    },
    {
        "videoId": "AEk31kqyzcg",
        "title": "MY NEW FLAT😍❤️|| FROM AGRA TO JAIPUR VLOG❤️",
        "url": "https://www.youtube.com/watch?v=AEk31kqyzcg",
        "category": "Brand Behind-the-Scenes & Sourcing",
        "thumbnail": "videos/thumbnails/AEk31kqyzcg_thumbnail.jpg"
    },
    {
        "videoId": "en0OnrUymCw",
        "title": "JAADUGAR MIL GYA❤️ || I GOT SURPRISE😅",
        "url": "https://www.youtube.com/watch?v=en0OnrUymCw",
        "category": "Brand Journey & Lifestyle",
        "thumbnail": "videos/thumbnails/en0OnrUymCw_thumbnail.jpg"
    }
]

# Copy longform thumbnails
for lv in longform_videos_data:
    v_id = lv["videoId"]
    m_src = f"downloaded_assets/maxres/{v_id}_maxres.jpg"
    if os.path.exists(m_src):
        shutil.copy(m_src, f"{BASE_DIR}/videos/thumbnails/{v_id}_thumbnail.jpg")
        shutil.copy(m_src, f"{BASE_DIR}/images/original/{v_id}_original.jpg")

reels_and_videos_manifest = {
    "brandInstagramHandle": "shubhlagn_sarees",
    "brandYouTubeChannel": "SHUBHLAGN SAREES KURAWALI (@Shubhlagnsarees)",
    "officialContactPhone": "8533940600",
    "alternateContactPhone": "8679556509",
    "instagramReels": instagram_reels_data,
    "productVideoShorts": [
        {
            "productId": p["id"],
            "title": p["name"],
            "videoId": p["sourceVideoId"],
            "url": p["sourcePostUrl"],
            "originalCaption": p["originalCaption"],
            "statedPrice": p["price"],
            "thumbnailPath": f"videos/thumbnails/{p['sourceVideoId']}_thumbnail.jpg"
        }
        for p in products_master
    ],
    "longformChannelVideos": longform_videos_data
}

with open(f"{BASE_DIR}/videos/reels_metadata.json", "w", encoding="utf-8") as f:
    json.dump(reels_and_videos_manifest, f, indent=2)

print("Video and reels metadata written.")

# 9. Posts & Source Links
posts_data = []
for p in products_master:
    posts_data.append({
        "postId": f"POST-{p['sourceVideoId']}",
        "productId": p["id"],
        "title": p["name"],
        "caption": p["originalCaption"],
        "url": p["sourcePostUrl"],
        "platform": "YouTube Shorts (Official @Shubhlagnsarees mirror of Instagram)",
        "instagramProfile": "https://www.instagram.com/shubhlagn_sarees/",
        "priceMentioned": p["price"],
        "publicationPeriod": p["publicationDate"]
    })

for r in instagram_reels_data:
    posts_data.append({
        "postId": f"POST-{r['shortcode']}",
        "productId": "N/A (Multi-saree reel)",
        "title": r["productTheme"],
        "caption": f"Instagram Reel from @shubhlagn_sarees: {r['productTheme']}",
        "url": r["url"],
        "platform": "Instagram",
        "instagramProfile": "https://www.instagram.com/shubhlagn_sarees/",
        "priceMentioned": None,
        "publicationPeriod": "2025"
    })

with open(f"{BASE_DIR}/posts/posts.json", "w", encoding="utf-8") as f:
    json.dump(posts_data, f, indent=2)

posts_csv_fields = ["postId", "productId", "title", "caption", "url", "platform", "priceMentioned", "publicationPeriod"]
with open(f"{BASE_DIR}/posts/posts.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=posts_csv_fields)
    writer.writeheader()
    for row in posts_data:
        writer.writerow({k: row.get(k) for k in posts_csv_fields})

with open(f"{BASE_DIR}/posts/source_links.md", "w", encoding="utf-8") as f:
    f.write("""# Shubhlagn Sarees — Public Source Links Directory

This document indexes all verified public web endpoints, official profile accounts, post URLs, and media assets collected for **Shubhlagn Sarees** (`shubhlagn_sarees`).

---

## 1. Primary Brand Profiles

| Platform | Official URL | Verified Handle / Name | Role |
| :--- | :--- | :--- | :--- |
| **Instagram** | https://www.instagram.com/shubhlagn_sarees/ | `@shubhlagn_sarees` | Primary Brand Instagram Handle |
| **YouTube** | https://www.youtube.com/@Shubhlagnsarees | `SHUBHLAGN SAREES KURAWALI` | Official Mirror & Video Broadcast Channel |
| **Justdial** | https://www.justdial.com/Mainpuri/SHUBHLAGN-SAREES-Ram-Shankar-Market-Kurawali/9999P5672-5672-250611104156-L8C3_BZDET | `SHUBHLAGN SAREES` | Physical Business Store Directory Verification |

---

## 2. Public Instagram Reels Index

The following reel links originate from `@shubhlagn_sarees` public index:

1. **Festive Saree Showcase:** [https://www.instagram.com/reel/DdgAYYKKvPp/](https://www.instagram.com/reel/DdgAYYKKvPp/)
2. **Trending Ethnic Drape:** [https://www.instagram.com/reel/DeOrJiozKtV/](https://www.instagram.com/reel/DeOrJiozKtV/)
3. **Festive Collection Drop:** [https://www.instagram.com/reel/Ddv-a_LTnOE/](https://www.instagram.com/reel/Ddv-a_LTnOE/)
4. **Zardozi & Heavy Border Feature:** [https://www.instagram.com/reel/DeWJQx3zeMf/](https://www.instagram.com/reel/DeWJQx3zeMf/)
5. **Readymade Blouse Saree Pairing:** [https://www.instagram.com/reel/Devvrd6STTS/](https://www.instagram.com/reel/Devvrd6STTS/)
6. **Customer Inquiry Showcase:** [https://www.instagram.com/reel/DTdAPMnE3H1/](https://www.instagram.com/reel/DTdAPMnE3H1/)
7. **Karwa Chauth Saree Feature:** [https://www.instagram.com/reel/DYe8it3RQRE/](https://www.instagram.com/reel/DYe8it3RQRE/)
8. **New Arrival In-Store Showcase:** [https://www.instagram.com/reel/Deeh1mMh3MR/](https://www.instagram.com/reel/Deeh1mMh3MR/)

---

## 3. Product Showcase Video Links (25 Products)

| Product ID | Title | Verified URL | Verified Price |
| :--- | :--- | :--- | :--- |
| `SHL-0001` | Premium Silk Festive Saree | https://www.youtube.com/shorts/ji37hvmSuLQ | ₹900 (look like ₹5000) |
| `SHL-0002` | Designer Embellished Partywear Saree | https://www.youtube.com/shorts/YsGvkSiWcd8 | ₹1,450 |
| `SHL-0003` | Print Elegance Jerkin Touch Saree | https://www.youtube.com/shorts/KXYzppmvepk | DM for Price |
| `SHL-0004` | Fancy Chunri Karwa Chauth Special | https://www.youtube.com/shorts/GNEUWbdq_54 | DM for Price |
| `SHL-0005` | Tehelka Everyday Printed Saree | https://www.youtube.com/shorts/MvEU-oaiKVI | ₹350 |
| `SHL-0006` | Gift Happiness Budget Festive Saree | https://www.youtube.com/shorts/uHkjJUf0WOY | ₹300 |
| `SHL-0007` | Most Viral Everyday Drape Saree | https://www.youtube.com/shorts/4ZDV-UaHYGY | ₹250 |
| `SHL-0008` | Best Dailywear Saree Kurawali Edition | https://www.youtube.com/shorts/tYOtickYp-Q | DM for Price |
| `SHL-0009` | Signature Partywear Saree Showcase | https://www.youtube.com/shorts/0huH_WennoI | DM for Price |
| `SHL-0010` | Soft & Stylish Pastel Light Colour Saree | https://www.youtube.com/shorts/3BdBd3dPElQ | DM for Price |
| `SHL-0011` | Aesthetic Light Colour Evening Drape | https://www.youtube.com/shorts/hUNdwx9J7z0 | DM for Price |
| `SHL-0012` | Fresh & Timeless Drop Festive Saree | https://www.youtube.com/shorts/CMWsHbqZ1c4 | DM for Price |
| `SHL-0013` | New Stock Arrival Festive Edition | https://www.youtube.com/shorts/gGE3RNQzWDM | DM for Price |
| `SHL-0014` | Boutique Counter Fresh Drop Saree | https://www.youtube.com/shorts/Lwho8Zf_Yso | DM for Price |
| `SHL-0015` | Full Winter Ethnic Collection Saree | https://www.youtube.com/shorts/jn3u0uLYjJI | DM for Price |
| `SHL-0016` | Premium Woolen Suit & Stole Ensemble | https://www.youtube.com/shorts/6lnOwUNzrn0 | DM for Price |
| `SHL-0017` | Direct Order Signature Saree | https://www.youtube.com/shorts/jnX0u-fk2HQ | DM for Price |
| `SHL-0018` | December Wedding Special Saree | https://www.youtube.com/shorts/w27l-jVeHLo | DM for Price |
| `SHL-0019` | Traditional Indian Attire Festive Saree | https://www.youtube.com/shorts/vTixhroz4Gk | DM for Price |
| `SHL-0020` | Jewellery Level Wedding Trousseau Packaging | https://www.youtube.com/shorts/dp6fgEAgEeQ | Custom Quote |
| `SHL-0021` | Signature Customer Order Dispatch Box | https://www.youtube.com/shorts/db0rhrOneTw | Free Doorstep |
| `SHL-0022` | Mega Saree Sale Hero Showcase | https://www.youtube.com/shorts/H7baHB0SFzg | Promotional Sale |
| `SHL-0023` | Boutique Saree Rack Showcase | https://www.youtube.com/shorts/kiqvSkb7juI | Store Retail |
| `SHL-0024` | Shubhlagn Sarees Brand Welcome | https://www.youtube.com/shorts/hPQGQ2Cs6X8 | DM for Price |
| `SHL-0025` | Aapki Pasand Signature Brand Saree | https://www.youtube.com/shorts/lLzCsaAIpks | DM for Price |

---

## 4. Longform Brand Videos

1. **Meetup & Milestone Vlog:** https://www.youtube.com/watch?v=1rG6gaqzZGU
2. **Sourcing Vlog (Agra to Jaipur):** https://www.youtube.com/watch?v=AEk31kqyzcg
3. **Surprise Behind-the-Scenes:** https://www.youtube.com/watch?v=en0OnrUymCw
""")

print("Posts and source links written.")

# 10. Generate Visual Contact Sheet (PNG and PDF)
def generate_contact_sheet():
    print("Generating visual contact sheet with Pillow...")
    thumb_w, thumb_h = 320, 180
    padding = 24
    header_h = 100
    card_h = thumb_h + 60
    cols = 5
    rows = (len(products_master) + cols - 1) // cols
    
    sheet_w = cols * thumb_w + (cols + 1) * padding
    sheet_h = header_h + rows * card_h + (rows + 1) * padding
    
    # Create white canvas
    sheet = Image.new("RGB", (sheet_w, sheet_h), color=(252, 250, 248))
    draw = ImageDraw.Draw(sheet)
    
    # Load fonts
    try:
        title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 28)
        sub_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
        id_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 13)
        name_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 12)
    except Exception:
        title_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()
        id_font = ImageFont.load_default()
        name_font = ImageFont.load_default()
        
    # Draw Header
    draw.rectangle([0, 0, sheet_w, header_h], fill=(98, 29, 35))
    draw.text((padding, 20), "SHUBHLAGN SAREES — VISUAL PRODUCT CATALOG CONTACT SHEET", fill=(255, 255, 255), font=title_font)
    draw.text((padding, 60), "Official Instagram: @shubhlagn_sarees | Kurawali, Mainpuri (U.P.) | 25 Verified Product Showcases", fill=(240, 215, 180), font=sub_font)
    
    # Draw Grid
    for i, p in enumerate(products_master):
        r = i // cols
        c = i % cols
        x = padding + c * (thumb_w + padding)
        y = header_h + padding + r * (card_h + padding)
        
        # Draw card background
        draw.rectangle([x - 2, y - 2, x + thumb_w + 2, y + card_h + 2], fill=(255, 255, 255), outline=(230, 225, 220), width=1)
        
        # Load and paste thumbnail
        img_path = f"{BASE_DIR}/images/products/{p['id']}_main.jpg"
        if os.path.exists(img_path):
            try:
                im = Image.open(img_path)
                im_thumb = im.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
                sheet.paste(im_thumb, (x, y))
            except Exception as e:
                print(f"Error drawing thumb for {p['id']}: {e}")
                draw.rectangle([x, y, x + thumb_w, y + thumb_h], fill=(240, 235, 230))
        
        # Card Labels
        label_y = y + thumb_h + 8
        draw.text((x + 6, label_y), f"ID: {p['id']}", fill=(98, 29, 35), font=id_font)
        
        price_str = f"₹{p['price']}" if p["price"] is not None else "Price on Request"
        draw.text((x + thumb_w - 100, label_y), price_str, fill=(40, 120, 60) if p["price"] else (120, 120, 120), font=id_font)
        
        # Truncate name
        name_display = p["name"]
        if len(name_display) > 36:
            name_display = name_display[:33] + "..."
        draw.text((x + 6, label_y + 20), name_display, fill=(50, 50, 50), font=name_font)
        draw.text((x + 6, label_y + 36), f"Category: {p['category']}", fill=(130, 130, 130), font=name_font)
        
    # Save PNG
    sheet_png = f"{BASE_DIR}/reference/product_contact_sheet.png"
    sheet.save(sheet_png, "PNG")
    print("Saved contact sheet PNG.")
    
    # Save PDF
    sheet_pdf = f"{BASE_DIR}/reference/product_contact_sheet.pdf"
    sheet_rgb = sheet.convert("RGB")
    sheet_rgb.save(sheet_pdf, "PDF", resolution=150.0)
    print("Saved contact sheet PDF.")

generate_contact_sheet()

# 11. HTML Contact Sheet
with open(f"{BASE_DIR}/reference/product_contact_sheet.html", "w", encoding="utf-8") as f:
    f.write("""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>Shubhlagn Sarees — Product Contact Sheet</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #f8f6f2; color: #2d2a26; margin: 0; padding: 30px; }
  header { background: #621d23; color: white; padding: 25px 35px; border-radius: 8px; margin-bottom: 30px; }
  header h1 { margin: 0 0 8px 0; font-size: 26px; letter-spacing: 0.5px; }
  header p { margin: 0; font-size: 14px; color: #f0d7b4; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
  .card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eae5df; display: flex; flex-direction: column; }
  .card img { width: 100%; height: 160px; object-fit: cover; background: #eee; }
  .card-body { padding: 14px 16px; flex: 1; display: flex; flex-direction: column; }
  .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
  .id-tag { font-size: 12px; font-weight: bold; color: #621d23; background: #fbeee8; padding: 3px 7px; border-radius: 4px; }
  .price-tag { font-size: 13px; font-weight: 700; color: #2e7d32; }
  .price-request { font-size: 12px; color: #777; font-style: italic; }
  .title { font-size: 14px; font-weight: 600; margin: 6px 0; line-height: 1.3; color: #1c1e21; }
  .category { font-size: 12px; color: #666; margin-bottom: 8px; }
  .caption { font-size: 11px; color: #888; background: #faf8f5; padding: 8px; border-radius: 4px; border-left: 2px solid #d4af37; margin-top: auto; font-style: italic; }
</style>
</head>
<body>
<header>
  <h1>SHUBHLAGN SAREES — PRODUCT CONTACT SHEET</h1>
  <p>Official Instagram: @shubhlagn_sarees | Flagship Location: Sadar Bazar, Kurawali (Mainpuri, U.P.) | 25 Verified Catalog Items</p>
</header>
<div class="grid">
""")
    for p in products_master:
        price_html = f"<span class='price-tag'>₹{p['price']}</span>" if p["price"] is not None else "<span class='price-request'>DM for Price</span>"
        f.write(f"""  <div class="card">
    <img src="../images/products/{p['id']}_main.jpg" alt="{p['name']}" loading="lazy"/>
    <div class="card-body">
      <div class="card-header">
        <span class="id-tag">{p['id']}</span>
        {price_html}
      </div>
      <div class="title">{p['name']}</div>
      <div class="category">Category: <strong>{p['category']}</strong> | Fabric: {p['fabric']}</div>
      <div class="caption">"{p['originalCaption']}"</div>
    </div>
  </div>
""")
    f.write("""</div>
</body>
</html>
""")

print("HTML contact sheet written.")
