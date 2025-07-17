"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../src/config/auth.ts
var auth_exports = {};
__export(auth_exports, {
  authConfig: () => authConfig,
  default: () => auth_default,
  sessionConfig: () => sessionConfig
});
var sessionConfig, authConfig, auth_default;
var init_auth = __esm({
  "../src/config/auth.ts"() {
    "use strict";
    sessionConfig = {
      // Session secret - in production should be set via environment variable
      secret: process.env.SESSION_SECRET || "a-very-secure-secret-for-keystone-cms",
      // Session duration (30 days in seconds)
      maxAge: 60 * 60 * 24 * 30
    };
    authConfig = {
      // KeystoneJS authentication settings
      keystone: {
        listKey: "User",
        identityField: "email",
        secretField: "password",
        initFirstItem: {
          fields: ["name", "email", "password", "role"]
        }
      },
      session: sessionConfig
    };
    auth_default = authConfig;
  }
});

// ../src/config/server.ts
var server_exports = {};
__export(server_exports, {
  default: () => server_default,
  serverConfig: () => serverConfig
});
var development, production, serverConfig, server_default;
var init_server = __esm({
  "../src/config/server.ts"() {
    "use strict";
    development = {
      // React application server
      reactApp: {
        port: 8e3,
        strictPort: true,
        host: true,
        open: true
      },
      // KeystoneJS CMS server
      keystoneCms: {
        port: 3e3,
        cors: {
          origin: true,
          credentials: true
        }
      }
    };
    production = {
      // React application server (served by Nginx)
      reactApp: {
        port: 80
      },
      // KeystoneJS CMS server
      keystoneCms: {
        port: 3e3,
        cors: {
          origin: true,
          credentials: true
        }
      }
    };
    serverConfig = process.env.NODE_ENV === "production" ? production : development;
    server_default = serverConfig;
  }
});

// ../src/config/database.ts
var database_exports = {};
__export(database_exports, {
  databaseConfig: () => databaseConfig,
  default: () => database_default,
  keystoneDbConfig: () => keystoneDbConfig
});
var keystoneDbConfig, databaseConfig, database_default;
var init_database = __esm({
  "../src/config/database.ts"() {
    "use strict";
    keystoneDbConfig = {
      development: {
        provider: "sqlite",
        url: "file:./keystone.db"
      },
      production: {
        provider: "sqlite",
        url: "file:./keystone.db"
        // In a real production environment, you might want to use a different database
        // provider: 'postgresql',
        // url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/opti-track',
      }
    };
    databaseConfig = {
      keystone: process.env.NODE_ENV === "production" ? keystoneDbConfig.production : keystoneDbConfig.development
    };
    database_default = databaseConfig;
  }
});

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
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var authConfig2;
var configPath = import_path.default.resolve(__dirname, "../src/config/auth.ts");
if (import_fs.default.existsSync(configPath)) {
  try {
    Promise.resolve().then(() => (init_auth(), auth_exports)).then((module2) => {
      authConfig2 = module2.default;
    }).catch((err) => {
      console.warn("Failed to import auth config, using defaults:", err);
      authConfig2 = {
        keystone: {
          listKey: "User",
          identityField: "email",
          secretField: "password",
          initFirstItem: {
            fields: ["name", "email", "password", "role"]
          }
        },
        session: {
          secret: process.env.SESSION_SECRET || "a-very-secure-secret-for-keystone-cms",
          maxAge: 60 * 60 * 24 * 30
          // 30 days
        }
      };
    });
  } catch (err) {
    console.warn("Failed to load auth config, using defaults:", err);
  }
} else {
  console.warn("Auth config file not found, using defaults");
}
if (!authConfig2) {
  authConfig2 = {
    keystone: {
      listKey: "User",
      identityField: "email",
      secretField: "password",
      initFirstItem: {
        fields: ["name", "email", "password", "role"]
      }
    },
    session: {
      secret: process.env.SESSION_SECRET || "a-very-secure-secret-for-keystone-cms",
      maxAge: 60 * 60 * 24 * 30
      // 30 days
    }
  };
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: authConfig2.keystone.listKey,
  identityField: authConfig2.keystone.identityField,
  secretField: authConfig2.keystone.secretField,
  initFirstItem: authConfig2.keystone.initFirstItem
});
var session = (0, import_session.statelessSessions)({
  secret: authConfig2.session.secret,
  maxAge: authConfig2.session.maxAge
});

// keystone.ts
var import_path2 = __toESM(require("path"));
var import_fs2 = __toESM(require("fs"));
var serverConfig2;
var serverConfigPath = import_path2.default.resolve(__dirname, "../src/config/server.ts");
if (import_fs2.default.existsSync(serverConfigPath)) {
  try {
    Promise.resolve().then(() => (init_server(), server_exports)).then((module2) => {
      serverConfig2 = module2.default;
    }).catch((err) => {
      console.warn("Failed to import server config, using defaults:", err);
      serverConfig2 = {
        keystoneCms: {
          port: 3e3,
          cors: {
            origin: true,
            credentials: true
          }
        }
      };
    });
  } catch (err) {
    console.warn("Failed to load server config, using defaults:", err);
  }
} else {
  console.warn("Server config file not found, using defaults");
}
var dbConfig;
var dbConfigPath = import_path2.default.resolve(__dirname, "../src/config/database.ts");
if (import_fs2.default.existsSync(dbConfigPath)) {
  try {
    Promise.resolve().then(() => (init_database(), database_exports)).then((module2) => {
      dbConfig = module2.default.keystone;
    }).catch((err) => {
      console.warn("Failed to import database config, using defaults:", err);
      dbConfig = {
        provider: "sqlite",
        url: "file:./keystone.db"
      };
    });
  } catch (err) {
    console.warn("Failed to load database config, using defaults:", err);
  }
} else {
  console.warn("Database config file not found, using defaults");
}
if (!serverConfig2) {
  serverConfig2 = {
    keystoneCms: {
      port: 3e3,
      cors: {
        origin: true,
        credentials: true
      }
    }
  };
}
if (!dbConfig) {
  dbConfig = {
    provider: "sqlite",
    url: "file:./keystone.db"
  };
}
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: dbConfig,
    lists,
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data
    },
    server: {
      port: serverConfig2.keystoneCms.port,
      cors: serverConfig2.keystoneCms.cors
    }
  })
);
//# sourceMappingURL=config.js.map
