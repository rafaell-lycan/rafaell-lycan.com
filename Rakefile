require "rubygems"
require 'rake'
require 'time'

desc 'create a new draft post'
task :post do
  title = ENV['title'] || "new-post"
  date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  slug = "#{date}-#{title.downcase.gsub(/[^\w]+/, '-')}"

  file = File.join(
    File.dirname(__FILE__),
    '_posts',
    slug + '.md'
  )

  File.open(file, "w") do |f|
    f << <<-EOS.gsub(/^    /, '')
    ---
    layout: post
    title:  #{title}
    date:   #{Date.today}
    categories: undefined
    tags: tag1 tag2 tag3
    image: assets/img/posts/{img_url}.jpg
    keywords:
    resumo: >
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, voluptates?
    ---

    EOS
  end
  system( %[open "#{file}"] )
end
