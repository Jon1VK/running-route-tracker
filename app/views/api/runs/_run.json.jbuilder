json.extract! run, :id, :distance, :duration, :created_at
json.static_map_url "https://maps.googleapis.com/maps/api/staticmap?size=200x200&scale=2&maptype=terrain&path=weight:3|enc:#{run.encoded_path}&key=#{Rails.application.credentials.maps_api_key}"
json.kml_layer_file_url run.kml_layer_file.blob.service_url
