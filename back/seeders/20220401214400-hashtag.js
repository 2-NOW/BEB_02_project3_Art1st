'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("hashtags", [
      {
        hashtag : "hashtag1",
        count : 15,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag2",
        count : 20,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag3",
        count : 33,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag4",
        count : 17,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag5",
        count : 21,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag6",
        count : 18,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag7",
        count : 29,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag8",
        count : 35,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag9",
        count : 14,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag10",
        count : 21,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag11",
        count : 151,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag12",
        count : 47,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag13",
        count : 51,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag14",
        count : 25,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hashtag : "hashtag15",
        count : 15,
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ]);
    await queryInterface.bulkInsert("artwork_hashtags", [
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 1,
        artwork_id : 1,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 4,
        artwork_id : 1,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 7,
        artwork_id : 1,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 1,
        artwork_id : 2,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 10,
        artwork_id : 2,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 13,
        artwork_id : 2,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 14,
        artwork_id : 3,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 8,
        artwork_id : 3,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 7,
        artwork_id : 3,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 6,
        artwork_id : 3,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 9,
        artwork_id : 4,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 14,
        artwork_id : 4,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 15,
        artwork_id : 4,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 15,
        artwork_id : 5,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 14,
        artwork_id : 5,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 12,
        artwork_id : 5,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 9,
        artwork_id : 5,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 1,
        artwork_id : 6,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 2,
        artwork_id : 6,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 4,
        artwork_id : 6,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 7,
        artwork_id : 6,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 1,
        artwork_id : 7,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 11,
        artwork_id : 8,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 9,
        artwork_id : 8,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 6,
        artwork_id : 8,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 11,
        artwork_id : 9,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 13,
        artwork_id : 9,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 3,
        artwork_id : 10,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 4,
        artwork_id : 10,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 7,
        artwork_id : 10,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 8,
        artwork_id : 11,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 2,
        artwork_id : 11,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 3,
        artwork_id : 11,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 7,
        artwork_id : 12,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 8,
        artwork_id : 12,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 15,
        artwork_id : 12,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 3,
        artwork_id : 13,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 8,
        artwork_id : 14,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 9,
        artwork_id : 14,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 1,
        artwork_id : 14,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 14,
        artwork_id : 15,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 8,
        artwork_id : 15,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 4,
        artwork_id : 16,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 8,
        artwork_id : 16,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 12,
        artwork_id : 16,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 14,
        artwork_id : 16,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 3,
        artwork_id : 17,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 6,
        artwork_id : 17,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 8,
        artwork_id : 17,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 1,
        artwork_id : 18,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 10,
        artwork_id : 18,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 9,
        artwork_id : 18,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 9,
        artwork_id : 19,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 11,
        artwork_id : 19,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 4,
        artwork_id : 20,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 2,
        artwork_id : 20,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 12,
        artwork_id : 20,
      },
      {
        createdAt : new Date(),
        updatedAt : new Date(),
        hashtag_id : 11,
        artwork_id : 20,
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await  queryInterface.bulkDelete('hashtags', null, {});
    await  queryInterface.bulkDelete('artwork_hashtags', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
