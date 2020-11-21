# Marshmallow

긍정적 중독을 활용한 의지 강화 서비스

## API 명세서

[api 링크](https://github.com/27th-sopkathon-marshmallow/marshmallow_server.wiki.git)

## sequelize Model

```javascript
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Like = require("./like")(sequelize, Sequelize);

/** 1 : N   User : Post */
db.User.hasMany(db.Post, { onDelete: "cascade" });
db.Post.belongsTo(db.User);

/** N: M    User : Post => Like */
db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
db.Post.belongsToMany(db.User, { through: "Like", as: "Liker" });
```

## ERD

![ERD]()

## 기능 소개

- 핵심 기능 소개
- 구현한 기능과 맡은 엄무 분담을 적어주세요.

## 팀원 소개

---

marshmallow 팀의 멋쟁이 서버 개발자들입니다.👩🏻‍💻🤍

- [김지현](https://github.com/Jihyun247) -
- [안재은](https://github.com/JaeeunAhn) -
