"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      posts: (0, import_fields.relationship)({ ref: "Post.author", many: true }),
      role: (0, import_fields.select)({
        type: "enum",
        options: [
          { label: "Admin", value: "admin" },
          { label: "Editor", value: "editor" },
          { label: "SMM Specialist", value: "smm" }
        ],
        defaultValue: "smm"
      })
    }
  }),
  Post: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      slug: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      status: (0, import_fields.select)({
        options: [
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" }
        ],
        defaultValue: "draft",
        validation: { isRequired: true }
      }),
      content: (0, import_fields_document.document)({
        formatting: true,
        links: true,
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1]
        ]
      }),
      publishDate: (0, import_fields.timestamp)(),
      author: (0, import_fields.relationship)({
        ref: "User.posts",
        many: false
      }),
      category: (0, import_fields.relationship)({
        ref: "Category.posts",
        many: false
      }),
      tags: (0, import_fields.relationship)({
        ref: "Tag.posts",
        many: true
      }),
      imageUrl: (0, import_fields.text)({
        label: "Image URL",
        ui: {
          description: "URL of the image for this post"
        }
      })
    }
  }),
  Category: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      slug: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      description: (0, import_fields.text)(),
      posts: (0, import_fields.relationship)({ ref: "Post.category", many: true })
    }
  }),
  Tag: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      slug: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      posts: (0, import_fields.relationship)({ ref: "Post.tags", many: true })
    }
  })
};

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password", "role"]
  }
});
var sessionSecret = process.env.SESSION_SECRET || "a-very-secure-secret-for-keystone-cms";
var session = (0, import_session.statelessSessions)({
  secret: sessionSecret,
  maxAge: 60 * 60 * 24 * 30
  // 30 days
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data
    },
    server: {
      port: 3e3,
      cors: {
        origin: true,
        // Разрешить все источники
        credentials: true
      }
    }
  })
);
//# sourceMappingURL=config.js.map
