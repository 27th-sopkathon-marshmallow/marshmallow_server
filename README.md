# Marshmallow

긍정적 중독을 활용한 의지 강화 서비스

## API 명세서

[api 링크](https://github.com/27th-sopkathon-marshmallow/marshmallow_server/wiki)

## sequelize Model

```javascript
db.User = require('./user')(sequelize, Sequelize);
db.Room = require('./room')(sequelize, Sequelize);
db.Participate = require('./participate')(sequelize, Sequelize);

/** user: room => participate */
db.User.belongsToMany(db.Room, { through: 'Participate', as: 'Participated' });
db.Room.belongsToMany(db.User, { through: 'Participate', as: 'Participant' });
```

## ERD

<img src="https://user-images.githubusercontent.com/59338503/99882748-2ab93800-2c66-11eb-958a-7a39c748dca9.png" alt="ERD" style="zoom:20%;" />

## 기능 소개

- 핵심 기능 소개
- 구현한 기능과 맡은 엄무 분담을 적어주세요.

## 팀원 소개

---

marshmallow 팀의 멋쟁이 서버 개발자들입니다.👩🏻‍💻🤍

- [김지현](https://github.com/Jihyun247) -
- [안재은](https://github.com/JaeeunAhn) -
