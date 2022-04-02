import { Router } from "express";
import MainService from "../../services/main.js";
const router = Router();

const MainServiceInstance = new MainService();

router.get('/', async (req, res) => { // 배너 작품 + 24명 작가
  try{
    const data = await MainServiceInstance.getMain();
    return res.status(200).json(data);
  }
  catch(err) {
    return res.status(404).json(err.toString());
  }
})

export default router;
