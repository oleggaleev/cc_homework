# Question 1
module HelperMethods
  def titleize(title)
    array = title.split
    title_words = array.map do |word|
      if (word == "in" || word == "the" || word == "of" || word == "and" || word == "or" || word == "from")
        word.concat(" ")
      else
        word.capitalize.concat(" ")
      end
    end
    return title_words.join
  end
end

class Book
  attr_accessor :book
  include HelperMethods
end
# in this case to call the titleize method we have to create new object
# b = Book.new
# b.titleize('the lion kong') ---> 'The Lion King'


class Book1
  attr_accessor :book1
  extend HelperMethods
end
# in this case we can call the titleize method by using class name
# Book1.titleize('the lion king') ---> 'The Lion King'


# Question 2
class Book

  def initialize(title)
    @title, @chapters = title, []
  end

  attr_accessor :chapters
  attr_accessor :title

  def add_chapter(new_chapter)
  @chapters << new_chapter
  end

  def chapters
  puts "Your Book: #{@title} has #{@chapters.count} chapters"
  counter = 0
  @chapters.each do |chpt|
    counter += 1
    puts "#{counter}. #{chpt.capitalize}"
    end
  end
end



# Question 3
puts 'Please enter a number: '
number = gets.to_i

def is_prime?(n)
  for number in 2..(n - 1)
    if (n % number) == 0
      return false
    end
  end
  return true
end
is_prime?(number)

# Question 4
major_cities = {BC: ["Vancouver", "Victoria", "Prince George"],
                AB: ["Edmonton", "Calgary"]}

major_cities.each do |key, value|
  print " #{key} have #{value.count} cities: #{value.join(', ')} \n"
end
