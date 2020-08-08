import { signup } from '../services/user';

exports.create = (req, res, next) => {
  return signup(req)
    .then((create_user) => {
      const user = create_user.rows[0];
      if (user) {
        handleResponse(res, 200, 'success'); 
      }
      else  { handleResponse(res, 500, 'error'); }
    });
};

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}