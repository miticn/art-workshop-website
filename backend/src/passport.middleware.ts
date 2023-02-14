export class PassportMiddleware{
  static checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.json({error: 'Not authenticated'})
  }

  static checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return next()
    }
  
    res.json({error: 'Authenticated cannot access this route'})
  }

  static checkAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.type === 'admin') {
      return next()
    }
  
    res.json({error: 'Not admin'})
  }

  static checkUser(req, res, next) {
    if (req.isAuthenticated() && req.user.type === 'user') {
      return next()
    }
  
    res.json({error: 'Not user'})
  }

  static checkOrg(req, res, next) {
    if (req.isAuthenticated() && req.user.type === 'org') {
      return next()
    }
  
    res.json({error: 'Not org'})
  }
}