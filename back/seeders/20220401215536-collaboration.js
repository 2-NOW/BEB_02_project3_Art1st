'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("collaborations", [
      {
        imgURI : "https://cdn.asiaa.co.kr/news/photo/202109/56227_65729_2353.jpg",
        reward : 1500,
        period : "20220402~20220411",
        title : "NFT ARTIST CONTEST",
        desc : "어플 서비스 런칭을 기념하여 제 1회 NFT ARTIST CONTEST를 개최합니다. 총 상금 1500 AT토큰!!",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        imgURI : "https://image.news1.kr/system/photos/2021/6/21/4831851/medium.jpg",
        reward : 1000,
        period : "20220402~20220427",
        title : "XXBLUE NFT ARTIST COMPETION",
        desc : "XXBLUE NFT ARTIST COMPETION를 개최합니다. 총 상금 1000 AT토큰!!",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        imgURI : "http://cdn.slist.kr/news/photo/202104/239577_402058_127.jpg",
        reward : 2000,
        period : "20211202~20211215",
        title : "아트다 NFT 2021 온라인 뷰잉룸 작가 공모전",
        desc : "아트다 NFT 2021 온라인 뷰잉룸 작가 공모전에 선발되면 당신의 NFT를 전 세계에 소개하고 판매할 수 있습니다. 그리고 AT토큰 2000 상금!!",
        createdAt : new Date(),
        updatedAt : new Date(),
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
