/**
 * Holds all Collections
 * @type {Object.<name, Mongo.Collection>}
 */
DB = {};
DB.Channels = new Mongo.Collection('channels');
DB.Shows = new Mongo.Collection('shows');
DB.Seasons = new Mongo.Collection('seasons');
DB.Episodes = new Mongo.Collection('episodes');
DB.Changes = new Mongo.Collection('changes');