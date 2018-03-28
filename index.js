module.exports = probotPlugin

const checkReviews = require('./lib/check-reviews')

function probotPlugin (robot) {
  robot.on([
    'pull_request.opened',
    'pull_request.synchronize',
    'pull_request_review.dismissed',
    'pull_request_review.submitted',
    'pull_request_review_requested'
  ], checkReviews.bind(null, robot))
}
