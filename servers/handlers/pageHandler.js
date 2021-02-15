const Page = require('../../models/page');
// const AccountLevel = require('../../models/accountLevel');

// create new
exports.addNewPage = function (data) {
  return new Promise((resolve, reject) => {
    let newPage = new Page(data);
    // let pass = false;
    // for (let i = 0; i < data.accountLevels.length; i++){
    //   if (AccountLevel.exists({ _id: data.accountLevels[i]})) {
    //     pass = true;
    //   } else {
    //     pass = false;
    //   }
    // }
    newPage.save((err) => {
      if (err) {
        // if (err || pass == false) {
        reject(err);
        // reject(err + "passed account level id(s) not exist");
      } else {
        resolve(`new service (id: ${newPage._id}) is created`);
      }
    });
  });
};

// view all
exports.viewAllPages = function () {
  return new Promise((resolve, reject) => {
    Page.find()
      .then((pages) => {
        resolve(pages);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// view one
exports.viewOnePageById = function (id) {
  return new Promise((resolve, reject) => {
    Page.findOne({ _id: id })
      .exec()
      .then((page) => {
        resolve(page);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// update one
exports.editPageById = function (data, id) {
  return new Promise((resolve, reject) => {
    Page.updateOne(
      { _id: id },
      {
        $set: data,
      }
    )
      .exec()
      .then(() => {
        resolve(`page (id: ${id}) is updated`);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// delete one
exports.deletePageById = function (id) {
  return new Promise((resolve, reject) => {
    Page.deleteOne({ _id: id })
      .exec()
      .then(() => {
        resolve(`page (id: ${id}) is deleted`);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
