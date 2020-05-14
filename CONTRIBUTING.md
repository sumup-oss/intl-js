# Contributing

## Contributor License Agreement (CLA)

To start contributing to SumUp Open Source projects, [please accept our Contributor License Agreement](https://opensource.sumup.com/cla). Should you have any questions or concerns, please get in touch with [opensource@sumup.com](mailto:opensource@sumup.com).

## Code of Conduct (CoC)

We want to foster an inclusive and friendly community around our Open Source efforts. Like all SumUp Open Source projects, this project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](CODE_OF_CONDUCT.md).

If you feel another member of the community violated our CoC or you are experiencing problems participating in our community because of another individual's behavior, please get in touch with our [maintainers](README.md#maintainers). We will enforce the CoC.

## Workflows

### Submitting an issue

1. Check existing issues and verify that your issue is not already submitted. If a similar issue already exists, we highly recommend to add your report to that issue.
2. Open issue
3. Be as detailed as possible - include the Node version, what you did, what you expected to happen, and what actually happened.

### Submitting a PR

1. Find an existing issue to work on or follow `Submitting an issue` to create one that you're also going to fix. Make sure to notify that you're working on a fix for the issue you picked.
2. Branch out from latest `master`.
3. Code, add, commit and push your changes in your branch.
4. Make sure that tests and linter(s) pass locally for you.
5. Submit a PR.
6. Collaborate with the codeowners/reviewers to merge this in `master`.

## Common commands

- Continously transpile and typecheck the code: `yarn start`
- Continously run the tests: `yarn test`
- Run the linter: `yarn lint`

## Troubleshooting

Make sure that you use Node v14.2 _exactly_, otherwise, the unit tests will probably fail. Node's localisation data for the `Intl.NumberFormat` API tends to change between minor versions.
