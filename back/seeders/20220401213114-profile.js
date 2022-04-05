'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("profiles", [
      {
        picture : "https://lh3.googleusercontent.com/HLxXZKv1uZjmlrhUmyEmyOXMcXGNOh4ni5Yjksa_WDrq2qscXSDoZ-9TLI9_TnCo9-6dbNDkR2mVN_ON2cQRAAK9asKgvVc0QR4N6g=w345",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 1
      },
      {
        picture : "https://lh3.googleusercontent.com/Eg5C7Qj0d4pUrESnprTHSTmy4gTzz-ZF4_oVIbixDm5jI3e6lE_ZKfays6Igue9N64d-Xdt2qgwhzxHfmHOMTfrTxK1mqC5QqR5PvA=w345",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 2
      },
      {
        picture : "https://lh3.googleusercontent.com/ZbFOaai9ygd1CCVtsvitWT4i8BZEGRy2qBBuCbGFtkKDdkh7TTU1PDHHN_820WGY1UqK60IkY9tPjgAhtJOcB0GVg-Pau4Rh3bYa=w345",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 3
      },
      {
        picture : "https://lh3.googleusercontent.com/b39dd3V7y5I_xUYhv49SFwyqD6yosuzY78iUOuKsK0Eg3xd1K1TC1Pq3L5KT9yqfdJUQ4PJrtjpdaESkltgEPLXeNHMxrU6eb__Cng=w345",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 4
      },
      {
        picture : "https://lh3.googleusercontent.com/mHLPNMHIU_UIQKCwJEu5ok8VEBxSWYwB_DQ_azhILQwwNOBI2wO5sn2DJoUgmkFSU04e5uZ5yo739POKnNcbwDSnLbCAHSzJTCeF=w328",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 5
      },
      {
        picture : "https://lh3.googleusercontent.com/UwNA4HF2DB0DxbgjpW5b5ZRrLKiRwtJ7KO5togNxwqIhsx0g9471nL6rxccwrIoUiJbUmdRgikPqDSnYHE4nZHz3uO8iR1c-_b7Wag=w328",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 6
      },
      {
        picture : "https://lh3.googleusercontent.com/HLxXZKv1uZjmlrhUmyEmyOXMcXGNOh4ni5Yjksa_WDrq2qscXSDoZ-9TLI9_TnCo9-6dbNDkR2mVN_ON2cQRAAK9asKgvVc0QR4N6g=w345",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 7
      },
      {
        picture : "https://lh3.googleusercontent.com/rdnKvRxMewYLvh9O-AyKLEuV4PMvAlM4J4E2VPfFF2Wm3mZyUTPb3HCR5gH4TWYCQaTxQmV21Lb7FYMm3deFNJ1Prmot12DfN42B=w328",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 8
      },
      {
        picture : "https://lh3.googleusercontent.com/b-rdMsJ_2noyhTUGohnJ3yqRnFngdwyt8jOtJ4DwQiPG8GgfbNmh0TkbitXK7OlWwe33_Ky3-1BVntmaiaN-r9faqXphy1-E7oDT7A=w328",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 9
      },
      {
        picture : "https://lh3.googleusercontent.com/79SECT6281_3N1BnGAOnJA6om3VAG6YwbqbMzAZE2ndLVTGoAW_loq9RzxMQ7zEethx1ytQEaMNjOXuFQxFyDeA1d_Eoa_fBCGBtA4s=w328",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 10
      },
      {
        picture : "https://lh3.googleusercontent.com/GBYLtbHnLWxs7Hbluv0wLt8i4nwxvj2Xz-gABJvfhwLxIEWjGwfgyNKbhfGaRnqWZdPw-5zsz_Q_fk3gors3jK2Ll7a-UUMo7Nph=w328",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 11
      },
      {
        picture : "https://lh3.googleusercontent.com/zi5o7u7rNvM1lnvWUZ6LtgBEqSe7tSMC98XYTgjznyuxIYHNg7F52F7NCxsJgcpWHSCPQtxx3gEuRT4GC_aGeI64qOnaIab6YtPoQA=w328",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 12
      },
      {
        picture : "https://lh3.googleusercontent.com/f4GQIsrb0imaLjJ3vvVVfsQOfLKe19woeaDgk8hrUmSwxCaz0KorBQIIndiznIJmlshbXiyh7CsWNGUwdPkUrxl8qptIXifpFQuF=w328",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 13
      },
      {
        picture : "https://lh3.googleusercontent.com/IakwOzQNFOyCZA6L_zbQImJ1NeErdR5rut4qPHg6y7qXIL6x36w0BjPOhWKmwBvPnVoc2pcwr8XNIAcB1A-9V4LWLbzFfHqmrsvL1D4=w345",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 14
      },
      {
        picture : "https://lh3.googleusercontent.com/J-fmHuglKOp-e7ee_5fkhzF2NEicVu8xvAPDi2984mtyyUalqEIUeQK4xx4KpWBp_3kWhkRhcz3JefmIqKvHmxiy_jmtiTmk2dMIiQ=w345",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 15
      },
      {
        picture : "https://lh3.googleusercontent.com/gsRjQ1tWaI87Ay5ogDucCgbgG56RnJBaFWc2KGaDewTOMu44hPDyB3ZxKO5w6WJ3pgsL8LivJwQDccBYN3j4XsdiuZNOKZaTD7wgXDc=w345",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 16
      },
      {
        picture : "https://lh3.googleusercontent.com/usaYBdGv3CX1R2bjph0OKkELUtL_8hMMmT61RacNWWPK2uCgBGEQH-rHUk9zJ6V1lAM2Fbzv3KJucB7job8mcSeP4Z8mLJLjFXln=w345",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 17
      },
      {
        picture : "https://lh3.googleusercontent.com/uT86QR-m6aLporsaOqernmlr7ID7eYL6t1dE1cNrjg3VP0c3fg7byoJkAu5gWX1Bp9l4t0KzkQgsm-262sgdSmzivrti0aJJ9ctS2g=w345",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 18
      },
      {
        picture : "https://lh3.googleusercontent.com/QBX65k2qAFjPQntpu_GjxLk0f6qSE-hH404N5XGw3svDdIbe8k4oFtUXVRwfo3KZ5kqG6VnIkwlspGK3BLcHh5jIR3-nbrgYHcICUQ=w345",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 19
      },
      {
        picture : "https://lh3.googleusercontent.com/UXGl84DnI5sYLJsbKM7NhATcZ38-r8b8EQckzO7GgufOAY-RieOisag7Gu1_oJzJZfDw0HaMMc2njtPPTKNUtD7UQ_d3XNT85yY0DA=w345",
        description : "",
        createdAt : new Date(),
        updatedAt : new Date(),
        user_id : 20
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await  queryInterface.bulkDelete('profiles', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
