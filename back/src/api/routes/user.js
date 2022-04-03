import { Router } from 'express';
import UserService from '../../services/user.js';
import KlaytnService from '../../services/klaytn.js';
import ArtworkService from '../../services/artwork.js';
const UserServiceInstance = new UserService();
const ArtworkServiceInstance = new ArtworkService();
const KlaytnServiceInstance = new KlaytnService();
const router = Router();

// 스왑 후 잔액 변경
router.put('/balance', async (req, res) => {
  const { balance, action } = req.body;
  const { user_id } = req.session;

  try {
    if (user_id === undefined)
      return res.status(400).json('Error: Bad Request');

    if (action === 'buy') {
      // klay -> token
      // balance 추가
      const updatedBalance = await UserServiceInstance.addUserBalance(
        user_id,
        balance
      );
      return res.status(201).json(updatedBalance);
    } else if (action === 'sell') {
      // token -> klay
      // balance 감소
      const updatedBalance = await UserServiceInstance.subUserBalance(
        user_id,
        balance
      );
      return res.status(201).json(updatedBalance);
    } else {
      return res.status(400).json('Error: Bad Request');
    }
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

// 스왑 가능한 토큰 잔액 확인
router.get('/balance', async (req, res) => {
  const { user_id } = req.session;

  try {
    // 스왑 가능한 토큰 잔액을 확인 (db상의 값과 onchain 상의 값 중 min 값 반환)
    const { exchangable_balance } = await KlaytnServiceInstance.getTokenBalance(
      user_id
    );
    res.status(200).json(exchangable_balance);
  } catch (err) {
    res.status(500).json(err.toString()); // onchain 상의 토큰 잔액을 불러오지 못하는 경우는 -> server 문제
  }
});

// 로그인
router.post('/login', async (req, res) => {
  const { user_id, user_pw } = req.body;
  try {
    await UserServiceInstance.login(user_id, user_pw, req).then(() => {
      res.status(200).json({ message: 'ok' });
    });
  } catch (err) {
    res.status(404).send({ data: null, message: 'not authorized' });
  }
});

// 로그 아웃
router.delete('/logout', (req, res) => {
  try {
    const isLogout = UserServiceInstance.logout(req.session);
    if (isLogout) {
      res.status(200).json({ data: null, message: 'done' });
    } else {
      res.status(404).json(err.toString());
    }
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

// Artworks Page Top Creator 15명 Users 정보 가져오기
router.get('/top', async (req, res) => {
  try {
    const TopUsers = await UserServiceInstance.getTopUsers();
    res.status(200).json(TopUsers);
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

// 나의 user 정보 가져오기
router.get('/', async (req, res) => {
  const { user_id } = req.session;
  try {
    if (user_id === undefined)
      return res.status(401).json('Error: Unauthorized');
    const user = await UserServiceInstance.getMyUserInfo(user_id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json(err.toString());
  }
});

router.get('/islogin', async (req, res) => {
  const { user_id } = req.session;
  try {
    if (user_id === undefined) return res.status(200).json(false);
    const user = await UserServiceInstance.getMyUserInfo(user_id);
    const {
      user_profile: { picture },
      user: { name },
    } = user;
    return res.status(200).json({ picture, name });
  } catch (err) {
    return res.status(404).json(err.toString());
  }
});

// 나의 user 정보(닉네임)이나 프로필 수정)
router.put('/', async (req, res) => {
  const { user_id } = req.session;
  const { user_desc, user_picture, user_name, instargram, tweeter, facebook } =
    req.body;

  try {
    if (user_id === undefined)
      return res.status(401).json('Error: Unauthorized');
    const updated_user = await UserServiceInstance.putMyUserInfo(
      user_id,
      user_desc,
      user_picture,
      user_name,
      instargram,
      tweeter,
      facebook
    );
    return res.status(201).json(updated_user);
  } catch (err) {
    return res.status(404).json(err.toString());
  }
});

// 내가 소유한 작품 내역
router.get('/collected', async (req, res) => {
  const { user_id } = req.session;

  try {
    if (user_id === undefined)
      return res.status(401).json('Error: Unauthorized');
    const artworks = await ArtworkServiceInstance.getCollectedArtworks(user_id);
    return res.status(200).json(artworks);
  } catch (err) {
    return res.status(404).json(err.toString());
  }
});

// 내가 생성한 작품 내역
router.get('/created', async (req, res) => {
  const { user_id } = req.session;

  try {
    if (user_id === undefined)
      return res.status(401).json('Error: Unauthorized');
    const artworks = await ArtworkServiceInstance.getCreatedArtworks(user_id);
    return res.status(200).json(artworks);
  } catch (err) {
    return res.status(404).json(err.toString());
  }
});

// 내가 좋아요 누른 작품 내역
router.get('/favorite', async (req, res) => {
  const { user_id } = req.session;

  try {
    if (user_id === undefined)
      return res.status(401).json('Error: Unauthorized');
    const artworks = await ArtworkServiceInstance.getFavoritedArtworks(user_id);
    return res.status(200).json(artworks);
  } catch (err) {
    return res.status(404).json(err.toString());
  }
});

// 다른 특정 user 정보 가져오기
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserServiceInstance.getOtherUserInfo(id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json(err.toString());
  }
});

// 다른 특정 user가 소유한 작품 내역
router.get('/:id/collected', async (req, res) => {
  const { id } = req.params;
  try {
    const artworks = await ArtworkServiceInstance.getAllArtworks(
      undefined,
      undefined,
      id,
      undefined,
      undefined
    );
    return res.status(200).json(artworks);
  } catch (err) {
    return res.status(404).json(err.toString());
  }
});

// 다른 특정 user가 만든 작품 내역
router.get('/:id/created', async (req, res) => {
  const { id } = req.params;
  const { limit } = req.query;
  try {
    const artworks = await ArtworkServiceInstance.getAllArtworks(
      undefined,
      undefined,
      undefined,
      id,
      limit
    );
    return res.status(200).json(artworks);
  } catch (err) {
    return res.status(404).json(err.toString());
  }
});

router.post('/signup', async (req, res) => {
  // 포스트맨에서 userName, password를 넣으면
  const { user_id, user_pw } = req.body;
  try {
    await UserServiceInstance.signUp(user_id, user_pw);
    res.status(201).json(true);
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

export default router;
