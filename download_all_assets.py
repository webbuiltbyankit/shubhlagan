import urllib.request
import os
import json

with open('extracted_shorts.json') as f:
    shorts = json.load(f)

with open('extracted_videos.json') as f:
    videos = json.load(f)

os.makedirs('downloaded_assets/raw_thumbnails', exist_ok=True)
os.makedirs('downloaded_assets/maxres', exist_ok=True)
os.makedirs('downloaded_assets/hq', exist_ok=True)

download_log = []

for s in shorts:
    vid = s['videoId']
    print(f'Fetching images for short {vid}...')
    # Try maxresdefault first
    maxres_url = f'https://i.ytimg.com/vi/{vid}/maxresdefault.jpg'
    hq_url = f'https://i.ytimg.com/vi/{vid}/hqdefault.jpg'
    
    maxres_path = f'downloaded_assets/maxres/{vid}_maxres.jpg'
    hq_path = f'downloaded_assets/hq/{vid}_hq.jpg'
    
    saved_path = None
    saved_type = None
    
    try:
        req = urllib.request.Request(maxres_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            if resp.status == 200:
                with open(maxres_path, 'wb') as out:
                    out.write(resp.read())
                saved_path = maxres_path
                saved_type = 'maxres'
    except Exception as e:
        print(f'Maxres not available for {vid}: {e}')
    
    try:
        req = urllib.request.Request(hq_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            if resp.status == 200:
                with open(hq_path, 'wb') as out:
                    out.write(resp.read())
                if not saved_path:
                    saved_path = hq_path
                    saved_type = 'hq'
    except Exception as e:
        print(f'HQ not available for {vid}: {e}')
        
    download_log.append({
        'videoId': vid,
        'title': s['title'],
        'views': s['views'],
        'saved_type': saved_type,
        'maxres_path': maxres_path if os.path.exists(maxres_path) else None,
        'hq_path': hq_path if os.path.exists(hq_path) else None
    })

for v in videos:
    vid = v['id']
    if not vid: continue
    print(f'Fetching images for video {vid}...')
    maxres_url = f'https://i.ytimg.com/vi/{vid}/maxresdefault.jpg'
    hq_url = f'https://i.ytimg.com/vi/{vid}/hqdefault.jpg'
    maxres_path = f'downloaded_assets/maxres/{vid}_maxres.jpg'
    hq_path = f'downloaded_assets/hq/{vid}_hq.jpg'
    
    try:
        req = urllib.request.Request(maxres_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            if resp.status == 200:
                with open(maxres_path, 'wb') as out:
                    out.write(resp.read())
    except Exception:
        pass
        
    try:
        req = urllib.request.Request(hq_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            if resp.status == 200:
                with open(hq_path, 'wb') as out:
                    out.write(resp.read())
    except Exception:
        pass

with open('download_log.json', 'w') as f:
    json.dump(download_log, f, indent=2)

print('Finished downloading assets!')

