# == Schema Information
#
# Table name: runs
#
#  id           :bigint           not null, primary key
#  distance     :decimal(, )      not null
#  duration     :integer          not null
#  encoded_path :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_runs_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Run < ApplicationRecord
  validates :distance, presence: true
  validates :duration, presence: true
  validates :encoded_path, presence: true
  
  has_one_attached :kml_layer_file
  belongs_to :user
end
