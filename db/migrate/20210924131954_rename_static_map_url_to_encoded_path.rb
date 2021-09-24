class RenameStaticMapUrlToEncodedPath < ActiveRecord::Migration[6.1]
  def change
    rename_column :runs, :static_map_url, :encoded_path
  end
end
