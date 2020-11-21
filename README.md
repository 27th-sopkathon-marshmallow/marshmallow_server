# 🍭 Marshmallow

<img src=https://user-images.githubusercontent.com/49272528/99885909-ab366380-2c7b-11eb-8dd6-05a5c2bd5d5b.png width="1000">

긍정적 중독을 활용한 의지 강화 서비스
> 개발기간: 2020.11.21 - 2020.11.22

## API 명세서

[📑 API Document](https://github.com/27th-sopkathon-marshmallow/marshmallow_server/wiki)

## Sequelize Model

```javascript
db.User = require('./user')(sequelize, Sequelize);
db.Room = require('./room')(sequelize, Sequelize);
db.Participate = require('./participate')(sequelize, Sequelize);

/** user: room => participate */
db.User.belongsToMany(db.Room, { through: 'Participate', as: 'Participated' });
db.Room.belongsToMany(db.User, { through: 'Participate', as: 'Participant' });
```

## ERD

<img src="https://user-images.githubusercontent.com/49272528/99889201-260c7800-2c96-11eb-995c-d5011abb621b.png" width="1000">

## Develop Environment

- Language: **Javascript**

- Cloud: **AWS**
  - **AWS EC2**
  - **AWS RDS**

## Architecture

<img src="https://user-images.githubusercontent.com/49272528/99889763-aed9e280-2c9b-11eb-8a2b-b6b8329d781f.png" width="800">


## 기능 소개

| 기능 | 담당자                 | 짧은 설명                 | 구현 여부 |
| ---- | ------ | -------- | ---- |
| 방 정보 가져오기 | 김지현 | 들어가려는 방의 정보를 가져오는 기능 | O |
| 방 결과 정보 가져오기 | 김지현 | 들어간 방의 결과 정보를 가져오는 기능 | O |
| 방 생성하기 | 안재은 | 유저가 방을 생성하는 기능 | O |
| 방 코드로 들어가기 | 안재은 | 전달 받은 코드로 방에 들어가는 기능 | O |

## 팀원 소개

**Marshmallow 팀의 멋쟁이 서버 개발자들입니다.👩🏻‍💻🤍**

- [김지현](https://github.com/Jihyun247) - 방 정보 가져오기 (GET), 방 결과 정보 가져오기 (GET)
- [안재은](https://github.com/JaeeunAhn) - 방 생성하기 (POST), 방 코드로 들어가기 (POST)
