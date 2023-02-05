function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.json({error: 'Not authenticated'})
}

function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return next()
    }
  
    res.json({error: 'Authenticated cannot access this route'})
}

function checkAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.type === 'admin') {
      return next()
    }
  
    res.json({error: 'Not admin'})
}

function checkUser(req, res, next) {
    if (req.isAuthenticated() && req.user.type === 'user') {
      return next()
    }
  
    res.json({error: 'Not user'})
}

function checkOrg(req, res, next) {
    if (req.isAuthenticated() && req.user.type === 'org') {
      return next()
    }
  
    res.json({error: 'Not org'})
}