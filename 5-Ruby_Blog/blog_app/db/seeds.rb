# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)




PASSWORD = 'supersecret'

Comment.destroy_all
Post.destroy_all
User.destroy_all

super_user = User.create(
  first_name: 'Oleg',
  last_name: 'G',
  email: 'o@o.o',
  password: PASSWORD,
  is_admin: true
)

10.times.each do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
    password: PASSWORD
  )
end

users = User.all

200.times.each do
  Post.create(
    title: Faker::Book.title,
    body: Faker::FamilyGuy.quote,
    user: users.sample
  )
end

posts = Post.all

posts.each do |post|
  rand(0..5).times.each do
    Comment.create(
      body: Faker::TheFreshPrinceOfBelAir.quote,
      post: post,
      user: users.sample
    )
  end
end

comments = Comment.all
