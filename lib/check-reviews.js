module.exports = checkReviews

async function checkReviews (robot, context) {
  const pullRequest = {
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    number: context.payload.pull_request.number,
    per_page: 100
  }

  const reviewRequests = await context.github.pullRequests.getReviewRequests(pullRequest)

  const isOk = reviewRequests.data.users.length === 0 && reviewRequests.data.teams.length === 0

  context.github.repos.createStatus(context.repo({
    sha: context.payload.pull_request.head.sha,
    state: isOk ? 'success' : 'failure',
    target_url: 'https://github.com/apps/require-review',
    description: isOk ? 'No pending review requests' : 'Waiting for requested reviews',
    context: 'codereview/require-review'
  }))

  if (context.payload.action === 'synchronize') {
    context.github.repos.createStatus(context.repo({
      sha: context.payload.before,
      state: 'success',
      target_url: 'https://github.com/apps/require-review',
      description: 'New commits have been pushed',
      context: 'codereview/require-review'
    }))
  }
}
