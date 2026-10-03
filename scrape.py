import instaloader
import os
import json
import shutil

def download_instagram_photos(target_profile, login_user, login_pass):
    L = instaloader.Instaloader(download_videos=False, save_metadata=False, post_metadata_txt_pattern='')
    print(f"Logging in as {login_user}...")
    try:
        L.login(login_user, login_pass)
        print("Login successful!")
    except Exception as e:
        print(f"Login failed: {e}")
        return

    print(f"Downloading profile: {target_profile}...")
    try:
        L.download_profile(target_profile, profile_pic_only=False)
    except Exception as e:
        print(f"An error occurred during download: {e}")
    
    return target_profile

def create_gallery_json(folder_name):
    if not os.path.exists(folder_name):
        print(f"Directory {folder_name} not found.")
        return

    results = []
    
    for filename in os.listdir(folder_name):
        if filename.endswith((".jpg", ".jpeg", ".png")):
            # Instead of loading a massive 5GB AI model that crashes the server,
            # we will just use a generic label or placeholder.
            label = "Delicious food from Taji Foodtruck"
            
            results.append({
                "Filename": filename, 
                "AI_Label": label,
                "ImageURL": f"/instagram/{filename}"
            })

    # Output to public folder
    public_dir = os.path.join(os.getcwd(), "public", "instagram")
    os.makedirs(public_dir, exist_ok=True)
    
    for res in results:
        shutil.copy(os.path.join(folder_name, res["Filename"]), os.path.join(public_dir, res["Filename"]))

    json_path = os.path.join(os.getcwd(), "src", "data", "scrapedGallery.json")
    with open(json_path, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"Done! Saved {len(results)} images to {json_path}")

if __name__ == "__main__":
    target = "tajifoodtruck"
    download_instagram_photos(target, "hatakehugo", "Rikke123")
    create_gallery_json(target)
