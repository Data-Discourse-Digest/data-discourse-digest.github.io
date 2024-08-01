require 'json'
require 'jekyll'

# Set up Jekyll environment
config = Jekyll.configuration({})  # or provide custom configuration if needed
site = Jekyll::Site.new(config)

# Read the site data
site.process  # Ensure that Jekyll processes the site, including posts

# Extract post details
posts = site.posts.docs.map do |post|
  {
    'id' => post.id,
    'title' => post.title,
    'url' => post.url,
    'content' => post.content
  }
end

# Write JSON to the assets directory
File.open(File.join(Dir.pwd, 'assets', 'lunr_index.json'), 'w') do |f|
  f.write(JSON.pretty_generate(posts))
end
