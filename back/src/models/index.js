'use strict';

import Sequelize from 'sequelize';
import configuration from '../config/config.js'

import user from './user.js'
import artwork from './artwork.js';
import artwork_hashtag from './artwork_hashtag.js';
import artwork_transaction from './artwork_transaction.js';
import comment from './comment.js';
import donation_transaction from './donation_transaction.js';
import hashtag from './hashtag.js';
import like from './like.js';
import profile from './profile.js';
import reward_transaction from './reward_transaction.js';
import transfer_transaction from './transfer_transaction.js';
import want from './want.js';
import website from './website.js';


const env = process.env.NODE_ENV || 'development';
const config = configuration[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = user(sequelize, Sequelize);
db.Artwork = artwork(sequelize, Sequelize);
db.ArtworkHashtag = artwork_hashtag(sequelize, Sequelize);
db.ArtworkTransaction = artwork_transaction(sequelize, Sequelize);
db.Comment = comment(sequelize, Sequelize);
db.DonationTransaction = donation_transaction(sequelize, Sequelize);
db.Hashtag = hashtag(sequelize, Sequelize);
db.Like = like(sequelize, Sequelize);
db.Profile = profile(sequelize, Sequelize);
db.RewardTransaction = reward_transaction(sequelize, Sequelize);
db.TransferTransaction = transfer_transaction(sequelize, Sequelize);
db.Want = want(sequelize, Sequelize);
db.Website = website(sequelize, Sequelize);

// artwork creator_id 외래키 설정
db.User.hasMany(db.Artwork, {foreignKey: 'creator_id', allowNull: false });
db.Artwork.belongsTo(db.User, {foreignKey: 'creator_id'});

// artwork owner_id 외래키 설정
db.User.hasMany(db.Artwork, {foreignKey: 'owner_id', allowNull: false,});
db.Artwork.belongsTo(db.User, {foreignKey: 'owner_id'});

// artwork_hashtag artwork_id 외래키 설정
db.Artwork.hasMany(db.ArtworkHashtag, {foreignKey: 'artwork_id',allowNull: false,});
db.ArtworkHashtag.belongsTo(db.Artwork, {foreignKey: 'artwork_id',});

// artwrok_hahstag hashtag_id 외래키 설정
db.Hashtag.hasMany(db.ArtworkHashtag, {foreignKey: 'hashtag_id',allowNull: false,});
db.ArtworkHashtag.belongsTo(db.Hashtag, {foreignKey: 'hashtag_id'});

// profile user_id 외래키 설정
db.User.hasOne(db.Profile, { foreignKey: 'user_id' });
db.Profile.belongsTo(db.User, { foreignKey: 'user_id' });

// website user_id 외래키 설정
db.User.hasOne(db.Website, { foreignKey: 'user_id' });
db.Website.belongsTo(db.User, { foreignKey: 'user_id' });

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

// donation_transaction from_id 외래키 설정
db.User.hasMany(db.DonationTransaction, {foreignKey: 'from_id',allowNull: false,});
db.DonationTransaction.belongsTo(db.User, {foreignKey: 'from_id'});

// donation_transaction to_id 외래키 설정
db.User.hasMany(db.DonationTransaction, {foreignKey: 'to_id', allowNull: false,});
db.DonationTransaction.belongsTo(db.User, {foreignKey: 'to_id'});

// transfer_transaction from_id 외래키 설정
db.User.hasMany(db.TransferTransaction, {foreignKey: 'from_id',allowNull: false,});
db.TransferTransaction.belongsTo(db.User, {foreignKey: 'from_id'});

// transfer_transaction to_id 외래키 설정
db.User.hasMany(db.TransferTransaction, {foreignKey: 'to_id',allowNull: false,});
db.TransferTransaction.belongsTo(db.User, {foreignKey: 'to_id'});

// reward_transaction to_id 외래키 설정
db.User.hasMany(db.RewardTransaction, {foreignKey: 'to_id',allowNull: false,});
db.RewardTransaction.belongsTo(db.User, {foreignKey: 'to_id'});

// artwork_transaction from_id 외래키 설정
db.User.hasMany(db.ArtworkTransaction, {foreignKey: 'from_id',allowNull: false,});
db.ArtworkTransaction.belongsTo(db.User, {foreignKey: 'from_id'});

// artwork_transaction to_id 외래키 설정
db.User.hasMany(db.ArtworkTransaction, {foreignKey: 'to_id',allowNull: false,});
db.ArtworkTransaction.belongsTo(db.User, {foreignKey: 'to_id'});

// artwork_transaction artwork_id 외래키 설정
db.Artwork.hasMany(db.ArtworkTransaction, {foreignKey: 'artwork_id',allowNull: false,});
db.ArtworkTransaction.belongsTo(db.Artwork, {foreignKey: 'artwork_id'});

export default db;
