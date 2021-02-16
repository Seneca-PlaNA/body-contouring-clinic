const Appointment = require('../../models/appointment');

// create new
exports.addNewAppointments = function (data) {
  return new Promise((resolve, reject) => {
    let newAppointment = new Appointment(data);
    newAppointment.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`New appointment (id: ${newAppointment._id}) is created.`);
      }
    });
  });
};

// view all
exports.viewAllAppointments = function () {
  return new Promise((resolve, reject) => {
    Appointment.find()
      .then((appointments) => {
        resolve(appointments);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// view one
exports.viewAppointmentById = function (id) {
  return new Promise((resolve, reject) => {
    Appointment.findOne({ _id: id })
      .exec()
      .then((appointment) => {
        resolve(appointment);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// update one
exports.editAppointmentById = function (data, id) {
  return new Promise((resolve, reject) => {
    Appointment.updateOne(
      { _id: id },
      {
        $set: data,
      }
    )
      .exec()
      .then(() => {
        resolve(`Appointment (id: ${id}) is updated`);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// delete one
exports.deleteAppointmentById = function (id) {
  return new Promise((resolve, reject) => {
    Appointment.deleteOne({ _id: id })
      .exec()
      .then(() => {
        resolve(`Appointment (id: ${id}) is deleted`);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
