const Age = require('./Age');
const Author = require('./Author');
const Boardgame = require('./Boardgame');
const Designer = require('./Designer');
const Duration = require('./Duration');
const Editor = require('./Editor');
const Mechanic = require('./Mechanic');
const Player = require('./Player');
const Review = require('./Review');
const Rule = require('./Rule');

Boardgame.belongsTo(Editor, {
    as: 'editor',
    foreignKey: 'editor_id'
});

Editor.hasMany(Boardgame, {
    as: 'boardgames',
    foreignKey: 'editor_id'
});

Boardgame.belongsTo(Duration, {
    as: 'duration',
    foreignKey: 'duration_id'
});

Duration.hasMany(Boardgame, {
    as: 'boardgames',
    foreignKey: 'duration_id'
});

Boardgame.belongsTo(Age, {
    as: 'age',
    foreignKey: 'age_id'
});

Age.hasMany(Boardgame, {
    as: 'boardgames',
    foreignKey: 'age_id'
});

Boardgame.belongsTo(Player, {
    as: 'player',
    foreignKey: 'player_id'
});

Player.hasMany(Boardgame, {
    as: 'boardgames',
    foreignKey: 'player_id'
});

Boardgame.belongsToMany(Mechanic, {
    as: 'mechanics',
    through: 'boardgame_has_mechanic',
    foreignKey: 'boardgame_id',
    otherKey: 'mechanic_id'
});

Mechanic.belongsToMany(Boardgame, {
    as: 'boardgames',
    through: 'boardgame_has_mechanic',
    foreignKey: 'mechanic_id',
    otherKey: 'boardgame_id'
});

Boardgame.belongsToMany(Author, {
    as: 'authors',
    through: 'boardgame_has_author',
    foreignKey: 'boardgame_id',
    otherKey: 'author_id'
});

Author.belongsToMany(Boardgame, {
    as: 'boardgames',
    through: 'boardgame_has_author',
    foreignKey: 'author_id',
    otherKey: 'boardgame_id'
});

Boardgame.belongsToMany(Designer, {
    as: 'designers',
    through: 'boardgame_has_designer',
    foreignKey: 'boardgame_id',
    otherKey: 'designer_id'
});

Designer.belongsToMany(Boardgame, {
    as: 'boardgames',
    through: 'boardgame_has_designer',
    foreignKey: 'designer_id',
    otherKey: 'boardgame_id'
});

Boardgame.belongsToMany(Review, {
    as: 'reviews',
    through: 'boardgame_has_review',
    foreignKey: 'boardgame_id',
    otherKey: 'review_id'
});

Review.belongsToMany(Boardgame, {
    as: 'boardgames',
    through: 'boardgame_has_review',
    foreignKey: 'review_id',
    otherKey: 'boardgame_id'
});

Boardgame.belongsToMany(Rule, {
    as: 'rules',
    through: 'boardgame_has_rule',
    foreignKey: 'boardgame_id',
    otherKey: 'rule_id'
});

Rule.belongsToMany(Boardgame, {
    as: 'boardgames',
    through: 'boardgame_has_rule',
    foreignKey: 'rule_id',
    otherKey: 'boardgame_id'
});

module.exports = { Age, Author, Boardgame, Designer, Duration, Editor, Mechanic, Player, Review, Rule };