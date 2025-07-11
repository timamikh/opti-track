import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

export const lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
      posts: relationship({ ref: 'Post.author', many: true }),
      role: select({
        type: 'enum',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'SMM Specialist', value: 'smm' },
        ],
        defaultValue: 'smm',
      }),
    },
  }),
  Post: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      slug: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        defaultValue: 'draft',
        validation: { isRequired: true },
      }),
      content: document({
        formatting: true,
        links: true,
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
        ],
      }),
      publishDate: timestamp(),
      author: relationship({
        ref: 'User.posts',
        many: false,
      }),
      category: relationship({
        ref: 'Category.posts',
        many: false,
      }),
      tags: relationship({
        ref: 'Tag.posts',
        many: true,
      }),
      imageUrl: text({
        label: 'Image URL',
        ui: {
          description: 'URL of the image for this post',
        }
      }),
    },
  }),
  Category: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      slug: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      description: text(),
      posts: relationship({ ref: 'Post.category', many: true }),
    },
  }),
  Tag: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      slug: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      posts: relationship({ ref: 'Post.tags', many: true }),
    },
  }),
}; 