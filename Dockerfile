FROM jekyll/jekyll:latest

WORKDIR /srv/jekyll

COPY Gemfile /srv/jekyll/
COPY Gemfile.lock /srv/jekyll/
RUN bundle install

COPY . /srv/jekyll

CMD ["jekyll", "serve", "--host", "0.0.0.0"]
