json.extract! run, :id, :distance, :duration, :created_at
json.static_map_url "https://maps.googleapis.com/maps/api/staticmap?size=200x200&scale=2&maptype=terrain&path=weight:3|enc:#{run.encoded_path}&key=#{Rails.application.credentials.static_maps_api_key}"
