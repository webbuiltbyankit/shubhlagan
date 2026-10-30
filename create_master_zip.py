import os
import zipfile

zip_filename = "Shubhlagn_Sarees_Instagram_Research_Assets.zip"
base_dir = "Shubhlagn_Sarees"

print(f"Creating master ZIP package: {zip_filename}...")

file_count = 0
total_size = 0

with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            file_path = os.path.join(root, file)
            # Preserve ZIP-relative paths starting with Shubhlagn_Sarees/
            arcname = os.path.relpath(file_path, start=os.path.dirname(base_dir))
            zipf.write(file_path, arcname)
            file_count += 1
            total_size += os.path.getsize(file_path)

print(f"Master ZIP created successfully!")
print(f"Total files packaged: {file_count}")
print(f"Uncompressed size: {total_size / (1024*1024):.2f} MB")
print(f"ZIP package size: {os.path.getsize(zip_filename) / (1024*1024):.2f} MB")

# Verify ZIP integrity
print("Verifying ZIP integrity...")
with zipfile.ZipFile(zip_filename, 'r') as zipf:
    bad_file = zipf.testzip()
    if bad_file:
        print(f"Corrupted file found in ZIP: {bad_file}")
    else:
        print("ZIP integrity test PASSED: all files readable and CRC validated.")
        print(f"Verified files in ZIP: {len(zipf.namelist())}")

