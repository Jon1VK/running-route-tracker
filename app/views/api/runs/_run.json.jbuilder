json.extract! run, :id, :distance, :duration, :created_at
json.static_map_url "https://maps.googleapis.com/maps/api/staticmap?size=500x500&path=enc:#{run.encoded_path}&key=#{Rails.application.credentials.static_maps_api_key}"
