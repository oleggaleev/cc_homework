class Post < ApplicationRecord

  validates(:title, {
    presence: true
    })

  validates(:body, {
    presence: true,
    length: {minimum:5}
    })

    before_validation :titleize_title

    private

    def titleize_title
      self.title = title.titleize if title.present?
    end
end
