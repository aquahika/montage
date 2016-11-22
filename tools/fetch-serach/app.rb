require 'bundler'
Bundler.require


require 'google-search'

Google::Search::Web.new(:query => 'クローラー').each do |item|
puts item.url
puts item.title
end
