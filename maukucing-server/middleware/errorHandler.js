module.exports = ((err, req, res, next) => {

    switch (err.name) {
      case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError" :
        res.status(400).json({ msg: err.errors[0].message });
        break;
      case "EmailRequiredError" : 
        res.status(400).json({ msg: 'Email must not empty' });
        break
        case "PasswordRequiredError" : 
        res.status(400).json({ msg: 'Password must not empty' });
      break
      case "NoFile" :
        res.status(400).json({ msg: 'Must include file' });
        break
      case "RequestBodyNotFound" : 
        res.status(400).json({ msg: 'Must input valid body' });
      break
      case "EmailAlreadyRegistered" : 
        res.status(400).json({ msg: 'Email is registered already' });
      break
      case "NotFoundError":
        res.status(404).json({ msg: "Not Found!" });
        break;
      case "Unauthorized" :
      case "JsonWebTokenError" :
        res.status(401).json({msg : 'Unauthorized Error'})
        break
      case "AuthError" : 
        res.status(401).json({msg : 'Invalid Email and Password'})
        break
      case "PasswordEmpty" : 
        res.status(401).json({msg : 'Password is required'})
        break
      case "EmailEmpty" : 
        res.status(401).json({msg : 'Email is required'})
        break
      case "ForbiddenError" : 
        res.status(403).json({msg : 'Forbidden Error'})
        break
      default:
        res.status(500).json({ msg: err });
        break;
    }
  });
  