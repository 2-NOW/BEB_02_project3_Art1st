import { Router } from "express";
const router = Router();
import db from "../../models/index.js";

router.get("/bannerArtWork", async (req, res) => {
  await db.Artwork.findAll({
    order: [["views", "DESC"]],
  }).then((Artworks) => {
    console.log(Artworks[0]);
    res.status(200).json({ data: Artworks[0].dataValues.token_id, message: 'done' }); //  db 이미지url 컬럼추가 ipfs 바로전달해주게 수정할것
  }).catch(err => {
    res.status(404).send({ data: null, message: err });
  });
})

router.get("/randomCreators", async (req, res) => {
  const count = await db.User.count();
  const randomCreators = [];
  const addedCreators = [];
  const result = [];
  if(count >= 16){
    while(randomCreators.length < 16){ // 1 ~ count 까지 랜덤으로 userId 16개 뽑기 
      const creator = Math.floor(Math.random(1)  * count) + 1;
      if(!addedCreators.includes(creator))
      randomCreators.push(creator);
      addedCreators.push(creator);
    }
    for(let i=0; i < 16; i++){
      const user = {};
      let name = await db.User.findOne({
        where : { id: randomCreators[i]}
      });
      let profileImg = await db.Profile.findOne({
        where : { id: randomCreators[i]}
      })
      user.name = name.dataValues.email;
      user.profileImg = profileImg.dataValues.picture
      result.push(user);
    
    }
    res.status(201).json(result);
    //console.log(result);
  } else {
    res.status(404).send({ data: null, message: 'Not found' });
  }
})

export default router;
