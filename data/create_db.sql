BEGIN;

DROP TABLE IF EXISTS 
    "mechanic", 
    "author", 
    "designer", 
    "review", 
    "rule",
    "editor",
    "duration",
    "age",
    "player",
    "boardgame",
    "boardgame_has_mechanic", 
    "boardgame_has_author", 
    "boardgame_has_designer",
    "boardgame_has_review",
    "boardgame_has_rule"
    CASCADE;

CREATE TABLE IF NOT EXISTS "mechanic" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "mechanic" varchar(50) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "author" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" varchar(50) NOT NULL,
    "lastname" varchar(50) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "designer" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" varchar(50) NOT NULL,
    "lastname" varchar(50) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "review" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "review_url" varchar(255) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "rule" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "rule_url" varchar(255) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "editor" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "editor_name" varchar(50) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "duration" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "duration" integer NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "age" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "age" integer NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "player" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "player" varchar(20) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "boardgame" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" varchar(50) NOT NULL NOT NULL UNIQUE,
    "editor_id" integer NOT NULL REFERENCES "editor" ("id") ON DELETE CASCADE,
    "duration_id" integer NOT NULL REFERENCES "duration" ("id") ON DELETE CASCADE,
    "age_id" integer NOT NULL REFERENCES "age" ("id") ON DELETE CASCADE,
    "player_id" integer NOT NULL REFERENCES "player" ("id") ON DELETE CASCADE,
    "steam_url" varchar(255),
    "appstore_url" varchar(255),
    "playstore_url" varchar(255),
    "bga_url" varchar(255),
    "gamepark_url" varchar(255),
    "created_at" timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "boardgame_has_mechanic" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "mechanic_id" integer NOT NULL REFERENCES "mechanic" ("id") ON DELETE CASCADE,
    "boardgame_id" integer NOT NULL REFERENCES "boardgame" ("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    UNIQUE ("mechanic_id", "boardgame_id")
);

CREATE TABLE IF NOT EXISTS "boardgame_has_author" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "author_id" integer NOT NULL REFERENCES "author" ("id") ON DELETE CASCADE,
    "boardgame_id" integer NOT NULL REFERENCES "boardgame" ("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    UNIQUE ("author_id", "boardgame_id")
);

CREATE TABLE IF NOT EXISTS "boardgame_has_designer" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "designer_id" integer NOT NULL REFERENCES "designer" ("id") ON DELETE CASCADE,
    "boardgame_id" integer NOT NULL REFERENCES "boardgame" ("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    UNIQUE ("designer_id", "boardgame_id")
);

CREATE TABLE IF NOT EXISTS "boardgame_has_review" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "review_id" integer NOT NULL REFERENCES "review" ("id") ON DELETE CASCADE,
    "boardgame_id" integer NOT NULL REFERENCES "boardgame" ("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    UNIQUE ("review_id", "boardgame_id")
);

CREATE TABLE IF NOT EXISTS "boardgame_has_rule" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "rule_id" integer NOT NULL REFERENCES "rule" ("id") ON DELETE CASCADE,
    "boardgame_id" integer NOT NULL REFERENCES "boardgame" ("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    UNIQUE ("rule_id", "boardgame_id")
);

COMMIT;