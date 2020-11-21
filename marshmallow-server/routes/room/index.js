const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const { User } = require('../../models');
const { Room } = require('../../models')
const user = require('../../models/user');
const { stat } = require('fs');
const { resolve } = require('url');

// 방 생성하기
router.post('/create', async (req, res) => {
  //1. req.body에서 데이터 가져오기
  const { title, limitTime, startTime } = req.body;
  //2. request data 확인하기, email, password, userName data가 없다면 NullValue 반환
  if (!title || !limitTime || !startTime ) {
    console.log("필요한 값이 없습니다");
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }
  try {

    //4. salt 생성
    const salt = crypto.randomBytes(64).toString('base64');
    
    const hashedCode = crypto.pbkdf2Sync(title, salt, 10000, 64, 'sha512').toString('base64');
    
    const room = await Room.create({
      title: title,
      limitTime: limitTime,
      startTime: startTime,
      code: hashedCode,
      salt: salt,
    });
    console.log(user);
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.ROOM_CREATE_SUCCESS, { id: room.id, title: room.title, limitTime: room.limitTime, startTime: room.startTime, code: room.code }));
  } catch(error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
  }
})

// 방 코드로 들어가기
router.post('/join', async (req, res) => {

  const { code } = req.body;
  if (!code ) {
    console.log("필요한 값이 없습니다");
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, "방 코드가 제대로 되지 않았음"));
  }
  try {
    const alreadyCode = await Room.findOne({
      where: {
        code: code,
      },
      attributes: ['title', 'limitTime', 'startTime']
    });

    if (!alreadyCode) {
      console.log('존재하지 않는 코드입니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_ROOM));
    }
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.ROOM_JOIN_SUCCESS, alreadyCode));
  } catch(error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.ROOM_JOIN_FAIL));
  }
})
/** */
// 방 정보 가져오기
router.get('/:id', async (req, res) => {
  //1. parameter로 id값을 받아온다 (id값은 인덱스값)
  const { id } = req.params;
  try {
      //2. id값이 유효한지 체크! 존재하지 않는 아이디면 NO_USER 반환
      const room = await Room.findOne({
          where: {
              id: id,
          },
          attributes: ['title', 'startTime', 'limitTime'],
          include: [{
            model: User,
            as: 'Participant',
            attributes: ['nickname', 'percent']
          }]
      });

      if (!room) {
          console.log('존재하지 않는 방입니다');
          return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_ROOM));
      }


      //3. status:200 message: READ_USER_SUCCESS, id email, userName 반환
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.ROOM_READ_SUCCESS, room));

  } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.ROOM_READ_FAIL));
  }
})

// 방 결과 정보 가져오기
router.get('/:id/finish', async (req, res) => {
  //1. parameter로 id값을 받아온다 (id값은 인덱스값)
  const { id } = req.params;
  try {
      //2. id값이 유효한지 체크! 존재하지 않는 아이디면 NO_USER 반환
      const room = await Room.findOne({
          where: {
              id: id,
          },
          include: [{
            model: User,
            as: 'Participant',
            attributes: ['nickname','percent']
          }]
      });

      if (!room) {
          console.log('존재하지 않는 방입니다');
          return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_ROOM));
      }

      //3. status:200 message: READ_USER_SUCCESS, id email, userName 반환
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.ROOM_RESULT_READ_SUCCESS, room));

  } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.ROOM_RESULT_READ_FAIL));
  }
})

module.exports = router;