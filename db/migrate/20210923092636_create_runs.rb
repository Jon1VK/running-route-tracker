class CreateRuns < ActiveRecord::Migration[6.1]
  def change
    create_table :runs do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :distance, null: false
      t.integer :duration, null: false
      t.string :static_map_url, null: false

      t.timestamps
    end
  end
end
