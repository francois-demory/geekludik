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
    "created_at" timestamptz NOT NULL DEFAULT NOW(),    
    "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "author" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" varchar(50) NOT NULL,
    "lastname" varchar(50) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "designer" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" varchar(50) NOT NULL,
    "lastname" varchar(50) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "review" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "boardgame_reviewed" varchar(50) NOT NULL,
    "review_url" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "rule" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "boardgame_related" varchar(50) NOT NULL,
    "rule_url" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "editor" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "editor_name" varchar(50) NOT NULL UNIQUE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "duration" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "duration" integer NOT NULL UNIQUE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "age" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "age" integer NOT NULL UNIQUE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "player" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "player" varchar(10) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "boardgame" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" varchar(50) NOT NULL NOT NULL UNIQUE,
    "editor_id" integer NOT NULL REFERENCES "editor" ("id") ON DELETE CASCADE,
    "duration_id" integer NOT NULL REFERENCES "duration" ("id") ON DELETE CASCADE,
    "age_id" integer NOT NULL REFERENCES "age" ("id") ON DELETE CASCADE,
    "player_id" integer NOT NULL REFERENCES "player" ("id") ON DELETE CASCADE,
    "steam_url" text,
    "appstore_url" text,
    "playstore_url" text,
    "bga_url" text,
    "gamepark_url" text,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "boardgame_has_mechanic" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "mechanic_id" integer NOT NULL REFERENCES "mechanic" ("id") ON DELETE CASCADE,
    "boardgame_id" integer NOT NULL REFERENCES "boardgame" ("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz,
    UNIQUE ("mechanic_id", "boardgame_id")
);

CREATE TABLE IF NOT EXISTS "boardgame_has_author" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "author_id" integer NOT NULL REFERENCES "author" ("id") ON DELETE CASCADE,
    "boardgame_id" integer NOT NULL REFERENCES "boardgame" ("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz,
    UNIQUE ("author_id", "boardgame_id")
);

CREATE TABLE IF NOT EXISTS "boardgame_has_designer" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "designer_id" integer NOT NULL REFERENCES "designer" ("id") ON DELETE CASCADE,
    "boardgame_id" integer NOT NULL REFERENCES "boardgame" ("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz,
    UNIQUE ("designer_id", "boardgame_id")
);

CREATE TABLE IF NOT EXISTS "boardgame_has_review" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "review_id" integer NOT NULL REFERENCES "review" ("id") ON DELETE CASCADE,
    "boardgame_id" integer NOT NULL REFERENCES "boardgame" ("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz,
    UNIQUE ("review_id", "boardgame_id")
);

CREATE TABLE IF NOT EXISTS "boardgame_has_rule" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "rule_id" integer NOT NULL REFERENCES "rule" ("id") ON DELETE CASCADE,
    "boardgame_id" integer NOT NULL REFERENCES "boardgame" ("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz,
    UNIQUE ("rule_id", "boardgame_id")
);

-- SEEDING

INSERT INTO "mechanic" ("mechanic") VALUES
('Dés'), ('Deck building'), ('Affrontement'), ('Escarmouche');

INSERT INTO "author" ("firstname", "lastname") VALUES
('Nate', 'Chatellier'), ('Manny', 'Trembley'), ('Isaac', 'Childres');

INSERT INTO "designer" ("firstname", "lastname") VALUES
('David', 'Bock'), ('Manny', 'Trembley'), ('Cat', 'Bock'), ('David', 'Demaret');

INSERT INTO "review" ("boardgame_reviewed", "review_url") VALUES
('Dice Throne S1', 'https://lepalaisdemidgard.fr/jeux-strategie/dice-throne/#:~:text=Dice%20Throne%20est%20un%20pur,combats%20rapides%20mais%20assez%20strat%C3%A9gique.'),
('Dice Throne S1', 'https://undecent.fr/2022/02/07/dice-throne-saison-1/'),
('Gloomhaven', 'https://www.consollection.com/geek/actualite/avis-gloomhaven-une-aventure-epique-pour-un-jeu-de-societe-hors-norme-9527.html#:~:text=Gloomhaven%20est%20un%20jeu%20juste%20monstrueux.&text=Il%20a%20les%20d%C3%A9fauts%20de,%C3%A7a%20prend%20beaucoup%20de%20place).'),
('Gloomhaven', 'https://www.trictrac.net/jeu-de-societe/gloomhaven/avis');

INSERT INTO "rule" ("boardgame_related", "rule_url") VALUES
('Gloomhaven', 'https://cdn.1j1ju.com/medias/b5/8d/ca-gloomhaven-regle.pdf'),
('Dice Throne S1', 'https://www.gameontabletop.com/contenu/partners/luckyduck/file/DT_-_Rulebook_-_Booklet_-_step01_translation_FR_v1.pdf');

INSERT INTO "editor" ("editor_name") VALUES
('Lucky Duck Games'), ('Asmodee');

INSERT INTO "duration" ("duration") VALUES
(20), (30), (40), (45), (60);

INSERT INTO "age" ("age") VALUES
(4), (6), (8), (9), (10), (12), (14);

INSERT INTO "player" ("player") VALUES
('1'), ('1-2'), ('1-3'), ('1-5'), ('2-5'), ('3-6');

INSERT INTO "boardgame" ("name", "editor_id", "duration_id", "age_id", "player_id", "steam_url", "appstore_url", "playstore_url", "bga_url", "gamepark_url") VALUES
('Dice Throne S1', 1, 4, 3, 5, '', '', '', '', ''),
('Gloomhaven', 2, 5, 7, 3, '', '', '', '', '');

INSERT INTO "boardgame_has_mechanic" ("mechanic_id", "boardgame_id") VALUES
(1, 1),
(2, 1),
(3, 1),
(3, 2),
(2, 2);

INSERT INTO "boardgame_has_author" ("author_id", "boardgame_id") VALUES
(1, 1),
(2, 1),
(3, 2);

INSERT INTO "boardgame_has_designer" ("designer_id", "boardgame_id") VALUES
(2, 1),
(1, 2),
(3, 2),
(4, 2);

INSERT INTO "boardgame_has_review" ("review_id", "boardgame_id") VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2);

INSERT INTO "boardgame_has_rule" ("rule_id", "boardgame_id") VALUES
(2, 1),
(1, 2);

COMMIT;