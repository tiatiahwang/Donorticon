const express = require('express');
const router = express.Router();
const { verification } = require('../controller/verification');
const { gifticon, gifticonDetail } = require('../controller/gifticon');
const { user, helperList } = require('../controller');

router.post('/signup/giver', user.signupGiver);
router.post('/signup/helper', user.signupHelper);
router.post('/signin/giver', user.signinGiver);
router.post('/signin/helper', user.signinHelper);
router.post('/signin/guest/giver', user.signinGuestGiver);
router.post('/signin/guest/helper', user.signinGuestHelper);
router.get('/mypage/giver', user.mypageGiver);

router.get('/verification', verification.get);
router.put('/verification', verification.put);
router.get('/gifticon?', gifticon.get);
router.get('/gifticon/detail/:id', gifticonDetail.getDetail);
router.put('/gifticon/detail/:id', gifticonDetail.changeStatus);
router.post('/google/signin', user.googleLogin.getToken);
router.get('/google/user?', user.googleLogin.getUser);
router.post('/kakao/signin', user.kakaoLogin.getToken);
router.get('/kakao/user?', user.kakaoLogin.getUser);
router.post('/signout', user.signout.signout);
router.get('/helperlist/:id', helperList.helperList.getDetail);
router.post('/helperlist/:id', helperList.helperList.donate);

// router.get('/helperlist/category/:id?', helperList.helperList.getList);
router.get('/helperlist/category/:id?', helperList.filterList.getFilteredList);

module.exports = router;
