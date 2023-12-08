import pandas as pd
import requests


def get_media_url(name):
    api_url = f"http://127.0.0.1:5000/result/?query={name}"
    response = requests.get(api_url)

    if response.status_code == 200:
        json_data = response.json()
        if json_data and "media_url" in json_data[0]:
            return [json_data[0]["media_url"], json_data[0]["image"]]
    return None


csv_file_path = "songs/musicfetch.csv"
df = pd.read_csv(csv_file_path)

# Add a new column 'Media_URL' to store the media URLs
df["Media_URL"] = ""
df["Media_Image"] = ""

# Iterate through each row and fetch the media URL
for index, row in df.iterrows():
    name = row["Name"]
    media_url = get_media_url(name)
    print(media_url[0])
    print(media_url[1])
    if media_url:
        df.at[index, "Media_URL"] = media_url[0]
        df.at[index, "Media_Image"] = media_url[1]

# Save the updated DataFrame to a new CSV file
output_csv_path = "songs/musicfetch.csv"  # Replace with your desired output file path
df.to_csv(output_csv_path, index=False)

print(f"Media URLs fetched and saved to {output_csv_path}")
