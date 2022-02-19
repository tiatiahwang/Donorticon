const { helper, helper_vulnerable } = require('../../models');

module.exports = {
  getFilteredList: async (req, res) => {
    // req.params로 넘어오는 id가 0에서 7 사이어야함

    //TODO: req.params 정보가 넘어오지 않았을때 에러 처리
    // if (!req.params) {
    // }

    let id;

    if (req.params.id) {
      id = parseInt(req.params.id);
    } else {
      id = parseInt(req.params.helperCategoryId);
    }

    let page = Math.max(parseInt(req.query.page));
    let limit = Math.max(parseInt(req.query.limit));

    page = !isNaN(page) ? page : 1;
    limit = !isNaN(limit) ? limit : 9;

    const skip = (page - 1) * limit;

    //TODO: 에러 처리(id값은 0부터 7까지만 가능)
    // if (id < 0 || id > 7) {
    // }

    let list;
    let maxPage;
    let count;
    console.log(id, page);
    if (id === 0) {
      try {
        //TODO: gallery 모델과 helper 모델 id로 연결해서 이미지 한개 끌어와야함

        const filteredList = await helper.findAndCountAll({
          limit: 9,
          offset: skip,
          where: {},
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });
        const { count, rows: list } = filteredList;
        maxPage = Math.ceil(count / limit);
        res.send({ list, maxPage, count });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const filteredList = await helper_vulnerable.findAndCountAll({
          limit: 9,
          offset: skip,
          where: { vulnerable_id: id },
          include: {
            model: helper,
            required: true,
            attributes: ['id', 'name', 'slogan', 'img'],
          },
        });
        const { count, rows: list } = filteredList;
        maxPage = Math.ceil(count / limit);
        res.send({ list, maxPage, count });
      } catch (e) {
        console.log(e);
      }
    }
  },
};