import { objectType } from 'nexus';

export const HelloWorld = objectType({
  name: 'HelloWorld',
  definition(t) {
    t.string('message');
  },
});

export const Film = objectType({
  name: 'Film',
  description: 'A Studio Ghibli film',
  definition(t) {
    t.nonNull.string('id', { description: 'Unique identifier for the film' });
    t.nonNull.string('title', { description: 'The title of the film' });
    t.string('originalTitle', { description: 'The original Japanese title' });
    t.string('originalTitleRomanised', {
      description: 'The romanised version of the original title',
    });
    t.string('image', { description: 'URL of the movie poster image' });
    t.string('movieBanner', { description: 'URL of the movie banner image' });
    t.string('description', { description: 'Description of the film' });
    t.string('director', { description: 'Director of the film' });
    t.string('producer', { description: 'Producer of the film' });
    t.string('releaseDate', { description: 'Release date of the film' });
    t.string('runningTime', { description: 'Running time in minutes' });
    t.string('rtScore', { description: 'Rotten Tomatoes score' });
  },
});
