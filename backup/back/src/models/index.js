'use strict';

import Sequelize from 'sequelize';
import configuration from '../config/config.js'

import user from './user.js'
import artwork from './artwork.js';
import artwork_hashtag from './artwork_hashtag.js';
import comment from './comment.js';
import donation_transaction from './donation_transaction.js';
import hashtag from './hashtag.js';
import like from './like.js';
import profile from './profile.js';
import want from './want.js';
import orderbook from './orderbook.js';
import collaboration from './collaboration.js';
import vote from './vote.js';


const env = process.env.NODE_ENV || 'development';
const config = configuration[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = user(sequelize, Sequelize);
db.Artwork = artwork(sequelize, Sequelize);
db.ArtworkHashtag = artwork_hashtag(sequelize, Sequelize);
db.Comment = comment(sequelize, Sequelize);
db.DonationTransaction = donation_transaction(sequelize, Sequelize);
db.Hashtag = hashtag(sequelize, Sequelize);
db.Like = like(sequelize, Sequelize);
db.Profile = profile(sequelize, Sequelize);
db.Want = want(sequelize, Sequelize);
db.Collaboration = collaboration(sequelize, Sequelize);
db.Vote = vote(sequelize, Sequelize);


// artwork collaboration_id 외래키 설정
db.Collaboration.hasMany(db.Artwork, {foreignKey: 'collaboration_id', allowNull: false});
db.Artwork.belongsTo(db.Collaboration, {foreignKey: 'collaboration_id'});

// artwork creator_id 외래키 설정
db.User.hasMany(db.Artwork, {foreignKey: 'creator_id', allowNull: false });
db.Artwork.belongsTo(db.User, {foreignKey: 'creator_id'});

// artwork owner_id 외래키 설정
db.User.hasMany(db.Artwork, {foreignKey: 'owner_id', allowNull: false,});
db.Artwork.belongsTo(db.User, {foreignKey: 'owner_id'});

// vote artwork_id 외래키 설정
db.Artwork.hasMany(db.Vote, {foreignKey: 'artwork_id',allowNull: false,});
db.Vote.belongsTo(db.Artwork, {foreignKey: 'artwork_id',});

// vote user_id 외래키 설정
db.User.hasMany(db.Vote, {foreignKey: 'user_id',allowNull: false,});
db.Vote.belongsTo(db.User, {foreignKey: 'user_id',});

// artwrok_hahstag hashtag_id 외래키 설정
db.Hashtag.hasMany(db.ArtworkHashtag, {foreignKey: 'hashtag_id',allowNull: false,});
db.ArtworkHashtag.belongsTo(db.Hashtag, {foreignKey: 'hashtag_id'});

// artwork_hashtag artwork_id 외래키 설정
db.Artwork.hasMany(db.ArtworkHashtag, {foreignKey: 'artwork_id',allowNull: false,});
db.ArtworkHashtag.belongsTo(db.Artwork, {foreignKey: 'artwork_id',});

// artwrok_hahstag hashtag_id 외래키 설정
db.Hashtag.hasMany(db.ArtworkHashtag, {foreignKey: 'hashtag_id',allowNull: false,});
db.ArtworkHashtag.belongsTo(db.Hashtag, {foreignKey: 'hashtag_id'});

// profile user_id 외래키 설정
db.User.hasOne(db.Profile, { foreignKey: 'user_id' });
db.Profile.belongsTo(db.User, { foreignKey: 'user_id' });

// comment user_id 외래키 설정
db.User.hasMany(db.Comment, {foreignKey: 'user_id',allowNull: false,});
db.Comment.belongsTo(db.User, {foreignKey: 'user_id'});

// comment artwork_id 외래키 설정
db.Artwork.hasMany(db.Comment, {foreignKey: 'artwork_id',allowNull: false,});
db.Comment.belongsTo(db.Artwork, {foreignKey: 'artwork_id',});

// want user_id 외래키 설정
db.User.hasMany(db.Want, {foreignKey: 'user_id',allowNull: false,});
db.Want.belongsTo(db.User, {foreignKey: 'user_id'});

// want artwork_id 외래키 설정
db.Artwork.hasMany(db.Want, {foreignKey: 'artwork_id',allowNull: false,});
db.Want.belongsTo(db.Artwork, {foreignKey: 'artwork_id',});

// like user_id 외래키 설정
db.User.hasMany(db.Like, {foreignKey: 'user_id',allowNull: false,});
db.Like.belongsTo(db.User, { foreignKey: 'user_id'});

// like artwork_id 외래키 설정
db.Artwork.hasMany(db.Like, {foreignKey: 'artwork_id',allowNull: false,});
db.Like.belongsTo(db.Artwork, {foreignKey: 'artwork_id',});

// orderbook 추가
db.Orderbook = orderbook(sequelize, Sequelize);

// orderbook 외래키 설정
db.User.hasMany(db.Orderbook, {foreignKey: 'from_id', allowNull: false,});
db.Orderbook.belongsTo(db.User, {foreignKey: 'from_id'});

db.User.hasMany(db.Orderbook, {foreignKey: 'to_id', allowNull: false,});
db.Orderbook.belongsTo(db.User, {foreignKey: 'to_id'});

// donation_transactions - orderbooks 외래키 설정
db.Orderbook.hasOne(db.DonationTransaction, {foreignKey: 'order_id'});
db.DonationTransaction.belongsTo(db.Orderbook, {foreignKey: 'order_id'});

export default db;
