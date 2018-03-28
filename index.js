module.exports = probotPlugin

const checkReviews = require('./lib/check-reviews')

function probotPlugin (robot) {
  robot.on([
    'pull_request.opened',
    'pull_request.synchronize',
    'pull_request_review.dismissed',
    'pull_request_review.submitted',
    'pull_request.review_requested',
    'pull_request.review_request_removed'
  ], checkReviews.bind(null, robot))
}
