class Comment < ApplicationRecord
  # belongs_to :posts, dependent: :nullify
  has_many :posts, dependent: :nullify

  belongs_to :post #, optional: true
  belongs_to :user

  validates :body, presence: true

end
